<template>
  <v-layout justify-center mt-5>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text text-xs-center"
          :class="registro ? 'success': 'accent'"
        >
          <span v-if="!registro">Get In</span>
          <span v-if="registro">Registry</span>
        </v-card-text>
        <v-card-text>
          <v-btn block color="error" @click="google()">
            <v-icon left dark>fab fa-google</v-icon>Google
          </v-btn>
          <v-btn block color="info" @click="facebook()">
            <v-icon left dark>fab fa-facebook-f</v-icon>Facebook
          </v-btn>
        </v-card-text>
        <v-card-text>
          <v-btn block @click="registro=true" v-if="!registro">Registry</v-btn>
          <v-btn block @click="registro=false" v-if="registro">Get In</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "Ingreso",
  data() {
    return {
      registro: false
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["setUsuario"]),
    google() {
      console.log("Inicio Google");
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },
    facebook() {
      console.log("Inicio Facebook");
      const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider);
    },
    async ingresar(provider) {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user.photoURL, user.displayName);
        this.setUsuario(user);

        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>