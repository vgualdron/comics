import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueLocalStorage from 'vue-localstorage'
import vGallery from 'v-gallery'
window.toastr = require('toastr')

Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)
Vue.use(vGallery)
Vue.use(require('vue-moment'))