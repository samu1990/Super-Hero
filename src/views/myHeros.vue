<template>
  <div class="text-center myHero">
    <div class="filtro">
      <h1>my favorite heroes</h1>
      <p>{{arrayHeros}}</p>
      <div v-for="(hero, index) of arrayHeros" :key="index">
        <span>{{hero.hero.name}}</span>
      </div>
      <div class="tusheroes"></div>
      <v-btn @click="subirMyhero(arrayHeros)">subir</v-btn>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search you Hero"
        aria-label="Search"
        v-model="palabra"
      >
    </div>
    <div class="resultados">
      <div class="heros" v-if="palabra.length > 1">
        <v-layout row wrap class="galeria">
          <v-flex xs4 v-for="(hero, index) of filterItems" :key="index">
            <figure @click="anadirHero(hero)">
              <v-img :src="`${hero.images.lg}`"></v-img>
              <figcaption class="figure-caption">{{hero.name}}</figcaption>
            </figure>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
import { firebase, storage, db } from "@/firebase";
import CardHero from "../components/CardHero.vue";
import { mapState } from "vuex";

export default {
  components: {
    CardHero
  },
  data() {
    return {
      palabra: "",
      arrayHeros: []
    };
  },
  created() {
    if (this.usuario.Myhero) {
      this.arrayHeros = this.usuario.Myhero;
    } else {
      this.arrayHeros = [];
    }
    this.$store.dispatch("getHeroes");
  },

  computed: {
    ...mapState(["usuario"]),
    filterItems() {
      if (this.palabra.length > 1) {
        return this.$store.getters.hero.filter(hero => {
          return (
            hero.name.toLowerCase().match(this.palabra.toLowerCase()) ||
            hero.connections.groupAffiliation
              .toLowerCase()
              .match(this.palabra.toLowerCase())
          );
        });
      }
    }
  },
  methods: {
    subirMyhero(array) {
      db.collection("usuarios")
        .doc(this.usuario.uid)
        .update({
          Myhero: array
        });
    },
    anadirHero(a) {
      //this.myHeros.push(a);
      console.log(this.usuario.Myhero);
    }
  },
};
</script>
<style>
.filtro {
  position: fixed;
  z-index: 2;
  top: 11.5%;
  width: 96%;
  background-color: white;
  padding: 2%;
}
.resultados {
  margin-top: 42%;
}
.galeria {
  margin: 0 5%;
}
</style>
