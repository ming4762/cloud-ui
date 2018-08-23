/**
 * rest工具类
 * @author zhongming
 * @since 3.0
 */
import axios from 'axios'         // 引入axios ajax支持
import layer from 'layui-layer'   // 引入layer弹窗支持
import 'layui-layer/dist/theme/default/layer.css'
import { PopupUtil } from '@/util/PopupUtil'

export class RestUtil {

  // 存储器中存储api接口的地址
  public static API_URL_KEY: string = 'API_URL'
  // 弹窗工具类
  public popupUtil: any

  /**
   * 构造函数
   */
  constructor() {
    this.popupUtil = new PopupUtil()
  }

  /**
   * 保存后台接口地址
   * @param {string} apiUrl
   */
  public saveApiUrl (apiUrl: string): void {
    localStorage.setItem(RestUtil.API_URL_KEY, apiUrl)
  }

  /**
   * 获取后台接口地址
   */
  public getApiUrl (): string {
    return localStorage.getItem(RestUtil.API_URL_KEY)
  }

  /**
   * 发送ajax请求
   * 带有加载中动画
   * @author zhongming
   */
  public postAjaxWithLoading(url: string, parameters: {[index: string]: any}, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    this.postAjaxBase(true, null, url, parameters, success, error, successCallbackParameters)
  }

  /**
   * 发送ajax请求
   * 没有加载中动画
   * @author zhongming
   */
  public postAjax(url: string, parameters: {[index: string]: any}, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    this.postAjaxBase(false, null, url, parameters, success, error, successCallbackParameters)
  }
  /**
   * 初始化本地配置
   */
  public initLocalConfig(): void {
    axios.get('/static/config/config.json')
      .then((result) => {
        let data = result['data']
        let config = data['cloud']['config']
        if (config) {
          // 设置后台api地址
          this.saveApiUrl(config['apiUrl'])
        }
      })
      .catch((error) => {
        console.log(error)
        layer.alert('读取本地配置信息失败', {
          icon: 1
        })
      })
  }
  /**
   * 发送ajax请求
   * @param withLoading 是否带有加载中动画
   * @param headers 请求头
   * @param {string} url 请求地址
   * @param {{[index: string]: any}} parameters 参数
   * @param {Function} success 成功回调
   * @param {Function} error 失败回调
   * @param successCallbackParameters 成功其他参数
   */
  public postAjaxBase(withLoading: boolean, headers: {[index: string]: string}, url: string, parameters: {[index: string]: any}, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    console.log('发送请求')
    let index: number
    // 打开加载中
    if (withLoading) {
      index = this.loading()
    }
    if (!parameters) {
      parameters = {}
    }
    axios.post(this.getApiUrl() + url, parameters, {
      headers: headers
    })
      .then((response) => {
        // 关闭加载中
        if (withLoading) {
          this.loaded(index)
        }
        // 执行默认的成功回调函数
        this.defalutSuccessFunction(response.data, success, error, ...successCallbackParameters)
      })
      .catch((errorData) => {
        // 关闭加载中
        if (withLoading) {
          this.loaded(index)
        }
        // 执行默认的失败回调
        this.defalutErrorFunction(errorData, error)
      })
  }

  /**
   * 加载中
   * @returns {number}
   */
  public loading(): number {
    return layer.load(2, {
      shade: [0.1,'#fff'] // 0.1透明度的白色背景
    })
  }

  /**
   * 加载结束
   * @param {number} index
   */
  public loaded(index: number): void {
    layer.close(index)
  }

  /**
   * 默认的成功回调函数
   * @param data
   * @param success
   * @param error
   * @param successCallbackParameters
   */
  private defalutSuccessFunction(data: any, success: Function, error: Function, ...successCallbackParameters: any[]): void {
    if (data && data['code'] === 200) {
      if (success) {
        success(data['data'], ...successCallbackParameters)
      } else {
        console.log(data)
      }
    } else {
      this.defalutErrorFunction(data, error)
    }
  }

  /**
   * 默认的失败回调函数
   * @param data
   * @param {Function} error
   */
  private defalutErrorFunction(data: any, error: Function) {
    if (error != null) {
      error(data)
    } else {
      console.log(data)
      this.popupUtil.error('获取数据异常')
    }
  }
}

export default RestUtil
