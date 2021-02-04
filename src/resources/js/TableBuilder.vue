<template>
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
        </td>
      </div>
      <Options class="hide right" :remove="true" @remove="deleteRow(index)" v-if="index > 0" />
    </tr>
    <Options class="bottom" :add="true" @add="addRow" />
    <Options class="right" :add="true" @add="addColumn" />
  </table>
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
        {
          0 : 'Value 1'
        }
      ],
    }
  },
  methods: {
    addRow() {
      let rowCount = Object.keys(this.table).length;
      let lastRow = this.table[rowCount - 1];

      let insertData = {};
      for(let i in lastRow){
        insertData[i] = '';
      }
      this.table.push(insertData);
    },

    addColumn() {
      let columnCount = Object.keys(this.table[0]).length;
      for(let i = 0; i < this.table.length; i++){
        this.table[i][columnCount] = `val ${columnCount}`;
        this.$forceUpdate()
      }
    },

    deleteRow(index) {
      this.table.splice(index,1);
    },

    deleteColumn(index) {

    },
  }
}
</script>

<style lang="scss">
  .hide{
    display: none;
  }
  table{
    position: relative;
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
      &:hover{
        > .options{
          display: block;
          z-index: 1;
          background: white;
        }
      }
    }
  }
</style>