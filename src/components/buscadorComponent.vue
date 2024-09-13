<template>
  <sliderComponent :texto="'Busqueda: ' + searchString"></sliderComponent>
  <div class="center">
    <section id="content">
      <div id="articles" v-if="articles && articles.length > 0">
        <h1 class="sub-header">Artículos encontrados</h1>
        <ArticlesComponent :articles="articles"></ArticlesComponent>
      </div>
      <div v-else-if="articles && articles.length <= 0">
        <h1 class="sub-header">Sin resultados</h1>
        <h2>!!!NO HAY ARTICULOS QUE CONCIDAN CON TU BUSQUEDA¡¡¡</h2>
      </div>
    </section>
    <sideBarComponent></sideBarComponent>
  </div>
</template>

<script>
import { nextTick } from "vue";
import axios from "axios";
import Global from "../Global";
import sideBarComponent from "./sideBar.vue";
import sliderComponent from "./slider.vue";
import ArticlesComponent from "./Articles.vue";

export default {
  name: "buscadorComponent",
  data() {
    return {
      articles: [],
      url: Global.url,
      searchString: null,
    };
  },
  components: {
    sideBarComponent,
    sliderComponent,
    ArticlesComponent,
  },

  mounted() {
    this.searchString = this.$route.params.searchString
    this.getArticlesBySearch(this.searchString);
  },

  watch: {
    // Observa los cambios en $route.params para detectar cambios en la ruta
    '$route.params.searchString': {
      immediate: true,
      handler(newSearchString) {
        this.searchString = newSearchString;
        this.getArticlesBySearch(this.searchString);  // Ejecuta la búsqueda cuando cambie searchString
      }
    }
  },

  methods: {

    async getArticlesBySearch(searchStr) { 
      try {
        const art = await axios.get(this.url + "search/" + searchStr)
        if(art.data.status == "success"){
          this.articles= art.data.articles
        }
      } catch (error) {
        swal.fire({
          title: "Bienvenido!",
          text: "Error al obtener busqueda del servidor",
          icon: "error",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "red",
        });
        throw new Error("Error 500:", error);
        
      }

      nextTick()
    },
  },
};
</script>
