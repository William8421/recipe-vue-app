import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NutritionAnalysis from "../views/NutritionAnalysis.vue";
import SearchRecipe from "../views/SearchRecipe.vue";
import FoodDatabase from "../views/foodDatabase/FoodDatabase.vue";
import FoodDetails from "../views/foodDatabase/FoodDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/nutrition-analysis",
    name: "NutritionAnalysis",
    component: NutritionAnalysis,
  },
  {
    path: "/search-recipe",
    name: "SearchRecipe",
    component: SearchRecipe,
  },
  {
    path: "/food-database",
    name: "FoodDatabase",
    component: FoodDatabase,
  },
  {
    path: "/food-details/:foodId",
    name: "FoodDetails",
    component: FoodDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
