import Vue from "vue";
import TableBuilder from "./TableBuilder";
import 'normalize.css'

new Vue({
    el: '#table-builder',
    template: '<TableBuilder />',
    components: { TableBuilder }
})
