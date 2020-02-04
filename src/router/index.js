import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
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
