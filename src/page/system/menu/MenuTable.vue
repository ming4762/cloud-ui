<template>
  <div class="wrapper wrapper-content ">
    <div class="col-sm-12">
      <div class="ibox">
        <div class="ibox-body">
          <!--按钮组件-->
          <TableTopButtons :buttonsPermission="buttonsPermission"></TableTopButtons>
          <!--表格-->
          <template>
            <el-table
              :data="tableData"
              border
              stripe
              :height="tableHeight"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="40"
                align="center"></el-table-column>
              <el-table-column
                type="index"
                width="60"
                align="center"
                label="序号"></el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="240"
                sortable="custom">
                <template slot-scope="scope">
                  <div :style="scope.row | formatTreeStyle">
                    <span  @click="handleShowHideChildren(scope.row, scope.$index)" v-if="!scope.row.isLeaf" v-bind:class="scope.row | formatTreeClass" ></span>
                    <span v-else ></span>
                    {{scope.row.name}}
                  </div>
                  <!--<TableTree @appendChildren="appendChildren" :tableUtil="tableUtil" :scope="scope" :parentCode="'parentId'" :code="'menuId'"></TableTree>-->
                </template>
              </el-table-column>
              <el-table-column
                prop="icon"
                label="图标"
                width="80"
                align="center">
                <template slot-scope="scope">
                  <!--<i v-bind:class="scope.row | formatIcon"></i>-->
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                width="100"
                align="center">
                <template slot-scope="scope">
                  <!--<span :class="scope.row.type | formatTypeClass">{{scope.row.type | formatTypeName}}</span>-->
                </template>
              </el-table-column>
              <el-table-column
                prop="url"
                label="地址"
                align="center"
                min-width="220"></el-table-column>
              <el-table-column
                prop="perms"
                label="权限标识"
                width="180"
                align="center"></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200"
                align="center">
                <!--<template slot-scope="scope">-->
                <!--<el-button-->
                <!--v-if="buttons.addButton"-->
                <!--size="mini"-->
                <!--type="primary"-->
                <!--@click="handleAdd(scope.$index, scope.row)"-->
                <!--icon="el-icon-plus"></el-button>-->
                <!--<el-button-->
                <!--v-if="buttons.editButton"-->
                <!--size="mini"-->
                <!--type="warning"-->
                <!--@click="handleEdit(scope.$index, scope.row)"-->
                <!--icon="el-icon-edit"></el-button>-->
                <!--<el-button-->
                <!--v-if="buttons.deleteButton"-->
                <!--size="mini"-->
                <!--type="danger"-->
                <!--@click="handleDelete(scope.$index, scope.row)"-->
                <!--icon="el-icon-delete"></el-button>-->
                <!--</template>-->
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {TableUtil} from '@/util/table/TableUtil'
  import TableTree from '@/components/table/TableTree'
  import TableTopButtons from '@/components/button/TableTopButtons'

  @Component({
    components: {
      TableTree,
      TableTopButtons
    }
  })
  export default class MenuTable extends Vue {
    // 表格工具类
    tableUtil
    // 表格数据
    tableData = []
    // 表格高度
    tableHeight = 600
    // 按钮权限信息
    buttonsPermission: {[index: string]: string} = {
      addButton: 'sys:menu:add',
      deleteButton: 'sys:user:remove',
      editButton: 'sys:user:edit'
    }
    /**
     * vue声明周期钩子：挂载结束状态
     */
    mounted () {
      this.loadTableData()
    }

    /**
     * vue声明周期钩子：创建前状态
     */
    beforeCreate () {
      this.tableUtil = new TableUtil('system/sys/menu/list', 'system/sys/menu/batchDelete', this)
      this.tableUtil.setIsTreeTable(true, 'parentId', 'menuId')
    }
    /**
     * vue声明周期钩子：创建完毕状态
     */
    created () {
      let $this = this
      Vue.filter('formatTreeStyle', function (row) {
        return $this.tableUtil.formatTreeStyle(row)
      })
      // 格式化树形按钮样式
      Vue.filter('formatTreeClass', function (row) {
        return $this.tableUtil.formatTreeClass(row)
      })
    }

    handleSelectionChange (a, b) {
      console.log(a)
    }

    /**
     * 加载表格数据
     */
    loadTableData (): void {
      let $this = this
      this.tableUtil.reload({parentId: '0'}, success)
      function success (result) {
        console.log(result)
        $this.tableData = result[TableUtil.TABLE_DATA_KEY]
      }
    }

    /**
     * 显示隐藏下级
     */
    handleShowHideChildren (row: any, index: number) {
      this.tableUtil.showHideChildren(row, index)
    }

    /**
     * 添加子节点
     */
    // appendChildren (data: any, index: number): void {
    //   if (data) {
    //     for (let i = 0; i < data.length; i++) {
    //       // 在指定位置添加数据
    //       this.tableData.splice(index + i + 1, 0, data[i])
    //     }
    //   }
    // }
  }
</script>

<style scoped>

</style>
