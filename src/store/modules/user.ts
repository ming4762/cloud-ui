import { getStore, setStore } from '@/util/StoreUtil'
import { AuthRestUtil } from '@/util/AuthRestUtil' // 引入rest工具类

// 存储用户权限的key
const USER_PERMISSIONS_KEY = 'cloud_user_permissions'
// 存储菜单的key
const USER_MENU_LIST_KEY = 'cloud_user_menu_list'
// 激活的菜单列表
const ACTIVE_MENU_LIST = 'cloud_user_acitve_menu_list'
// 激活的菜单
const ACTIVE_MENU = 'cloud_user_active_menu'
// token key
const TOKEN_KEY = 'cloud_user_token'

let state = {
  info: {
    data: 'store data from user'
  },
  // 用户拥有的菜单权限
  menuList: getStore(USER_MENU_LIST_KEY, false),
  // 激活的菜单
  activeMenuList: getStore(ACTIVE_MENU_LIST, false),
  activeMenu: getStore(ACTIVE_MENU, false),
  auth: {},
  // 用户权限信息
  permissionList: getStore(USER_PERMISSIONS_KEY, false),
  // token信息
  token: getStore(TOKEN_KEY, false)
}

const mutations = {
  // 设置权限
  setUserPermission: (state, permissionList: string[]) => {
    state.permissionList = permissionList
    setStore(USER_PERMISSIONS_KEY, permissionList, 'session')
  },
  // 设置菜单
  setUserMenuList: (state, menuList: any[]) => {
    state.menuList = menuList
    setStore(USER_MENU_LIST_KEY, menuList, 'session')
  },
  // 设置激活的菜单
  setActiveMenuList: (state, menuList: any[]) => {
    state.activeMenuList = menuList
    setStore(ACTIVE_MENU_LIST, menuList, 'session')
  },
  setActiveMenu: (state, menu: any) => {
    state.activeMenu = menu
    setStore(ACTIVE_MENU, menu, 'session')
  },
  // 设置token
  setToken: (state, token: string) => {
    state.token = token
    setStore(TOKEN_KEY, token, 'session')
  }
}

const getters = {
  // 用户信息
  getInfo: state => state.info,
  // 用户菜单
  getUserMenuList: state => state.menuList,
  // 激活的菜单列表
  getActiveMenuList: state => state.activeMenuList,
  getActiveMenu: state => state.activeMenu,
  // 用户权限
  getUserPermission: state => state.permissionList,
  // token
  getToken: state => state.token
}

export default {
  state,
  mutations,
  actions: {},
  getters
}
