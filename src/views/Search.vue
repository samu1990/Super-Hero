<template>
  <div class="search">
    <h2 id="title">look for your superhero</h2>
    <input
      class="form-control mr-sm-2"
      type="search"
      placeholder="Search you Hero"
      aria-label="Search"
      v-model="palabra"
    >
    <div class="resutsHero">
      <div class="heros" v-if="palabra.length > 1">
        <v-layout row wrap class="galeria">
          <v-flex xs4 v-for="(hero, index) of filterItems" :key="index">
            <CardHero :hero="hero"/>
          </v-flex>
        </v-layout>
      </div>
      <div class="imgfon" v-if="palabra.length<2">
        <img src="https://i.pinimg.com/originals/91/66/67/916667f5a738d3f00663db4e8b91d872.jpg">
      </div>
    </div>
  </div>
</template>
<script>
import CardHero from "../components/CardHero.vue";
export default {
  components: {
    CardHero
  },
  data() {
    return {
      palabra: ""
    };
  },
  created() {
    this.$store.dispatch("getHeroes");
  },
  computed: {
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
  }
};
</script>
<style>
.search {
  text-align: center;
  margin-top: 2%;
}
.search h2 {
  color: darkred;
}
.galeria {
  margin: 0;
  width: 100%;
}
.galeria > div {
  padding: 5px;
}
.card2-title {
  font-size: 100%;
}
.form-control {
  margin: 0 5%;
  width: 90%;
}
.resutsHero .imgfon img {
  width: 85%;
  margin-top: 4%;
  box-shadow: 9px 10px 6px -4px rgba(0, 0, 0, 0.75);
}
</style>
