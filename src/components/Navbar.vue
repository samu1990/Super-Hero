<template>
  <nav>
    <v-toolbar app color="red darken-4" white-text>
      <v-toolbar-side-icon v-if="usuario!=''" @click="drawer= !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name:'home'}">
          <span>SUPER-HERO</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/">
          <v-btn icon>
            <v-icon>fas fa-home</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/Publisher" v-if="usuario!=''">
          <v-btn icon>
            <v-icon>fas fa-film</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/Ingreso" v-if="usuario==''">
          <v-btn icon>
            <v-icon>fas fa-users-cog</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/Search">
          <v-btn icon>
            <v-icon>fas fa-search</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar-items>
      <template v-slot:extension>
        <p v-if="usuario!=''" class="white--text">Hello {{usuario.nombre}}</p>
      </template>
    </v-toolbar>
    <v-navigation-drawer v-if="usuario!=''" class="red lighten-1" dark v-model="drawer" app>
      <v-layout column align-center mt-3 red darken-2 class>
        <v-flex>
          <v-avatar>
            <img :src="usuario.foto" alt="profile-photo">
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="white--text">{{usuario.nombre}}</p>
        </v-flex>
      </v-layout>
      <v-list>
        <div v-for="(item, index) in items" :key="index" class="red darken-2">
          <router-link :to="item.to">
            <div>
              <v-icon class="white--text">{{item.icon}}</v-icon>
              <span>{{item.title}}</span>
            </div>
          </router-link>
        </div>
      </v-list>
      <v-divider></v-divider>
      <v-btn @click="cerrarSession()" v-if="usuario!=''">
        <span class="mr-2">Cerrar sessión</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "Administration",
          icon: "fas fa-user-cog",
          to: { name: "admin" }
        },
        {
          title: "Chat",
          icon: "fas fa-comments",
          to: { name: "chat" }
        },
        {
          title: "My Heroes",
          icon: "fas fa-mask",
          to: { name: "myHeros" }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["cerrarSession"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
.application nav a {
  color: white;
  text-decoration: none;
}
.application nav .v-btn .v-btn__content .v-icon {
  color: white;
}
.v-toolbar__extension {
  height: 30px !important;
  text-align: center;
  display: block;
  font-size: 120%;
}
.v-toolbar__extension p {
  margin: 0;
}
.v-navigation-drawer {
  height: 53% !important;
  width: 220px !important;
  top: 8% !important;
}
.layout.column {
  padding: 2%;
  border-radius: 10%;
  margin: 3% 5%;
}
.v-list > div,
.v-navigation-drawer button {
  margin: 3% 5%;
  padding: 5px 10px;
  border-radius: 5px;
  height: 49px;
  font-size: 130%;
}
.v-list a > div {
  width: 100%;
  height: 100%;
  margin-top: 4%;
}
.v-list .v-icon {
  margin-right: 5%;
}
</style>
