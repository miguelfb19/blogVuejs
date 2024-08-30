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
    getArticles() {
      axios.get(this.url + "articles").then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
          console.log(this.articles);
        }
      });
    },
  },
};
</script>
