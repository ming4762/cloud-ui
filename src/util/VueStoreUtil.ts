import StoreGetterKeys from '@/util/key/StoreGetterKeys'
import StoreSetterKeys from '@/util/key/StoreSetterKeys'
/**
 * vue stroe工具类
 */
export default class VueStoreUtil {
  // vue实体
  private $vue
  // 构造函数
  constructor(vue: any) {
    this.$vue = vue
  }

  /**
   * 获取用户的权限信息
   * @returns {Array<string>}
   */
  public getUserPermission(): Array<string> {
    return this.$vue.$store.getters[StoreGetterKeys.USER_PERMISSION_LIST]
  }

  /**
   * 保存用户权限信息
   * @param {Array<string>} userPermissionList
   */
  public setUserPermission (userPermissionList: Array<string>): void {
    this.$vue.$store.commit(StoreSetterKeys.USER_PERMISSION, userPermissionList)
  }

  /**
   * 设置用户菜单
   * @param {any[]} menuList
   */
  public setUserMenuList (menuList: any[]): void {
    this.$vue.$store.commit(StoreSetterKeys.USER_MENU_LIST, menuList)
  }

  /**
   * 设置激活菜单
   * @param {any[]} menuList
   */
  public setActiveMenuList (menuList: any[]): void {
    this.$vue.$store.commit(StoreSetterKeys.ACTIVE_MENU_LIST, menuList)
  }
  /**
   * 设置token
   * @param {string} token
   */
  public setToken (token: string): void {
    this.$vue.$store.commit(StoreSetterKeys.TOKEN, token)
  }

  /**
   * 获取token
   * @returns {string}
   */
  public getToken (): string {
    return this.$vue.$store.getters[StoreGetterKeys.TOKEN]
  }

  /**
   * 设置激活的菜单
   * @param activeMenu
   */
  public setActiveMenu (activeMenu: any): void {
    this.$vue.$store.commit(StoreSetterKeys.ACTIVE_MENU, activeMenu)
  }
}
