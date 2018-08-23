import { getStore, setStore } from '@/util/StoreUtil';
// 存储用户权限的key
var USER_PERMISSIONS_KEY = 'cloud_user_permissions';
// 存储菜单的key
var USER_MENU_LIST_KEY = 'cloud_user_menu_list';
// 激活的菜单列表
var ACTIVE_MENU_LIST = 'cloud_user_acitve_menu_list';
// 激活的菜单
var ACTIVE_MENU = 'cloud_user_active_menu';
// token key
var TOKEN_KEY = 'cloud_user_token';
var state = {
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
};
var mutations = {
    // 设置权限
    setUserPermission: function (state, permissionList) {
        state.permissionList = permissionList;
        setStore(USER_PERMISSIONS_KEY, permissionList, 'session');
    },
    // 设置菜单
    setUserMenuList: function (state, menuList) {
        state.menuList = menuList;
        setStore(USER_MENU_LIST_KEY, menuList, 'session');
    },
    // 设置激活的菜单
    setActiveMenuList: function (state, menuList) {
        state.activeMenuList = menuList;
        setStore(ACTIVE_MENU_LIST, menuList, 'session');
    },
    setActiveMenu: function (state, menu) {
        state.activeMenu = menu;
        setStore(ACTIVE_MENU, menu, 'session');
    },
    // 设置token
    setToken: function (state, token) {
        state.token = token;
        setStore(TOKEN_KEY, token, 'session');
    }
};
var getters = {
    // 用户信息
    getInfo: function (state) { return state.info; },
    // 用户菜单
    getUserMenuList: function (state) { return state.menuList; },
    // 激活的菜单列表
    getActiveMenuList: function (state) { return state.activeMenuList; },
    getActiveMenu: function (state) { return state.activeMenu; },
    // 用户权限
    getUserPermission: function (state) { return state.permissionList; },
    // token
    getToken: function (state) { return state.token; }
};
export default {
    state: state,
    mutations: mutations,
    actions: {},
    getters: getters
};
//# sourceMappingURL=user.js.map