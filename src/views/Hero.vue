<template>
  <div class="hero">
    <div class="caraA">
      <h2 class="text-center">
        {{superHeroes.name}}
        <p>
          {{superHeroes.film}}
          <span v-if="superHeroes.film=='Marvel'">{{superHeroes.team}}</span>
        </p>
      </h2>
      <div class="photo">
        <v-img :src="superHeroes.img"></v-img>
      </div>
      <div class="gridbarholder">
        <div class="progress" v-if="usuario">
          <div
            class="progress-bar"
            :class="'bar-'+superHeroes.biography.alignment"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{'width': superHeroes.total+'%'}"
          >
            Total
            <span>{{superHeroes.total}}%</span>
          </div>
        </div>
        <p v-if="!usuario">{{superHeroes.biography.Aliases}}</p>
      </div>
    </div>
    <div class="cblock">
      <h3 v-if="superHeroes.film=='Marvel' && description!=''">Description</h3>
      <div class="content">
        <p class="result">{{description}}</p>
      </div>

      <h3 v-if="usuario">Powerstats</h3>
      <div class="content" v-if="usuario">
        <div class="gridbarholder">
          <div class="gridbarlabel">Intelligence</div>
          <div class="progress">
            <div
              class="progress-bar bg-warning"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.intelligence+'%'}"
            >
              <span>{{superHeroes.powerstats.intelligence}}%</span>
            </div>
          </div>
        </div>
        <div class="gridbarholder">
          <div class="gridbarlabel">Strength</div>
          <div class="progress">
            <div
              class="progress-bar bg-secondary"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.strength+'%'}"
            >
              <span>{{superHeroes.powerstats.strength}}%</span>
            </div>
          </div>
        </div>
        <div class="gridbarholder">
          <div class="gridbarlabel">Speed</div>
          <div class="progress">
            <div
              class="progress-bar bg-info"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.speed+'%'}"
            >
              <span>{{superHeroes.powerstats.speed}}%</span>
            </div>
          </div>
        </div>
        <div class="gridbarholder">
          <div class="gridbarlabel">Durability</div>
          <div class="progress">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.durability+'%'}"
            >
              <span>{{superHeroes.powerstats.durability}}%</span>
            </div>
          </div>
        </div>
        <div class="gridbarholder">
          <div class="gridbarlabel">Power</div>
          <div class="progress">
            <div
              class="progress-bar bg-dark"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.power+'%'}"
            >
              <span>{{superHeroes.powerstats.power}}%</span>
            </div>
          </div>
        </div>
        <div class="gridbarholder">
          <div class="gridbarlabel">Combat</div>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{'width': superHeroes.powerstats.combat+'%'}"
            >
              <span>{{superHeroes.powerstats.combat}}%</span>
            </div>
          </div>
        </div>
      </div>
      <h3>Biography</h3>
      <div class="content">
        <p class="title">Full name</p>
        <p class="result">{{superHeroes.biography.fullName}}</p>
        <p class="title">Alter Egos</p>
        <p class="result">{{superHeroes.biography.alterEgos}}</p>
        <p class="title">Aliases</p>
        <p class="result">{{superHeroes.biography.Aliases}}</p>
        <p class="title">Place of birth</p>
        <p class="result">{{superHeroes.biography.placeOfBirth}}</p>
        <p class="title">First appearance</p>
        <p class="result">{{superHeroes.biography.firstAppearance}}</p>
        <p class="title">Creator</p>
        <p class="result">{{superHeroes.team}}</p>
        <p class="title">Alignment</p>
        <p class="result">{{superHeroes.biography.alignment}}</p>
      </div>
      <h3>Appearence</h3>
      <div class="content">
        <p class="title">Gender</p>
        <p class="result">{{superHeroes.appearance.gender}}</p>
        <p class="title">Race</p>
        <p class="result">{{superHeroes.appearance.race}}</p>
        <p class="title">Height</p>
        <p class="result">{{superHeroes.appearance.height[1]}}</p>
        <p class="title">Weight</p>
        <p class="result">{{superHeroes.appearance.weight[1]}}</p>
        <p class="title">Eye color</p>
        <p class="result">{{superHeroes.appearance.eyeColor}}</p>
        <p class="title">Hair color</p>
        <p class="result">{{superHeroes.appearance.hairColor}}</p>
      </div>
      <h3>Work</h3>
      <div class="content">
        <p class="title">Occupation</p>
        <p class="result">{{superHeroes.work.occupation}}</p>
        <p class="title">Base</p>
        <p class="result">{{superHeroes.work.base}}</p>
      </div>
      <h3>Connections</h3>
      <div class="content">
        <p class="title">Team Affiliation</p>
        <p class="result">{{superHeroes.connections.groupAffiliation}}</p>
        <p class="title">Relatives</p>
        <p class="result">{{superHeroes.connections.relatives}}</p>
      </div>
      <div v-if="superHeroes.film=='Marvel' && usuario && urlComic!=''">
        <h3 v-if="usuario">Comics</h3>
        <Comic :IDMarvel="idMarvel" :arComics="arComics"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Comic from "../components/Comic.vue";

