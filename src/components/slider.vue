<template>
    <div id="slider" :class="{ //con v-bind se pone una clase con una determinada condicion
        'slider-big': showBtn,
        'slider-small': !showBtn
    }"> 
        <h1 v-if="!showBtn">{{ textoMayuscula }}</h1> <!--uso propiedades computadas para poner el texto en mayuscula-->
        <h1 v-else>{{ texto }}</h1> <!--Aqui uso un v-if y v-else para darle condicion a las cualidades del texto del slider-->
        <router-link to="/blog" class="btn-white" v-if="showBtn">Ir al Blog</router-link> <!--usamos el v-if para determinar si el boton se muestra o no en los diferentes componentes-->
    </div>
</template>

<script>
export default {
    name: 'sliderComponent',
    computed: { //las propiedades computadas me permiten aplicar metodos concretos dentro del template con mayor facilidad
        textoMayuscula(){
             return this.texto.toUpperCase()
        },
    },
    props: ['texto', 'showBtn'], //ponemos las propiedades (props) que me determinan como cambia determinado 
                                 //comportamiento en el componente
}
</script>


