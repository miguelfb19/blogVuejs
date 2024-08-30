<template>
    <div class="center">
        <section id="content">
            <h1 class="sub-header">PÁGINA NO ENCONTRADA</h1>
            <h3>La página que buscas no existe, intentalo de nuevo</h3>
            <router-link to="/home">VOLVER AL INICIO</router-link>
        </section>
        <sideBarComponent></sideBarComponent>
    </div>
</template>

<script>

import sideBarComponent from '@/components/sideBar.vue'

export default {
    name: 'ErrorComponent',
    components: {
        sideBarComponent,
    },
}
</script>
