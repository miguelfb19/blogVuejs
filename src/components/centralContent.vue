<template>
    <sliderComponent 
        texto="Bienvenido al blog de Miguel Angel con VueJs"
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
    async getLastArticles() {

      try {
        const art = await axios.get(this.url + "articles/true")
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
}
</script>
