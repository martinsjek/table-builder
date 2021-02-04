import Vue from "vue";
import TableBuilder from "./TableBuilder";
import 'normalize.css'
import VuePellEditor from 'vue-pell-editor'

Vue.use(VuePellEditor)

new Vue({
    el: '#table-builder',
    template: '<TableBuilder />',
    components: { TableBuilder }
})
