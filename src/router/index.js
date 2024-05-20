import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("username", "password");
        if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/payment-options/:id",
      name: "payment-options",
      component: () => import("../views/PaymentOptionsView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("username", "password");
        if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/payment/:invoice",
      name: "payment",
      component: () => import("../views/PaymentView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("username", "password");
        if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/bills",
      name: "bills",
      component: () => import("../views/BillsView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("role");
        if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("username", "password");
        if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("role");
        if (isLogin !== "admin") {
          next("/");
        } else if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("../views/AdminRoomView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("role");
        if (isLogin !== "admin") {
          next("/");
        } else if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/AdminUserView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("role");
        if (isLogin !== "admin") {
          next("/");
        } else if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/admin/bills",
      name: "admin-bills",
      component: () => import("../views/AdminBillsView.vue"),
      beforeEnter: (to, from, next) => {
        const isLogin = localStorage.getItem("role");
        if (isLogin !== "admin") {
          next("/");
        } else if (!isLogin) {
          next("/login");
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
