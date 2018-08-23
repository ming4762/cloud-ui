import { Validate } from '@/util/Validate'

const SESSION_TYPE: string = 'session'
/**
 * 从strong获取数据
 * @param {string} key
 * @returns {null}
 */
export const getStore = (key: string, debug?: boolean) => {
  let data = window.localStorage.getItem(key)
  if (Validate.validateNull(data)) {
    data = window.sessionStorage.getItem(key)
  }
  if (Validate.validateNull(data)) {
    return null
  }
  data = JSON.parse(data)
  if (debug) {
    return data
  }
  return data['content']
}

/**
 * 数据存储到strong
 * @param {string} key
 * @param value
 */
export const setStore = (key: string, content: any, type?: string) => {
  let data = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (SESSION_TYPE === type) {
    window.sessionStorage.setItem(key, JSON.stringify(data))
  } else {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
}
