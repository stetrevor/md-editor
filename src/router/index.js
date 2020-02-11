import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";

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
    component: () => import("../views/Home.vue")
  },
  {
    path: "/:id/edit",
    name: "edit",
    component: () => import("../views/Edit.vue")
  },
  {
    path: "/typesetting",
    name: "typesetting",
    component: () => import("../views/Typesetting.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
