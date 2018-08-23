<template>
  <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="0">
    <!--手机号-->
    <el-form-item prop="phone">
      <el-input size="small" v-model="loginForm.phone" auto-complete="off" placeholder="请输入手机号码">
        <i slot="prefix" class="icon-shouji"></i>
      </el-input>
    </el-form-item>
    <!--验证码-->
    <el-form-item prop="messageCode">
      <el-input size="small" v-model="loginForm.messageCode" auto-complete="off" placeholder="请输入验证码">
        <i slot="prefix" class="icon-yanzhengma" style="margin-top:6px;"></i>
        <template slot="append">
          <span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  // 引入验证组件
  import {Validate} from '@/util/Validate'

  @Component({
    components: {
      Validate
    }
  })
  export default class CodeLogin extends Vue {
    static MSGSCUCCESS: string = '$_time秒后重发';
    static MSGINIT: string = '发送验证码';
    static MSGTIME: number = 10;
    /**
     * 手机号码验证
     * @param rule
     * @param value
     * @param callback
     */
    validatePhone = (rule, value, callback) => {
      let result: any = Validate.validateMobile(value)
      if (result[0]) {
        callback()
      } else {
        callback(new Error(result[1]))
      }
    };
    // 登录表单
    loginForm: {[index:string]:string} = {
      phone: '',
      messageCode: ''
    };
    msgKey: boolean = false;
    msgText: string = CodeLogin.MSGINIT;
    msgTime: number = CodeLogin.MSGTIME;
    // 表单验证信息
    rules: any = {
      phone: [
        {equired: true, trigger: 'blur', validator: this.validatePhone}
      ]
    };

    /**
     * 发送短信
     * @param event
     */
    handleSend (event) : void {
      // TODO 判断当前时间是否结束
      console.log('发送短信')
      if (this.msgKey) return
      this.msgText = CodeLogin.MSGSCUCCESS.replace('$_time', this.msgTime + '')
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = CodeLogin.MSGSCUCCESS.replace('$_time', this.msgTime + '')
        if (this.msgTime === 0) {
          this.msgTime = CodeLogin.MSGTIME
          this.msgText = CodeLogin.MSGINIT
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    }

    /**
     * 登录事件
     */
    handleLogin () : void {
      console.log('开始登录')
    }
  }
</script>

<style>
  .msg-text {
    display: block;
    width: 60px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .msg-text.display {
    color: #ccc;
  }
</style>
