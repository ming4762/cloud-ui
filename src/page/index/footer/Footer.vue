<template>
  <div>
    <div class="site-footer-legal">clouddo &copy;
      <a href="https://github.com/ming4762/clouddo" target="_blank">github.com</a>
    </div>
    <div class="site-footer-right">
      当前版本：v1.1.0
      <a class="margin-left-5" data-toggle="tooltip" title="升级" href="#" target="_blank">
        <i class="el-icon-upload"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  /**
   * 主页footer
   * @author zhongming
   * @since 3.0
   */
  @Component({
    components: {}
  })
  export default class Footer extends Vue {

  }
</script>

<style scoped>
  .site-footer-legal {
    float: left;
  }
  .site-footer-right {
    float: right;
  }

</style>
