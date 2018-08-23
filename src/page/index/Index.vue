<template>
  <!--<div>-->
    <!--&lt;!&ndash;顶部&ndash;&gt;-->
    <!--<Top :menuList="menuList"></Top>-->
    <!--&lt;!&ndash;左侧&ndash;&gt;-->
    <!--<Left :menuList="menuList"></Left>-->
  <!--</div>-->
  <!--采用element开发布局-->
  <el-container class="cloud-contail">
    <!--头部-->
    <el-aside class="cloud_left" :width="isCollapse ? asideWidthCollapse : asideWidth">
      <Left></Left>
    </el-aside>
    <el-container>
      <!--头部-->
      <el-header height="101px">
        <Top></Top>
      </el-header>
      <el-container>
        <el-main>
          <transition>
            <router-view class="cloud-view"/>
          </transition>
        </el-main>
        <el-footer height="40px" class="site-footer">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Top from '@/page/index/top/Top'
  import Left from '@/page/index/left/Left'
  import Footer from '@/page/index/footer/Footer'
  import {AuthRestUtil} from '@/util/AuthRestUtil' // 引入rest工具类
  import { Getter } from 'vuex-class'
  import { Validate } from '@/util/Validate'
  import StoreGetterKeys from '@/util/key/StoreGetterKeys'
  // vue 状态管理工具类
  import VueStoreUtil from '@/util/VueStoreUtil'

  @Component({
    components: {
      Top,
      Left,
      Footer,
      AuthRestUtil,
      Validate,
      StoreGetterKeys,
      VueStoreUtil
    }
  })
  export default class Index extends Vue {
    // 左侧收起展开宽度
    asideWidthCollapse: string = '65px'
    asideWidth: string = '220px'
    // 认证工具类
    authRestUtil
    // 状态管理工具类
    vueStoreUtil

    // 左侧是否展开
    @Getter('asideCollapse')
    isCollapse
    // 用户菜单
    @Getter(StoreGetterKeys.USER_MENU_LIST)
    userMenuList
    // 用户权限
    @Getter(StoreGetterKeys.USER_PERMISSION_LIST)
    userPermission
    // 钩子函数
    created (): void {
      // 初始化
      this.init()
      let $this = this
      this.authRestUtil = new AuthRestUtil(this)
      if (Validate.validateNull(this.userMenuList) || Validate.validateNull(this.userPermission)) {
        // 执行ajax获取主页信息
        this.authRestUtil.authPostAjax('system/index', null, success, null)
      }
      function success (result) {
        let menuList: any[] = result['menus']
        // 将菜单信息保存到store
        $this.vueStoreUtil.setUserMenuList(menuList)
        if (menuList && menuList.length > 0 && menuList[0]) {
          $this.vueStoreUtil.setActiveMenuList(menuList[0].children)
        }
        // 存储权限信息
        let userPermissionList: string[] = result['userPermissionList'] === null ? [] : result['userPermissionList']
        $this.vueStoreUtil.setUserPermission(userPermissionList)
      }
    }
    /**
     * 初始化方法
     */
    init (): void {
      this.vueStoreUtil = new VueStoreUtil(this)
    }
  }
</script>

<style scoped>
  .cloud-contail {
    height: 100%;
  }
  .cloud_left {
    height: 100%;
  }
  .cloud-view {
    width: 100%;
    /*position: absolute;*/
    top: 0;
    left: 0;
  }
  .site-footer {
    padding: 10px 20px;
    background-color: rgba(0,0,0,.02);
    border-top: 1px solid #e4eaec;
  }
</style>
