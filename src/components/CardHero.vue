<template>
  <div class="card2-holder">
    <router-link :to="{name:'hero',params:{id:hero.id}}">
      <div class="card2-image">
        <v-img :src="`${hero.images.lg}`"></v-img>
      </div>
      <div class="card2-info">
        <div :class="hero.biography.alignment" class="card2-classholder">
          <div class="card2-class">
            <v-icon class="material-icons" v-if="hero.biography.alignment=='bad'">far fa-angry</v-icon>
            <v-icon class="material-icons" v-if="hero.biography.alignment=='good'">far fa-grin-alt</v-icon>
            <v-icon
              class="material-icons"
              v-if="hero.biography.alignment=='neutral'"
            >far fa-meh-blank</v-icon>
          </div>
        </div>
        <span class="card2-title">{{hero.name}}</span>
        <span>{{hero.film}}</span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["hero"],
  name: "CardHero"
};
</script>
<style>
.card2-holder {
  position: relative;
  border: none;
  overflow: hidden;
  height: 240px;
  border-radius: 10%;
  box-shadow: 9px 10px 6px -4px rgba(0, 0, 0, 0.75);
}
.card2-image {
  width: 100%;
  height: 100%;
}
.card2-image .v-image {
  height: 100%;
}
.card2-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.75em 0.5em 0.5em 0.5em;
  background-color: rgba(58, 58, 58, 0.85);
  color: #fff;
}
.card2-classholder {
  position: relative;
  width: 100%;
}
.card2-class {
  position: absolute;
  bottom: 3px;
  left: 40%;
  border-radius: 1.1em;
  padding: 0.45em;
  background-color: #ffffffb0;
  width: 43px;
  height: 43px;
  border: 4px solid;
}
.card2-info span {
  display: block;
  text-align: center;
}
.card2-title {
  font-size: 135%;
  font-weight: 700;
}
.good,
.good .v-icon {
  color: #008000bd !important;
}
.bad,
.bad .v-icon {
  color: #9e0c0cbd !important;
}
.neutral,
.neutral .v-icon {
  color: #002980bd !important;
}
</style>

