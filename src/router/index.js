import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import firebase from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/new",
    name: "new",
    component: () => import("../views/Edit.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/:id/edit",
    name: "edit",
    component: () => import("../views/Edit.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/typesetting",
    name: "typesetting",
    component: () => import("../views/Typesetting.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
