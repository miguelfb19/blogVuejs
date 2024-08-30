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
    this.searchString = this.$route.params.searchString;
    this.getArticlesBySearch(this.searchString);
  },

  methods: {
    getArticlesBySearch(searchStr) {
      axios.get(this.url + "search/" + searchStr).then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
          console.log(this.articles);
        }
      });
    },
  },
};
</script>
