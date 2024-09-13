<template>
  <sliderComponent texto="Blog"></sliderComponent>
  <div class="center">
    <section id="content">
      <h1 class="sub-header"></h1>
      <div id="articles" v-if="articles">
        <ArticlesComponent :articles="articles"></ArticlesComponent>
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
import ArticlesComponent from '@/components/Articles.vue';


export default {
  name: "blogComponent",
  data() {
    return {
      articles: [],
      url: Global.url,
    };
  },
  components: {
    sideBarComponent,
    sliderComponent,
    ArticlesComponent,
  },

  mounted() {
    this.getArticles();
  },

  methods: {
    async getArticles() {

      try {
        const art = await axios.get(this.url + "articles")
        if(art.data.status == "success"){
          this.articles= art.data.articles
        }
      } catch (error) {
        swal.fire({
          title: "Bienvenido!",
          text: "Error al obtener articulos del servidor",
          icon: "error",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "red",
        });
        throw new Error("Error 500:", error);
        
      }
    },
  },
};
</script>
