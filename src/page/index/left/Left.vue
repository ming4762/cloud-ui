<!--页面左侧-->
<template>
    <!--菜单组件-->
    <LeftMenu></LeftMenu>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import LeftMenu from '@/page/index/left/LeftMenu'

  @Component({
    components: {
      LeftMenu
    }
  })
  export default class Left extends Vue {
  }
</script>

<style scoped>

</style>
