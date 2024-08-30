<template>
  <div class="center">
    <section id="content">
      <h1 class="sub-header">Formulario</h1>
      <form class="mid-form" @submit.prevent="enviar">
        <!--con el prevent hacemos que no recargue la pantalla al hacer submit-->
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            v-model="nombre"
            @input="submitted = false"
          />

          <div class="errorForm" v-if="submitted && v$.nombre.required.$invalid">
            Este campo es requerido
          </div>
          <div class="errorForm" v-else-if="submitted && v$.nombre.customAlpha.$invalid">
            Este campo solo acepta caracteres alfabéticos
          </div>
          <div class="errorForm" v-else-if="v$.nombre.minLength.$invalid">
            Este campo debe tener más caracteres
          </div>
        </div>
        <div class="form-group">
          <label for="apellidos">Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            v-model="apellidos"
            @input="submitted = false"
          />
          <!--con el v-model vinculamos el input a la propiedad denuestro objeto en el data-->

          <div class="errorForm" v-if="submitted && v$.apellidos.required.$invalid">
            Este campo es requerido
          </div>
          <div class="errorForm" v-else-if="submitted && v$.apellidos.customAlpha.$invalid">
            Este campo solo acepta caracteres alfabéticos
          </div>
          <div class="errorForm" v-else-if="v$.apellidos.minLength.$invalid">
            Este campo debe tener más caracteres
          </div>
        </div>
        <p>Selecciona tu sexo:</p>
        <div class="form-group radiobuttoms">
          <input type="radio" name="sexo" value="hombre" v-model="sexo" />
          Hombre
          <input type="radio" name="sexo" value="mujer" v-model="sexo" />
          Mujer

          <div class="errorForm" v-if="submitted && v$.sexo.required.$invalid">
            Este campo es requerido
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="form-group">
          <label for="coment">Comentarios:</label>
          <textarea
            name="coment"
            v-model="coment"
            @input="submitted = false"
          ></textarea>
          <div class="errorForm" v-if="submitted && v$.coment.required.$invalid">
            Este campo es requerido
          </div>
          <div class="errorForm" v-else-if="v$.coment.minLength.$invalid">
            Este campo debe tener más caracteres
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="buttomsform">
          <input
            type="submit"
            value="Enviar"
            class="btn btn-succes buttonsform1"
          />
          <input
            type="reset"
            value="Borrar"
            class="btn btn-succes buttonsform2"
          />
        </div>
      </form>

      <div class="datos"></div>
    </section>
    <sideBarComponent></sideBarComponent>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import sideBarComponent from "@/components/sideBar.vue";

// Definir una función de validación personalizada que permita letras y espacios
function customAlpha(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

export default {
  name: "formularioComponent",
  components: {
    sideBarComponent,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      submitted: false,
      nombre: "",
      apellidos: "",
      coment: "",
      sexo: "",
    };
  },
  validations() {
    return {
      nombre: { required, minLength: minLength(2), customAlpha },
      apellidos: { required, minLength: minLength(2), customAlpha },
      coment: { required, minLength: minLength(10) },
      sexo: { required },
    };
  },
  methods: {
    enviar() {
      this.submitted = true;

      if (this.v$.$invalid) {
        return false;
      } else {
        this.nombre=''
        this.apellidos=''
        this.sexo=null
        this.coment=''
        this.submitted=false
        alert("Validación exitosa");
      }
    },
  },
};
</script>
