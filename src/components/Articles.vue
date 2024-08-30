<template>
  <article class="article-item" v-for="article in articles" :key="article._id">
    <div class="image-wrap">
      <img
        :src="url + 'get-image/' + article.image"
        :alt="article.title"
        v-if="article.image"
      />
      <img
        src="@/assets/images/sinImagen.jpg"
        :alt="article.title"
        v-if="!article.image"
      />
    </div>

    <router-link :to="{ name: 'article', params: { id: article._id } }">
      <h2>{{ article.title }}</h2>
    </router-link>

    <span class="date"> {{ moment(article.date).fromNow() }} </span>
    <!--modo de uso correcto de la libreria vue-moment-->

    <router-link :to="{ name: 'article', params: { id: article._id } }">
      Leer más
    </router-link>
    <div class="clearfix"></div>
  </article>
</template>

<script>
import Global from "@/Global";
import moment from "moment"; //el moment actualmente toca importarlo en el componente que se va a usar y no globalmente en el main
import "moment/locale/es";

export default {
  name: "ArticlesComponent",
  data() {
    return {
      url: Global.url,
      moment: moment,
    };
  },
  props: ["articles"],
};
</script>
