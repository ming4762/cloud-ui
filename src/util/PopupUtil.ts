import layer from 'layui-layer'   // 引入layer弹窗支持
import 'layui-layer/dist/theme/default/layer.css'

/**
 * 弹窗工具类
 * @author zhongming
 * @since 3.0
 */
export class PopupUtil {
  /**
   * 错误信息弹窗
   * @param {string} message
   */
  public error(message?: string): void {
    if (!message) {
      message = '数据获取异常！'
    }
    layer.alert(message, {
      icon: 2
    })
  }

  /**
   * 警告信息弹窗
   * @param {string} message
   */
  public warn(message?: string): void {
    if (!message) {
      message = '警告！'
    }
    layer.alert(message, {
      icon: 0
    })
  }
}
