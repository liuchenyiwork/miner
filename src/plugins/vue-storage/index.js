import storage from "@/utils/storage";

export default {
  /**
   * vue storage plugin
   */
  install: function (vue) {
    vue.prototype.$storage = storage
  }
}

