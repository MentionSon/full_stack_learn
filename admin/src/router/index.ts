import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("../views/Home.vue")
      },
      {
        name: "resource-crud",
        path: ":resource/list",
        component: () => import("../views/ResourceCrud.vue"),
        props: true
      }
      // {
      //   name: "courses-list",
      //   path: "/courses/list",
      //   component: () => import("../views/courses/CourseList.vue")
      // },
      // {
      //   name: "courses-edit",
      //   path: "/courses/edit/:id",
      //   component: () => import("../views/courses/CourseEdit.vue"),
      //   props: true
      // },
      // {
      //   name: "courses-create",
      //   path: "/courses/create",
      //   component: () => import("../views/courses/CourseEdit.vue")
      // }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
