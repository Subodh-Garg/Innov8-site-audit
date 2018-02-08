import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCFE3vqCjAklNbgr69hwSfJp5ibkh4WOFA',
      authDomain: 'innov8-site-audit.firebaseapp.com',
      databaseURL: 'https://innov8-site-audit.firebaseio.com',
      projectId: 'innov8-site-audit',
      storageBucket: 'innov8-site-audit.appspot.com',
      messagingSenderId: '1099446101712'
    })
    // Initialize Cloud Firestore through Firebase
    this.$store.commit('setFirebasedb', firebase.firestore())
  }
})
