<template>
  <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="0">
    <!--用户名-->
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" size="small" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <!--密码-->
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" :type="passwordType" size="small" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>

    <!--<el-checkbox v-model="checked">记住账号</el-checkbox>-->
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {AuthRestUtil} from '@/util/AuthRestUtil' // 引入rest工具类
  import { State } from 'vuex-class'
  // vue 状态管理工具类
  import VueStoreUtil from '@/util/VueStoreUtil'

  @Component({
    components: {
      AuthRestUtil,
      VueStoreUtil
    }
  })
  export default class UserLogin extends Vue {
    vueStoreUtil
    // 认证工具类
    authRestUtil
    // 配置信息
    @State('Config')
    config;

    // 登录表单信息
    loginForm: {[index:string]:any} = {
      username: '',
      password: ''
    };
    // 声明validate
    $refs: {
      validate: HTMLFormElement
    };
    // 认证信息
    rules: any = {
      username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, message: '密码长度最少为5位', trigger: 'blur'}
      ]
    };
    // 密码输入框类型
    passwordType: string = 'password';

    /**
     * 显示密码
     */
    showPassword () : void {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    }

    /**
     * 登录
     */
    handleLogin () : void {
      let $this = this
      // 验证表单
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.authRestUtil.login(this.loginForm['username'], this.loginForm['password'], success)
        }
      })
      // 成功回调
      function success (result) {
        $this.$router.push($this.config.indexUrl)
      }
    }

    // 生命周期钩子，创建完成状态
    created (): void {
      this.init()
    }
    /**
     * 初始化方法
     */
    init (): void {
      this.vueStoreUtil = new VueStoreUtil(this)
      this.authRestUtil = new AuthRestUtil(this)
    }
  }
</script>

<style scoped>

</style>
