import RestUtil from '@/util/RestUtil'
import { getStore, setStore } from '@/util/StoreUtil'
import Vue from 'vue'
import StoreGetterKeys from '@/util/key/StoreGetterKeys'
import StoreSetterKeys from '@/util/key/StoreSetterKeys'
import VueStoreUtil from '@/util/VueStoreUtil'

/**
 * 安全认证rest工具类
 * @author zhongming
 * @since 3.0
 */

export class AuthRestUtil {

  // 存储token的key
  public static TOKEN_KEY: string = 'Authorization'

  public static LOGIN_URL: string = 'auth/login'
  // 存储器
  private static authStorage = localStorage

  private restUtil: any

  private vueStoreUtil: any
  /**
   * 构造函数
   */
  constructor(vue: any) {
    this.vueStoreUtil = new VueStoreUtil(vue)
    this.restUtil = new RestUtil()
  }

  /**
   * 登录功能
   * @param {string} username
   * @param {string} password
   */
  public login(username: string, password: string, successFunction: Function): void {
    let $this = this
    let parameters = { username: username, password : password }
    this.restUtil.postAjaxWithLoading(AuthRestUtil.LOGIN_URL, parameters, success, error)

    function success(result) {
      // 存储token
      $this.vueStoreUtil.setToken(result['token'])
      successFunction(result)
    }

    function error(result) {
      $this.restUtil.popupUtil.error('登录失败')
      console.log(result)
    }
  }

  /**
   * 发送认证ajax请求
   * @param {string} url
   * @param {{[p: string]: any}} parameters
   * @param {Function} success
   * @param {Function} error
   * @param successCallbackParameters
   */
  public authPostAjax(url: string, parameters: {[index: string]: any}, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    let header: {[index: string]: string} = {}
    header[AuthRestUtil.TOKEN_KEY] = this.getToken()
    header['Content-type'] = 'application/json;charse=UTF-8'
    this.restUtil.postAjaxBase(false, header, url, parameters, success, error, ...successCallbackParameters)
  }

  /**
   * 发送认证ajax请求
   * @param {string} url
   * @param {{[p: string]: any}} parameters
   * @param {Function} success
   * @param {Function} error
   * @param successCallbackParameters
   */
  public authPostAjaxWithLoading(url: string, parameters: {[index: string]: any}, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    let header: {[index: string]: string} = {}
    header[AuthRestUtil.TOKEN_KEY] = this.getToken()
    this.restUtil.postAjaxBase(true, header, url, parameters, success, error, ...successCallbackParameters)
  }

  /**
   * 获取token信息
   * @returns {string}
   */
  public getToken(): string {
    return this.vueStoreUtil.getToken()
  }

  /**
   * 获取vue存储工具类
   * @returns {VueStoreUtil}
   */
  public getVueStoreUtil () {
    return this.vueStoreUtil
  }

  /**
   * 检查是否拥有相应权限
   * @param {string} permission
   * @returns {boolean}
   */
  public checkUserPermission(permission: string): boolean {
    let permissionList = this.getVueStoreUtil().getUserPermission()
    if (permissionList && permissionList.indexOf(permission) > -1) {
      return true
    }
    return false
  }
}
