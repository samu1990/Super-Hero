<template>
  <div class="comics">
    <v-layout row wrap class="galeriaComic">
      <v-flex xs6 v-for="(comic, index) of arrayComic" :key="index">
        <a :href="comic.urls['0'].url">
          <div class="card2-holder">
            <div class="card2-image">
              <v-img :src="comic.thumbnail.path+'.jpg'"></v-img>
            </div>
            <div class="card2-info">
              <span>{{comic.title}}</span>
            </div>
          </div>
        </a>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { log } from "util";
export default {
  props: ["IDMarvel", "arComics"],
  name: "Comic",
  data() {
    return {
      arrayComic: []
    };
  },
  methods: {
    getMArvelComic(IDMarvel, array) {
      for (const comics of array) {
        console.log(comics.name);
      }
      const urlAPI =
        "https://gateway.marvel.com:443/v1/public/characters/" +
        IDMarvel +
        "/comics?orderBy=focDate&format=comic&limit=10&apikey=b778547e5cddcf0d217cd5dd65b53de7&hash=88691937410FD8F69F5D8E2BFFDA2ADF";
      fetch(urlAPI)
        .then(res => res.json())
        .then(json => {
          for (const comics of json.data.results) {
            this.arrayComic.push(comics);
          }
          console.log(IDMarvel, this.arrayComic.length);
        });
    }
  },
  created() {
    this.getMArvelComic(this.IDMarvel, this.arComics);
  }
};
</script>
<style>
.comics .cblock {
  padding: 0 5px !important;
}
.comics .galeriaComic > div {
  padding: 3%;
  width: 100%;
}
</style>
