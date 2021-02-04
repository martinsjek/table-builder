<template>
  <table>
    <tr v-for="i in rowCount">
      <div v-if="i === 1">
        <th v-for="j in columnCount">
          <input type="text">
        </th>
      </div>
      <div v-else>
        <td v-for="j in columnCount">
          <input type="text">
        </td>
      </div>
    </tr>
    <Options class="bottom" @add="addRow" @remove="deleteRow" />
    <Options class="right" @add="addColumn" @remove="deleteColumn" />
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
      rowCount: 1,
      columnCount: 1
    }
  },
  methods: {
    addRow() {
      this.rowCount += 1;
    },

    addColumn() {
      this.columnCount += 1;
    },

    deleteRow(index) {

    },

    deleteColumn(index) {

    }
  }
}
</script>

<style lang="scss">
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
  }
</style>