import Vue from "vue";
const moment = require("moment");

Vue.prototype.$timer = time => {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
};