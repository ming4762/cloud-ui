<!--顶栏容器-->
<template>
  <div>
    <div>
      <div  id="admui-navbarCollapse">
        <!--顶部菜单组件-->
        <TopMenu></TopMenu>
        <!--顶部按钮组件-->
        <TopButton></TopButton>
      </div>
    </div>
  </div>
  <!--<div class="top">-->
    <!--<div class="top-button is-left">-->
      <!--&lt;!&ndash; breadcrumb按钮和面包屑 &ndash;&gt;-->
      <!--<div class="tags-breadcrumb">-->
        <!--<i class="icon-navicon tag-collapse"-->
           <!--:class="[{ 'tag-collapse_right': isCollapse }]"-->
           <!--@click="showCollapse"></i>-->
        <!--&lt;!&ndash; <top-breadcrumb class="tags-breadcrumb-list"></top-breadcrumb> &ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->

    <!--<h1 class="top-title">-->
      <!--<TopMenu></TopMenu>-->
    <!--</h1>-->
    <!--<div>-->
      <!--<TopButton></TopButton>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import TopMenu from '@/page/index/top/TopMenu' // 顶部菜单
  import TopButton from '@/page/index/top/TopButton' // 顶部按钮组件

  @Component({
    components: {
      TopMenu,
      TopButton
    }
  })
  export default class Top extends Vue {
    user: any
    isCollapse: boolean = false
    showCollapse () {
      console.log('点击了')
    }
  }
</script>

<style scoped>

</style>
