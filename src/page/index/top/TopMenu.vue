<!--顶部菜单-->
<template>
  <ul>
    <li style="float: left">
      <a data-toggle="menubar" @click="collapseLeft" class="hidden-float" href="javascript:;" role="button" id="admui-toggleMenubar">
        <i >
          <span >切换目录</span>
          <span ></span>
        </i>
      </a>
    </li>
    <li style="float: left">
      <el-menu background-color="#4e97d9" active-text-color="#ffd04b" text-color="#fff" class="nav navbar-toolbar nav-tabs" :default-active="activeMenuIndex" @select="handleSelectTopMenu" mode="horizontal">
        <el-menu-item @click="clickMenu(menu)" v-for="(menu, index) in menuList" :index="menu.id">{{menu.text}}</el-menu-item>
      </el-menu>
    </li>
  </ul>

</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { Getter } from 'vuex-class'
  import StoreGetterKeys from '@/util/key/StoreGetterKeys'
  // vue 状态管理工具类
  import VueStoreUtil from '@/util/VueStoreUtil'

  @Component({
    components: {
      StoreGetterKeys,
      VueStoreUtil
    }
  })
  export default class TopMenu extends Vue {
    vueStoreUtil
    // 激活菜单的index
    activeMenuIndex
    // 用户菜单列表，从store获取
    @Getter(StoreGetterKeys.USER_MENU_LIST)
    menuList: any[];
    // 左侧是否展开
    @Getter('asideCollapse')
    isCollapse: boolean
    // 激活的菜单
    @Getter(StoreGetterKeys.ACTIVE_MENU)
    activeMenu
    /**
     * 点击菜单事件
     * @param index
     * @param indexPath
     */
    handleSelectTopMenu (index, indexPath): void {
    }

    /**
     * 声明周期钩子，挂载结束
     */
    mounted () {
      console.log(this.menuList)
    }
    // 生命周期钩子，创建结束
    created () {
      this.init()
      // 设置激活的菜单
      // 页面刷新后还是原来的菜单
      if (this.activeMenu) {
        this.activeMenuIndex = this.activeMenu.id
      }
    }
    /**
     * 点击展开 收起左侧菜单
     */
    collapseLeft () {
      let $isCollapse: boolean = !this.isCollapse
      this.$store.commit('setAsideCollapse', $isCollapse)
    }

    /**
     * 点击菜单事件
     * @param menu
     */
    clickMenu (menu): void {
      // 将激活的菜单保存到store
      if (menu) {
        this.vueStoreUtil.setActiveMenu(menu)
      }
    }
    // 初始化
    init (): void {
      this.vueStoreUtil = new VueStoreUtil(this)
    }
  }
</script>

<style scoped>

</style>
