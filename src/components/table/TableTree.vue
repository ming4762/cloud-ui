<template>
  <div :style="row | formatTreeStyle">
    <span  @click="handleShowHideChildren(row)" v-if="!row.isLeaf" v-bind:class="row | formatTreeClass" ></span>
    <span v-else ></span>
    {{row.name}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Emit } from 'vue-property-decorator'

  @Component({
    components: {
    }
  })
  export default class TableTree extends Vue {
    // 标识树形表格数据的级别
    ROW_TREE_LEVEL = 'tree_level'
    // 数据中存储的tree的样式
    ROW_TREE_CLASS = 'treeClass'
    // 树形表格展开、关闭样式
    TREE_OPEN_CLASS: string = 'el-tree-node__expand-icon el-icon-caret-right expanded'
    TREE_CLOSE_CLASS: string = 'el-tree-node__expand-icon el-icon-caret-right'

    // 表格工具类
    @Prop()
    tableUtil
    row: any
    index: number
    // 父组件传入当前数据
    @Prop()
    scope: any
    // 标识上级code
    @Prop()
    parentCode: string
    @Prop()
    code: string

    /**
     * vue声明周期钩子：创建完毕状态
     */
    created () {
      this.row = this.scope['row']
      this.index = this.scope['$index']
      let $this = this
      // 格式化树形样式
      Vue.filter('formatTreeStyle', function (row) {
        let px = 0
        if (row && row[$this.ROW_TREE_LEVEL]) {
          let level = row[$this.ROW_TREE_LEVEL]
          if (level > 1) {
            px = 18 * (level - 1)
          }
          if (row['isLeaf'] === true) {
            px += 18
          }
        }
        return 'padding-left: ' + px + 'px;'
      })
      // 格式化树形按钮样式
      Vue.filter('formatTreeClass', function (row) {
        if (row[$this.ROW_TREE_CLASS] === 'open') {
          return $this.TREE_OPEN_CLASS
        } else {
          return $this.TREE_CLOSE_CLASS
        }
      })
    }

    /**
     * 显示隐藏子列表
     */
    handleShowHideChildren () {
      // 改变样式
      // 如果不存在样式信息，则默认是未展开的状态，点击后展开
      if (!this.row[this.ROW_TREE_CLASS] || this.row[this.ROW_TREE_CLASS] === 'close') {
        // 展开节点
        this.row[this.ROW_TREE_CLASS] = 'open'
        // 展开节点
        this.openTree()
      } else {
        this.row[this.ROW_TREE_CLASS] = 'close'
        // 关闭节点
        this.closeTree()
      }
    }

    /**
     * 展开树形结构
     */
    openTree () {
      let $this = this
      // 从节点中获取下级数据，如果没有，从后台获取
      if (this.row[this.tableUtil.ROW_CHILDREN_DATA]) {

      } else {
        let parameters: {[index: string]: any} = {}
        parameters[this.parentCode] = this.row[this.code]
        this.tableUtil.loadTableData(parameters, success)
      }
      function success (result) {
        console.log(result)
        $this.row[$this.tableUtil.ROW_CHILDREN_DATA] = $this.tableUtil.formatTreeLevel(result[$this.tableUtil.TABLE_DATA_KEY], $this.row[$this.tableUtil.ROW_TREE_LEVEL])
        $this.appendChildren($this.row[$this.tableUtil.ROW_CHILDREN_DATA], $this.index)
      }
    }

    /**
     * 关闭树形结构
     */
    closeTree () {

    }

    /**
     * 添加下级
     */
    @Emit('appendChildren')
    appendChildren (data: any, index: number): void {
    }
  }
</script>

<style scoped>

</style>
