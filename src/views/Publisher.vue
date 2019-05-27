<template>
  <div class="Publisher">
    <div class="filtro">
      <div class="botonera">
        <div class="alignment">
          <div class="button">
            <input type="checkbox" v-model="alignment" value="good">
            <span>Good</span>
          </div>
          <div class="button">
            <input type="checkbox" v-model="alignment" value="neutral">
            <span>Neutal</span>
          </div>
          <div class="button">
            <input type="checkbox" v-model="alignment" value="bad">
            <span>Bad</span>
          </div>
        </div>
        <div class="cine">
          <div class="button">
            <input type="checkbox" v-model="cine" value="Marvel">
            <span>Marvel</span>
          </div>
          <div class="button">
            <input type="checkbox" v-model="cine" value="DC">
            <span>DC</span>
          </div>
        </div>
        <div class="film" v-if="cine.includes('Marvel')">
          <div class="button">
            <input type="checkbox" v-model="film" value="Avengers">
            <span>Avengers</span>
          </div>
          <div class="button">
            <input type="checkbox" v-model="film" value="X-Men">
            <span>X-Men</span>
          </div>
          <div class="button">
            <input type="checkbox" v-model="film" value="Fantasti Four">
            <span>Fantasti Four</span>
          </div>
        </div>
      </div>
    </div>
    <div class="heroes">
      <v-layout row wrap class="galeria">
        <v-flex xs4 v-for="(hero, index) of heroes" :key="index" v-if="filtrar(hero)">
          <CardHero :hero="hero"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import CardHero from "../components/CardHero.vue";
import { log } from "util";
export default {
  components: {
    CardHero
  },
  data() {
    return {
      cine: [],
      film: [],
      alignment: []
    };
  },
  created() {
    this.$store.dispatch("getHeroes");
  },
  computed: {
    heroes() {
      return this.$store.getters.hero;
    }
  },
  methods: {
    AgregarCine(cines) {
      if (this.cine.includes(cines)) {
        var i = this.cine.indexOf(cines);
        this.cine.splice(i, 1);
      } else {
        this.cine.push(cines);
      }
    },
    filtrar(hero) {
      var result = true;
      if (
        !this.alignment.includes(hero.biography.alignment) &&
        this.alignment.length > 0
      ) {
        result = false;
      }
      if (!this.cine.includes(hero.film) && this.cine.length > 0) {
        result = false;
      }
      if (this.cine.includes("other") && !hero.film == "Other") {
        result = false;
      }
      if (!this.film.includes(hero.team) && this.film.length > 0) {
        result = false;
      }
      return result;
    }
  }
};
</script>
<style>
.filtro {
  min-height: 18%;
  text-align: center;
  position: fixed;
  z-index: 2;
  top: 12%;
  width: 96%;
  background-color: white;
  padding: 2% 0;
}
.filtro .botonera > div {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2%;
}
.filtro .button {
  width: 33%;
}
.filtro input {
  transform: scale(2);
  vertical-align: middle;
  margin-right: 6%;
}
.filtro .button span {
  font-size: 170%;
  vertical-align: middle;
}
.filtro .film .button span {
  font-size: 120%;
}

.heroes {
  margin-top: 32%;
}
.heroes .galeria > div {
  padding: 5px;
}
</style>

