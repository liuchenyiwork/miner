import Vue from 'vue'
import Vuex from 'vuex'

import getters from "@/store/getters";
import styles from "@/store/modules/styles";
import user from "@/store/modules/user";
import gain from "@/store/modules/gain";

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    styles,
    user,
    gain
  }
})

