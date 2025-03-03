<template>
  <article class="article-item" v-for="article in articles" :key="article._id">
    <SingleArticleComponent :article="article" />
  </article>
</template>

<script>
import SingleArticleComponent from "./SingleArticle.vue";

export default {
  name: "ArticlesComponent",
  components: {
    SingleArticleComponent,
  },
  data() {
    return {};
  },
  props: ["articles"],
};
</script>
