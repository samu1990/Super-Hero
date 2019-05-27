<template>
  <div class="index">
    <h2>The Best Superheroes</h2>
    <v-layout row wrap class="galeria">
      <v-flex xs6 v-for="(hero, index) of heroes" :key="index" v-if="index<=9">
        <CardHero :hero="hero"/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import CardHero from "../components/CardHero.vue";

export default {
  components: {
    CardHero
  },
  created() {
    this.$store.dispatch("getHeroes");
  },
  computed: {
    heroes() {
      return this.$store.getters.hero.slice();
    },
    heroesHeight() {
      return this.$store.getters.hero
        .slice()
        .sort((a, b) => b.appearance.Height - a.appearance.Height);
    }
  }
};
</script>
<style>
.index {
  text-align: center;
}
.galeria {
  margin: 0;
}
.index .galeria > div {
  padding: 20px;
}
</style>

