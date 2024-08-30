<template src="./createArticle.html"></template>

<script>
import articleNew from "../models/article.js";
import axios from "axios";
import Global from "../Global";
import swal from "sweetalert";
import sideBarComponent from "@/components/sideBar.vue";
import sliderComponent from "@/components/slider.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "createArticle",
  data() {
    return {
      article: new articleNew("", "", null, ""),
      url: Global.url,
      submitted: false,
      file: "",
      isEdit:false,
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

  methods: {
    save() {
      this.submitted = true;

      if (this.v$.$invalid) {
        return false;
      } else {
        const formData = new FormData();

        axios
          .post(this.url + "save/", this.article)
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
                        swal(
                          "Artículo guardado",
                          "El Articulo fue creado exitosamente ",
                          "success"
                        );
                        this.$router.push("/blog");
                      } else {
                        swal(
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
                  swal("Error de archivo", "Deber subir un archivo de tipo imagen", "error");
                }
              } else {
                this.article = res.data.article;
                swal(
                  "Artículo guardado",
                  "El Articulo fue creado exitosamente ",
                  "success"
                );
                this.$router.push("/blog");
              }
            }
          })
          .catch((error) => {
            swal("Hubo un error al guardar el articulo en el API: " + error);
          });
      }
    },

    fileChange() {
      this.file = this.$refs.file.files[0]; //con esto recojo el dato del input file en la variable file
    },
  },
};
</script>
