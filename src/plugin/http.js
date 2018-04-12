import Vue from "vue";

/**
 * axios
 * How to use:
 * this.$http.get()
 */
import axios from "axios";

Vue.HTTP = Vue.prototype.$http = axios;