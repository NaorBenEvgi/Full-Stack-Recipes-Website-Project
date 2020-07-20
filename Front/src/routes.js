import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/personalRecipes",
    name: "personalRecipes",
    component: () => import("./pages/PersonalRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/aboutUs",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  
];


export default routes;
