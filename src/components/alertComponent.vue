<template><div></div></template>

<script>
import Swal from "sweetalert2";

export default {
  name: "alertComponent",
  data() {
    return {};
  },
  methods: {
    showAlert() {
      Swal.fire({
        title: "Bienvenido!",
        text: "Por el momento, la carga y subida de imagenes esta deshabilitada debido al desarrollo del Back-End en producción. Las demás funcionalidades responden correctamente!!!",
        icon: "info",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#41b883",
      });
    },
  },
  mounted() {
    this.showAlert();
  },
};
</script>

<style></style>
