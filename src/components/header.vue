<template>
<header id="header">

    <div class="center"> <!--Metemos todo en un div con clase "center" para establecer todo en el centro con CSS-->
        
        <div id="logo">
            <!--LOGO -->
            <img src="..\assets\images\logo.png" class="appLogo" alt="Logotipo"/>
            <span id="brand">
                <strong>Blog</strong>VueJS
            </span>
        </div>
        

        <!--MENU -->
        <nav id="menu">
            <ul>
            <li>
                <router-link to="/home" active-class="active">Inicio |</router-link> <!--active-class sirve para establecer una clase que permanece activa con algun estilo cuando la seleccione-->
            </li>
            <li>
                <router-link to="/blog" active-class="active">Blog |</router-link>
            </li>
            <li>
                <router-link to="/formulario" active-class="active">Formulario |</router-link>
            </li>
            </ul>
        </nav>
        <!--LIMPIAR FLOTADO (FLOAT)-->
        <div class="clearfix"></div> <!--esto evita que lo de abajo me dañe el diseño de arriba, mirar CSS .clearfix-->
    </div>
</header>
</template>

<script>
export default {
    name:'headerComponent',
}
</script>