<template>
  <!--<div id="app">-->
    <!---->
  <!--</div>-->
  <router-view/>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import RestUtil from '@/util/RestUtil'
import {Validate} from '@/util/Validate'

@Component({
  components: {
    RestUtil,
    Validate
  }
})
export default class App extends Vue {
  mounted () {
    // 初始化本地配置
    let restUtil = new RestUtil()
    restUtil.initLocalConfig()
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  a {
    color: #62a8ea;
  }

</style>
