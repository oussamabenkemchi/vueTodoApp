import Home from "./views/Home.vue";
import Guide from "./views/Guide.vue";
import NotFound from "./views/NotFound.vue";
import Solution from "./views/Solution.vue";
/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: "/", component: Home, meta: { title: "Home" } },
  { path: "/guide", component: Guide, meta: { title: "Guide" } },
  {
    path: "/solution",
    component: Solution,
    props: true,
    meta: { title: "My Tasks List" },
  },
  { path: "/:path(.*)", component: NotFound },
];
