import { Module } from 'vuex'
import SystemConfig from '../../../static/config/SystemConfig'

const state: any = {
  // 后台接口地址
  apiUrl : SystemConfig.apiUrl,
  // 主页地址
  indexUrl: SystemConfig.indexUrl
}

export const Config = {
  state
}
