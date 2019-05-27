<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3 class="text-xs-center">My Chat</h3>
        </v-card-text>
        <v-card-text class="smsChat" v-chat-scroll>
          <div
            v-for="(item,index) in mensajes"
            :key="index"
            :class="item.nombre==usuario.nombre ? 'text-xs-right':'text-xs-left'"
          >
            <v-chip>
              <p>{{item.mensaje}}</p>
            </v-chip>
            <p v-if="item.nombre==usuario.nombre" class="caption mr-2">{{item.fecha}}</p>
            <p
              v-if="item.nombre!=usuario.nombre"
              class="caption ml-2"
            >{{item.nombre}} {{item.fecha}}</p>
          </div>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="enviarMensaje()" v-model="valido">
            <v-text-field
              v-model="mensaje"
              label="Escribe tu mensaje aqui"
              required
              :rules="reglas"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";
import { db } from "@/firebase";
import moment from "moment";

export default {
  data() {
    return {
      mensaje: "",
      valido: false,
      reglas: [v => !!v || "text is required"],
      mensajes: []
    };
  },
  computed: {
    ...mapState(["usuario"])
  },
  methods: {
    enviarMensaje() {
      if (this.valido) {
        console.log("enviar msn ", this.mensaje);

        db.collection("chats")
          .add({
            mensaje: this.mensaje,
            nombre: this.usuario.nombre,
            foto: this.usuario.foto,
            fecha: Date.now()
          })
          .catch(error => console.log(error));

        this.mensaje = "";
      } else {
        console.log("no enviaste el mensaje");
      }
    }
  },
  created() {
    moment.locale("en");
    let ref = db
      .collection("chats")
      .orderBy("fecha", "desc")
      .limit(10);

    ref.onSnapshot(querySnapshot => {
      this.mensajes = [];
      querySnapshot.forEach(doc => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          foto: doc.data().foto,
          nombre: doc.data().nombre,
          //fecha: moment(doc.data().fecha).format("DD/MM/YYYY, hh:mm")
          fecha: moment(doc.data().fecha).format("DD/MM/YY")
        });
      });
      console.log(this.mensajes);
    });
  }
};
</script>
<style>
.smsChat {
  height: 60vh;
  overflow: auto;
  background-color: #941d1d;
  margin: 0 3%;
  width: 94%;
  border-radius: 5%;
}
.smsChat > div {
  margin: 2% 0;
}
.theme--light.v-chip {
  background: white;
}
.caption {
  color: white;
}
</style>
