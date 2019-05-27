<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer class="pa-3" color="red darken-4" fixed>
      <p>SUPER-HERO</p>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";
export default {
  components: {
    Navbar
  },
  name: "App",
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
<style>
p {
  margin: 0px;
}
a {
  color: white;
  text-decoration: none;
}

main {
  width: 100%;
  height: 100%;
  padding: 90px 0 38px 0 !important;
  border-right: 8px solid #b71c1c;
  border-left: 8px solid #b71c1c;
}

.v-footer p {
  width: 100%;
  text-align: center;
  font-size: 150%;
  color: white;
}
.container {
  padding: 0 !important;
}
</style>

