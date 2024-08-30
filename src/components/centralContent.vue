<template>
    <sliderComponent 
        texto="Bienvenido al curso de VueJS con Victor Robles de victorroblesweb.com"
        showBtn="true"
    ></sliderComponent>

    <div class="center">
        <section id="content" v-if="articles && articles.length >=1">
            <h2 class="sub-header">Ultimos artículos</h2>

            <div id="articles">
                <ArticlesComponent :articles="articles"></ArticlesComponent>
            </div>
        </section>
        <section v-else>
            <h1>NO HAY ARTICULOS PARA MOSTRAR</h1>
        </section>
        <sideBarComponent></sideBarComponent>
        <div class="clearfix"></div>
    </div>
</template>

<script>
import axios from 'axios'
import Global from '@/Global'
import sideBarComponent from '@/components/sideBar.vue'
import sliderComponent from '@/components/slider.vue'
import ArticlesComponent from '@/components/Articles.vue'


export default {
    name: 'centralContent',
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
    this.getLastArticles();
  },

  methods: {
    getLastArticles() {
      axios.get(this.url + "articles/true").then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
          console.log(this.articles);
        }
      });
    },
  },
}
</script>
