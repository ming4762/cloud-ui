<!--左侧菜单-->
<template>
  <div  id="admui-navTabs">
    <!--遍历菜单-->

    <!--<div v-for="(menu, index) in activeMenuList" :id="'navTabsItem-' + menu.id" :class="index === 0 ? 'tab-pane animation-fade height-full active' : 'tab-pane animation-fade height-full'" role="tabpanel">-->
      <!--<div>-->
        <!--<ul class="site-menu">-->
          <!--&lt;!&ndash;一级菜单标题&ndash;&gt;-->
          <!--<li class="site-menu-category">{{menu.text}}</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->

    <el-menu :collapse="isCollapse">
      <!--二级菜单有下级-->
      <el-submenu v-for="menu in activeMenuList" v-if="menu.hasChildren" :index="menu.id">
        <!--菜单标题-->
        <template slot="title">
          <i :class="menu.attributes.icon"></i>
          <span slot="title">{{menu.text}}</span>
        </template>
        <!--三级菜单有下级-->
        <el-submenu v-for="secondMenu in menu.children" v-if="secondMenu.hasChildren" :index="secondMenu.id">
          <template slot="title">
            <i :class="secondMenu.attributes.icon"></i>
            <span slot="title">{{secondMenu.text}}</span>
          </template>
          <!--四级菜单有下级-->
          <el-submenu v-for="thirdMenu in secondMenu.children" v-if="thirdMenu.hasChildren" :index="thirdMenu.id">
            <template slot="title">
              <i :class="thirdMenu.attributes.icon"></i>
              <span slot="title">{{thirdMenu.text}}</span>
            </template>
            <!--五级菜单有下级 TODO 暂不支持-->
            <!--五级菜单无下级-->
            <el-menu-item @click="openMenu(fourthMenu)" v-for="fourthMenu in thirdMenu.children" v-if="!fourthMenu.hasChildren" :index="fourthMenu.id">
              <i :class="fourthMenu.attributes.icon"></i>
              <span slot="title">{{fourthMenu.text}}</span>
            </el-menu-item>
          </el-submenu>
          <!--四级菜单无下级-->
          <el-menu-item @click="openMenu(thirdMenu)" v-for="thirdMenu in secondMenu.children" v-if="!thirdMenu.hasChildren" :index="thirdMenu.id">
            <i :class="thirdMenu.attributes.icon"></i>
            <span slot="title">{{thirdMenu.text}}</span>
          </el-menu-item>
        </el-submenu>
        <!--三级菜单无下级-->
        <el-menu-item @click="openMenu(secondMenu)" v-for="secondMenu in menu.children" v-if="!secondMenu.hasChildren" :index="secondMenu.id">
          <i :class="secondMenu.attributes.icon"></i>
          <span slot="title">{{secondMenu.text}}</span>
        </el-menu-item>
      </el-submenu>
      <!--二级菜单无下级-->
      <el-menu-item @click="openMenu(menu)" v-for="menu in activeMenuList" v-if="!menu.hasChildren" :index="menu.id">
        <i :class="menu.attributes.icon"></i>
        <span slot="title">{{menu.text}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'
  import { Getter } from 'vuex-class'
  import { Validate } from '@/util/Validate'
  import StoreGetterKeys from '@/util/key/StoreGetterKeys'

  @Component({
    components: {
      StoreGetterKeys
    }
  })
  export default class LeftMenu extends Vue {
    // 激活的菜单
    activeMenuList = []
    // 激活的菜单
    @Getter(StoreGetterKeys.ACTIVE_MENU)
    activeMenu
    // 左侧是否展开
    @Getter('asideCollapse')
    isCollapse

    handleOpen (index: string, indexPath: any) {
      console.log(index)
    }

    handleClose (index: string, indexPath: any) {
      console.log(index)
    }

    created () {
      if (this.activeMenu) {
        this.activeMenuList = this.activeMenu['children']
      }
    }
    /**
     * 监控activeMenu变化，修改activeMenuList
     */
    @Watch('activeMenu')
    onActiveMenuChange (value: any, old: any): void {
      if (value) {
        this.activeMenuList = value['children']
      }
    }

    /**
     * 点击菜单
     * @param menu
     */
    openMenu (menu) : void {
      let path: string = menu['attributes']['url']
      if (!Validate.validateNull(path)) {
        if (path.indexOf('/') !== 0) {
          path = '/' + path
        }
        this.$router.push({
          path: path
        })
      }
    }
  }
</script>

<style scoped>

</style>
