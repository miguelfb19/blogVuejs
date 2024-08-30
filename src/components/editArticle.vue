<template src="./createArticle.html"></template>

<script>
import articleNew from "../models/article.js";
import axios from "axios";
import Global from "../Global";
import swal from "sweetalert2";
import sideBarComponent from "@/components/sideBar.vue";
import sliderComponent from "@/components/slider.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "editArticle",
  data() {
    return {
      article: new articleNew("", "", null, ""),
      url: Global.url,
      submitted: false,
      file: "",
      isEdit: true, 
    };
  },

  validations() {
    return {
      article: {
        title: { required },
        content: { required },
      },
    };
  },
  components: {
    sideBarComponent,
    sliderComponent,
  },

  setup() {
    return { v$: useVuelidate() };
  },

  mounted() {
    let articleID = this.$route.params.id;
    this.getArticle(articleID);
  },

  methods: {
    getArticle(articleId) {
      axios
        .get(this.url + "article/" + articleId)
        .then((res) => {
          if (res.data.status.toLowerCase() == "success" && res.data.article) {
            this.article = res.data.article;
          } else {
            alert("Error al obtener el artículo desde la API.");
            console.error("Error al obtener el artículo desde la API.");
          }
        })
        .catch((error) => {
          alert("Error en la solicitud HTTP:", error);
          console.error("Error en la solicitud HTTP:", error);
        });
    },
    save() {
      this.submitted = true;
      let articleId = this.$route.params.id;

      if (this.v$.$invalid) {
        return false;
      } else {
        const formData = new FormData();

        axios
          .put(this.url + "article/" + articleId, this.article)
          .then((res) => {
            if (res.data.status.toLowerCase() == "success") {
              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                if (this.file.type.includes("image")) {
                  formData.append("file0", this.file, this.file.name);
                  axios
                    .post(
                      this.url + "upload-image/" + res.data.article._id,
                      formData
                    )
                    .then((resp) => {
                      if (resp.data.article) {
                        this.article = resp.data.article;
                        swal.fire(
                          "Artículo editado",
                          "El Articulo fue editado exitosamente ",
                          "success"
                        );
                        setTimeout(() => {
                          this.$router.push("/article/" + articleId);
                        }, 1200);
                      } else {
                        swal.fire(
                          "Error",
                          "El Articulo no se ha podido guardar",
                          "error"
                        );
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  swal.fire(
                    "Error de archivo",
                    "Deber subir un archivo de tipo imagen",
                    "error"
                  );
                }
              } else {
                this.article = res.data.article;
                swal.fire(
                  "Artículo editado",
                  "El Articulo fue editado exitosamente ",
                  "success"
                );
                setTimeout(() => {
                  this.$router.push("/article/" + articleId);
                }, 1200);
              }
            }
          })
          .catch((error) => {
            alert(
              "Hubo un error al guardar el articulo en el API: " +
                JSON.stringify(error)
            );
            console.log(error);
          });
      }
    },

    fileChange() {
      this.file = this.$refs.file.files[0]; //con esto recojo el dato del input file en la variable file
    },
  },
};
</script>
