<template>
  <div class="t-bar">
    <el-button-group>
      <!--添加按钮-->
      <el-button
        size="medium"
        type="primary"
        icon="el-icon-plus"
        v-if="buttons.addButton"
        @click="handleAdd()">添加</el-button>
      <!--编辑按钮-->
      <el-button
        size="medium"
        type="warning"
        icon="el-icon-edit"
        v-if="buttons.editButton"
        @click="handleEdit()">编辑</el-button>
      <!--删除按钮-->
      <el-button
        size="medium"
        type="danger"
        icon="el-icon-delete"
        v-if="buttons.deleteButton"
        @click="handleDelete()">删除</el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { AuthRestUtil } from '@/util/AuthRestUtil'

  /**
   * 顶部按钮组件
   * @author zhongming
   * @since 3.0
   */
  @Component({
    components: {
      AuthRestUtil
    }
  })
  export default class TableTopButtons extends Vue {
    // 按钮信息
    buttons: {[index:string]: boolean} = {}
    // 认证工具类
    authRestUtil: any
    // 父组件传入的按钮认证信息
    @Prop({default: {}})
    buttonsPermission: {[index: string]: string}

    /**
     * vue声明周期钩子：挂载结束状态
     */
    mounted () {
    }

    /**
     * vue声明周期钩子：创建完毕状态
     */
    created () {
      // 初始化
      this.init()
      if ((this.buttonsPermission)) {
        for (let button in this.buttonsPermission) {
          // 验证按钮权限
          this.buttons[button] = this.authRestUtil.checkUserPermission(this.buttonsPermission[button])
        }
      }
    }

    /**
     * 初始化函数
     */
    init (): void {
      this.authRestUtil = new AuthRestUtil(this)
    }
  }
</script>

<style scoped>
  .t-bar {
    padding-bottom: 10px;
  }
</style>
