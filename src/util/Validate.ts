/**
 * 验证工具类
 * @author zhongming
 * @since 3.0
 */
export class Validate {
  /**
   * 验证手机号
   * @param phone 电话号码
   */
  public static validateMobile(phone): Array<any> {
    let list: Array<any> = []
    let result: boolean = false
    let msg: string = ''
    const isPhone = /^0\d{2,3}-?\d{7,8}$/
    // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    const isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/
    if (!Validate.validateNull(phone)) {
      if (phone.length === 11) {
        if (isPhone.test(phone)) {
          msg = '手机号码格式不正确'
        } else {
          result = true
        }
      } else {
        msg = '手机号码长度不为11位'
      }
    } else {
      msg = '手机号码不能为空'
    }
    list.push(result)
    list.push(msg)
    return list
  }

  /**
   * 验证是否为null
   * @param value
   */
  public static validateNull(value): boolean {
    if (typeof value === 'boolean') {
      return false
    }
    if (value instanceof Array) {
      if (value.length === 0) return true
    } else if (value instanceof Object) {
      if (JSON.stringify(value) === '{}') return true
    } else {
      if (value === 'null' || value === null || value === 'undefined' || value === undefined || value === '') return true
      return false
    }
    return false
  }
}
