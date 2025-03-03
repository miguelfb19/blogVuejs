<template>
  <router-link :to="{ name: 'article', params: { id: article._id } }">
    <div class="image-wrap">
      <img :src="articleImage" :alt="article.title" v-if="article.image" />
      <img
        src="@/assets/images/sinImagen.jpg"
        :alt="article.title"
        v-if="!article.image"
      />
    </div>
  </router-link>
  <div>
    <router-link :to="{ name: 'article', params: { id: article._id } }">
      <h2>{{ article.title }}</h2>
    </router-link>
    <span class="date"> {{ moment(article.date).fromNow() }} </span>
    <!--modo de uso correcto de la libreria vue-moment-->
    <router-link :to="{ name: 'article', params: { id: article._id } }">
      Leer más
    </router-link>
  </div>
  <div class="clearfix"></div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import { getImagesFromDS3 } from "@/services/get-images-from-s3.js";

export default {
  name: "SingleArticleComponent",
  data() {
    return {
      articleImage: null,
      moment: moment,
    };
  },
  props: ["article"],
  methods: {
    getImage() {
      getImagesFromDS3(this.article.image).then(res=>{
        this.articleImage = res.fileUrl;
      });
    },
  },
  mounted() {
    this.getImage();
  },
};
</script>
