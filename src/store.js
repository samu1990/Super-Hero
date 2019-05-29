import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth,
  db
} from '@/firebase';
import router from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    heroes: [],
  },

  actions: {
    getHeroes(context) {
      fetch('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
        .then(function (response) {
          return response.json();
        })
        .then(function (superHeroes) {
          var heroesID = []
          var XMEN = [11, 24, 35, 41, 57, 61, 75, 92, 119, 145, 146, 185, 196, 213, 227, 374, 423, 480, 490, 517, 523, 527, 529, 536, 567, 586, 638, 670, 717];
          var avengers = [4, 30, 106, 107, 149, 157, 218, 225, 226, 232, 234, 235, 251, 275, 280, 303, 313, 321, 332, 346, 347, 414, 430, 431, 479, 487, 498, 550, 556, 566, 572, 579, 620, 630, 655, 659, 680, 687, 697, 703, 708, 714, 726];
          var FantasticFour = [29, 96, 222, 273, 333, 344, 456, 497, 598, 658, 709];
          var heroesDC = [278, 644, 720, 643, 156, 38, 265, 444, 601, 390, 294, 194, 405, 70, 528, 386, 370, 298, 561, 53, 40, 97, 334, 165, 615];
          var heroesALL = [278, 644, 720, 643, 517, 659, 232, 156, 498, 332, 273, 157, 655, 38, 703, 697, 346, 35, 709, 680, 96, 598,
            218, 265, 321, 497, 213, 687, 423, 235, 4, 620, 374, 414, 275, 222, 717, 444, 601, 303, 572, 185, 294, 390, 658, 145,
            11, 579, 194, 280, 536, 57, 405, 29, 347,
            430, 523, 75, 431, 226, 556, 234, 344, 529, 70, 149, 92, 106, 225, 333, 714, 528, 638, 146, 480, 119, 386, 196, 479, 61,
            370,
            456, 670, 107, 298, 567, 41, 586, 487, 490, 53, 40, 561, 630, 708, 527, 334, 97, 24, 165, 227, 30,
            251, 550, 313, 615, 25, 566, 726,
          ]
          var heroesMArvel = [517, 659, 232, 273, 332, 498, 157, 655, 35, 346, 703, 709, 697, 96, 598, 680, 218, 321, 497, 235, 423, 620, 213, 687, 4, 275, 374, 414, 222, 717, 303, 572, 185,
            658, 145, 579, 280, 11, 57, 536, 29, 347, 75, 523, 430, 226, 431, 234, 344, 556, 529, 92, 149, 106, 225, 333, 714, 638, 146, 480, 119, 196, 479, 61, 456, 670,
            41, 107, 567, 487, 490, 586, 527, 630, 24, 708, 227, 30, 251, 550, 313, 25, 566, 726
          ];
          var heroesDC = [278, 644, 720, 643, 156, 38, 265, 444, 601, 390, 294, 194, 405, 70, 528, 386, 370, 298, 561, 53, 40, 97, 334, 165, 615];
          var heroesT = [];
          for (let h = 0; h < superHeroes.length; h++) {
            var element = superHeroes[h];
            var id = element.id;
            if (heroesALL.includes(id)) {
              var hero = new Object();
              hero = element;
              hero.team = '';
              if (XMEN.includes(id)) {
                hero.team = 'X-Men';
              }
              if (avengers.includes(id)) {
                hero.team = 'Avengers';
              }
              if (FantasticFour.includes(id)) {
                hero.team = 'Fantasti Four';
              }
              if (heroesDC.includes(id)) {
                hero.team = 'DC';
              }
              if (heroesMArvel.includes(id)) {
                hero.film = 'Marvel';
              }
              if (heroesDC.includes(id)) {
                hero.film = 'DC';
              }
              var TotalPower =
                (element.powerstats.intelligence + element.powerstats.strength +
                  element.powerstats.speed + element.powerstats.durability +
                  element.powerstats.power + element.powerstats.combat) / 6;
              TotalPower = Math.round(TotalPower);
              hero.total = TotalPower;
              if (id == 156) {
                hero.name = 'Shazam';
              }
              if (id == 265) {
                hero.name = 'Flash';
              }
              element.img = element.images.lg;
              var aliases = '';
              element.biography.aliases.forEach(function (element) {
                aliases = aliases + element + ', '
              })
              element.biography.Aliases = aliases.slice(0, -2)
              heroesT.push(hero);
            }
          }
          heroesT = heroesT.sort((a, b) => b.total - a.total);
          context.commit("setHeroes", heroesT)
        })
    },
    async setUsuario({
      commit
    }, user) {
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if (doc.exists) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL,
            Myhero: []
          }
          await db
            .collection("usuarios")
            .doc(usuario.uid)
            .set(usuario);
          console.log("Usuario  Guardado DB");
          commit('nuevoUsuario', usuario)
        }
      } catch (error) {
        console.log(error);

      }

    },
    cerrarSession({
      commit
    }) {
      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({
        name: '/'
      })
      console.log('Cerrar Seccion');

    }
  },
  mutations: {
    nuevoUsuario(state, payload) {
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload
      }
    },
    setHeroes(state, payload) {
      state.heroes = payload;
    }
  },
  getters: {
    hero(state) {
      return state.heroes;
    },
  }
})