<template>
  <alertComponent></alertComponent>
  <headerComponent></headerComponent>

  <router-view></router-view>

  <div class="clearfix"></div>

  <footerComponent></footerComponent>
</template>

<script>
import headerComponent from "./components/header.vue";
import footerComponent from "./components/footerComponent.vue";
import alertComponent from "./components/alertComponent.vue";


export default {
  name: "App",
  components: {
    headerComponent,
    footerComponent,
    alertComponent,
  },
};
</script>

<style>
@import "./assets/css/styles.css";
</style>./components/alertComponent.vue
