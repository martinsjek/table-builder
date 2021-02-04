<template>
  <div class="table">
    <div class="pell-actionbar real">
      <button class="pell-button pell-button-selected" title="Bold" type="button" @click="pellClick('Bold')">
        <b>B</b>
      </button>
      <button class="pell-button" title="Underline" type="button" @click="pellClick('Underline')">
        <u>U</u>
      </button>
      <button class="pell-button" title="Link" type="button" @click="pellClick('Link')">🔗</button>
    </div>
    <table>
      <tr v-for="(item, index) in table">
        <th v-for="(colItem, colIndex) in item" v-if="index === 0">
          <vue-pell-editor v-model="item[colIndex]" :actions="editorOptions" placeholder=""/>
        </th>
        <td v-for="(colItem, colIndex) in item" v-if="index !== 0">
          <vue-pell-editor v-model="item[colIndex]" :actions="editorOptions" placeholder=""/>
          <Options class="hide bottom" :remove="true" @remove="deleteColumn(colIndex)"
                   v-if="table.length === index + 1 && colIndex > 0"/>
        </td>
        <Options class="hide right" :remove="true" @remove="deleteRow(index)" v-if="index > 0"/>
      </tr>
      <Options class="bottom" :add="true" @add="addRow"/>
      <Options class="right" :add="true" @add="addColumn"/>
    </table>
    <input type="hidden" name="table" v-model="JSON.stringify(table)">
  </div>
</template>

<script>
import Options from "./components/Options";

export default {
  components: {
    Options
  },
  data() {
    return {
      table: [
        [
          ''
        ]
      ],
      editorOptions: [
        'bold',
        'underline',
        'link'
      ],
    }
  },
  methods: {
    addRow() {
      let rowCount = this.table.length;
      let lastRow = this.table[rowCount - 1];

      let insertData = [];
      for (let i in lastRow) {
        insertData[i] = '';
      }
      this.table.push(insertData);
    },

    addColumn() {
      let columnCount = this.table[0].length;
      for (let i = 0; i < this.table.length; i++) {
        this.table[i][columnCount] = '';
        this.$forceUpdate()
      }
    },

    deleteRow(index) {
      this.table.splice(index, 1);
    },

    deleteColumn(index) {
      for (let i in this.table) {
        if (typeof this.table[i][index] !== 'undefined') {
          this.table[i].splice(index, 1);
        }
      }
    },
    pellClick(type) {
      let selection = window.getSelection();
      if (selection) {
        let pellActions = selection.focusNode.parentElement.closest('.vp-editor').querySelector('.pell-actionbar');
        pellActions.querySelector(`[title="${type}"]`).click();
      }
    }
  }
}
</script>

<style lang="scss">
.hide {
  display: none !important;
}

input {
  border: none;
  outline: none;
}

.pell-actionbar {
  &:not(.real) {
    display: none;
  }
}

.pell-content {
  text-align: left;
  min-height: 50px;
  height: auto !important;
}

table {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
  width: calc(100% - 50px);

  .options {
    position: absolute;

    &.bottom {
      display: flex;
      align-items: center;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
    }

    &.right {
      right: 0;
      transform: translateX(100%) translateY(-50%);
      top: 50%;
    }
  }

  tr {
    position: relative;
    border-bottom: 1px solid black;

    &:hover {
      > .options {
        display: block !important;
        z-index: 1;
        background: white;
      }
    }
  }

  th {
    input {
      background: #999;
    }
  }

  th, td {
    position: relative;
    width: 100%;

    &:not(:last-child) {
      border-right: 1px solid black;
    }

    &:hover {
      > .options {
        display: block !important;
        z-index: 1;
        background: white;
      }
    }
  }
}
</style>