export default {
  components: {
    Comic
  },
  name: "Hero",
  data() {
    return {
      id: this.$route.params.id,
      superHeroes: [],
      infoName: "",
      description: "",
      urlComic: "",
      idMarvel: "",
      arComics: []
    };
  },
  methods: {
    getHeroe(id, array) {
      for (let index = 0; index < array.length; index++) {
        var element = array[index];
        if (element.id == id) {
          console.log(element);
          break;
        }
      }
      this.superHeroes = element;
    },
    getName(array) {
      this.infoName = array.name;
    },
    getMArvel(name) {
      if (name == "Phoenix") {
        name = "Jean Grey";
      }
      if (name == "Captain Marvel") {
        name = "Captain Marvel (Carol Danvers)";
      }
      if (name == "Ant-Man") {
        name = "Hank Pym";
      }

      const urlAPI =
        "https://gateway.marvel.com:443/v1/public/characters?name=" +
        name +
        "&limit=1&apikey=b778547e5cddcf0d217cd5dd65b53de7&hash=88691937410FD8F69F5D8E2BFFDA2ADF";
      fetch(urlAPI)
        .then(res => res.json())
        .then(json => {
          for (const hero of json.data.results) {
            console.log(hero);
            let urlHero = hero.description;
            this.description += urlHero;
            this.urlComic = hero.urls["2"].url;
            this.idMarvel = hero.id;
            this.arComics = hero.comics.items;
          }
        });
    }
  },
  created() {
    this.getHeroe(this.id, this.$store.getters.hero);
    this.getName(this.superHeroes);
    this.getMArvel(this.infoName);
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
.caraA {
  margin-bottom: 9%;
}
.caraA > div {
  margin: 0 5%;
}
.caraA h2 {
  margin-top: 1%;
}
.caraA .gridbarholder {
  height: 45px;
  margin-top: 1%;
}
.caraA .progress {
  height: 100%;
}
.cblock {
  padding: 0 10px;
}
.progress {
  height: 2.5rem;
  margin-bottom: 2%;
}
.powers {
  margin: 0 5%;
  margin-top: 2%;
}
.progress-bar {
  text-align: left;
  padding-left: 2%;
}
.bg-warning {
  color: black;
}

h3 {
  border-left: 7px solid #b71c1c;
  line-height: 1.6em;
  color: #b71c1c;
  padding-left: 1%;
  margin: 1% 0;
}
.cblock .content {
  margin: 0 5%;
  margin-bottom: 2%;
}
.cblock .content .title {
  font-weight: 700;
  margin: 2% 0 0 0;
}
.cblock .content .result {
  padding: 0 10px;
}

.bar-good {
  background-color: #008000bd !important;
}
.bar-bad {
  background-color: #9e0c0cbd !important;
}
.bar-neutral {
  background-color: #002980bd !important;
}
</style>

