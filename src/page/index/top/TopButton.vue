<!--顶部按钮-->
<template>
  <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
    <li class="dropdown" id="admui-navbarMessage">
      <a data-toggle="dropdown" href="javascript:;" class="msg-btn" aria-expanded="false" data-animation="scale-up" role="button">
        <i class="icon wb-bell" aria-hidden="true"></i>
        <span class="badge badge-danger up msg-num"></span>
      </a>
    </li>
    <li class="hidden-xs" id="admui-navbarDisplay" data-toggle="tooltip" data-placement="bottom" title="设置主题与布局等">
      <a class="icon wb-layout" href="/system/settings/display" data-iframe target="_blank">
        <span class="sr-only">主题与布局</span>
      </a>
    </li>
    <li>
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <a  data-toggle="fullscreen" href="#" role="button">
          <i class="el-icon-close"></i>
        </a>
      </el-tooltip>
    </li>
    <li>
      <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
        <a @click="logout" id="admui-signOut" role="button">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </a>
      </el-tooltip>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class TopButton extends Vue {
    logout () {
      console.log('退出')
    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import "https://cdn.bootcss.com/font-awesome/4.6.3/fonts/fontawesome-webfont.svg";
  /*@import "../../../../static/css/admui/web-icons.css";*/
</style>
