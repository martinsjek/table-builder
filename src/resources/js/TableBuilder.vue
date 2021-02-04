<template>
  <div class="table">
    <table>
      <tr v-for="(item, index) in table">
        <div v-if="index === 0">
          <th v-for="(colItem, colIndex) in item">
            <input type="text" v-model="item[colIndex]">
          </th>
        </div>
        <div v-else>
          <td v-for="(colItem, colIndex) in item">
            <input type="text" v-model="item[colIndex]">
            <Options class="hide bottom" :remove="true" @remove="deleteColumn(colIndex)" v-if="table.length === index + 1 && colIndex > 0" />
          </td>
        </div>
        <Options class="hide right" :remove="true" @remove="deleteRow(index)" v-if="index > 0" />
      </tr>
      <Options class="bottom" :add="true" @add="addRow" />
      <Options class="right" :add="true" @add="addColumn" />
    </table>
    <input type="hidden" name="table" v-model="JSON.stringify(table)">
  </div>
</template>

<script>
import Options from "./components/Options";
export default {
  components:{
    Options
  },
  data() {
    return {
      table: [
        [
            ''
        ]
      ],
    }
  },
  methods: {
    addRow() {
      let rowCount = this.table.length;
      let lastRow = this.table[rowCount - 1];

      let insertData = [];
      for(let i in lastRow){
        insertData[i] = '';
      }
      this.table.push(insertData);
    },

    addColumn() {
      let columnCount = this.table[0].length;
      for(let i = 0; i < this.table.length; i++){
        this.table[i][columnCount] = '';
        this.$forceUpdate()
      }
    },

    deleteRow(index) {
      this.table.splice(index,1);
    },

    deleteColumn(index) {
      for(let i in this.table){
        if(typeof this.table[i][index] !== 'undefined'){
          this.table[i].splice(index,1);
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .hide{
    display: none!important;
  }
  input{
    border:none;
    outline:none;
  }
  table{
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    position: relative;
    border-collapse: collapse;
    .options{
      position: absolute;
      &.bottom{
        display: flex;
        align-items: center;
        bottom:0;
        left:50%;
        transform: translateX(-50%) translateY(100%);
      }
      &.right{
        right:0;
        transform: translateX(100%) translateY(-50%);
        top:50%;
      }
    }
    tr{
      position: relative;
      border-bottom: 1px solid black;
      &:hover{
        > .options{
          display: block!important;
          z-index: 1;
          background: white;
        }
      }
    }
    th{
      input{
        background: #999;
      }
    }
    th, td{
      position: relative;
      &:not(:last-child){
        border-right: 1px solid black;
      }
      &:hover{
        > .options{
          display: block!important;
          z-index: 1;
          background: white;
        }
      }
    }
  }
</style>