import { createRouter, createWebHistory } from "vue-router";

//Importar los componentes
import centralContent from "../components/centralContent.vue";
import blogComponent from "../components/Blog.vue";
import formularioComponent from "../components/Formulario.vue";
import ErrorComponent from "../components/ErrorComponent.vue";
import buscadorComponent from "../components/buscadorComponent.vue";
import articleDetails from "../components/articleDetails.vue";
import createArticle from "../components/createArticle.vue";
import editArticle from "../components/editArticle.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: centralContent },
    { path: "/", component: centralContent },
    { path: "/blog", component: blogComponent },
    { path: "/formulario", component: formularioComponent },
    { path: "/buscador/:searchString", component: buscadorComponent },
    { path: "/article/:id", name: "article", component: articleDetails },
    { path: "/createArticle", component: createArticle },
    { path: "/edit/:id", component: editArticle },
    { path: "/:pathMatch(.*)*", component: ErrorComponent }, //el '/:pathMatch(.*)*' sirve para crear una ruta comodín (se usa comunmente para crear pagina de error)
    //{path: '/nombreRuta', component: nombreComponente},
  ],
});

export default router;
