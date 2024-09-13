<template>
  <aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
      <router-link class="btn" to="/createArticle">
        Crear artículo
      </router-link>
    </div>

    <div id="search" class="sidebar-item">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit="goSearch">
        <input
          type="text"
          name="search"
          v-model="searchStr"
        />
        <input type="submit" name="submit" value="buscar" class="btn"/>
      </form>
    </div>
  </aside>
</template>

<script>
export default {
  name: "sideBarComponent",

  data() {
    return {
      searchStr: null,
    };
  },
  methods: {
    goSearch(event) {
      event.preventDefault()
      this.$router.push("/buscador/" + this.searchStr);
        this.searchStr = null;
    },
  },
};
</script>
