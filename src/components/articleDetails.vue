<template>
  <sliderComponent v-if="article" :texto="article.title"></sliderComponent>
  <div class="center">
    <section id="content">
      <article class="article-detail" v-if="article">
        <div class="image-wrap">
          <img v-if="article.image" :src="articleImage" :alt="article.title" />
          <img
            v-else
            src="@/assets/images/sinImagen.jpg"
            :alt="article.title"
          />
        </div>
        <span class="date"> {{ moment(article.date).fromNow() }} </span>
        <p>{{ article.content }}</p>
        <div class="clearfix"></div>
        <div class="btnEDE">
          <router-link :to="'/edit/' + article._id" class="btn btn-edit"
            >Editar</router-link
          >
          <a class="btn btn-delete" @click="deleteArticle(article._id)"
            >Borrar</a
          >
        </div>
      </article>
    </section>
    <sideBarComponent></sideBarComponent>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import axios from "axios";
import Global from "../Global";
import swal from "sweetalert2";
import sideBarComponent from "@/components/sideBar.vue";
import sliderComponent from "@/components/slider.vue";
import { getImagesFromDS3 } from "@/services/get-images-from-s3.js";

export default {
  name: "articleDetails",
  components: {
    sideBarComponent,
    sliderComponent,
  },
  data() {
    return {
      url: Global.url,
      article: null,
      moment: moment,
      articleImage: "not-image",
    };
  },

  mounted() {
    let articleID = this.$route.params.id;

    this.getArticle(articleID);
  },

  methods: {
    async getArticle(id) {
      try {
        const res = await axios.get(this.url + "article/" + id);
        if (res.data.status.toLowerCase() == "success" && res.data.article) {
          this.article = res.data.article;
          const s3Response = await getImagesFromDS3(res.data.article.image);
          this.articleImage = s3Response.fileUrl;
        } else {
          alert("Error al obtener el artículo desde la API.");
        }
      } catch (error) {
        swal.fire({
          title: "Bienvenido!",
          text: "Error al obtener datos del servidor",
          icon: "error",
          confirmButtonText: "Cerrar",
          confirmButtonColor: "red",
        });
        throw new Error("Error 500:", error);
      }
    },
    deleteArticle(id) {
      swal
        .fire({
          title: "¿Seguro que deseas borrar el artículo?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Borrar",
          cancelButtonText: "Cancelar",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${this.url}article/${id}`).then(() => {
              swal.fire(
                "Artículo borrado",
                "El Articulo fue eliminado exitosamente ",
                "success"
              );
              setTimeout(() => {
                this.$router.push("/blog");
              }, 1000);
            });
          }
        });
    },
  },
};
</script>
