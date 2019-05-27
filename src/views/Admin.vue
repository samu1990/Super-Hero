<template>
  <v-layout justify-center>
    <v-flex>
      <v-card class="text-xs-center">
        <v-card-text>
          <v-avatar>
            <img :src="usuario.foto" alt="profile-photo">
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <h3 class="mt-3 white-text">{{usuario.nombre}}</h3>
        </v-card-text>
        <v-card-text>
          <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">
          <v-btn color="primary" @click="$refs.boton.click()">Search Image</v-btn>
          <v-btn
            color="error"
            :disabled="file===null"
            @click="subirImagen"
            :loading="loading"
          >Upload Image</v-btn>
        </v-card-text>
        <v-card-text v-if="error">
          <h4>{{error}}</h4>
        </v-card-text>
        <v-card-text v-if="file">
          <h4>{{file.name}}</h4>
          <v-img :src="urlTemporal"></v-img>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase";

export default {
  data() {
    return {
      file: null,
      urlTemporal: "",
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === "imagen/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.file = null;
        this.error = "Invalid File";
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.urlTemporal = e.target.result;
      };
    },
    async subirImagen() {
      try {
        this.loading = true;
        const refImagen = storage
          .ref()
          .child(this.usuario.email)
          .child("foto perfil");
        const res = await refImagen.put(this.file);
        const urlDescarga = await refImagen.getDownloadURL();
        console.log(urlDescarga);
        this.usuario.foto = urlDescarga;

        await db
          .collection("usuarios")
          .doc(this.usuario.uid)
          .update({
            foto: urlDescarga
          });
        this.error = "Image Successfully";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>