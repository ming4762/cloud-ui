import StoreGetterKeys from '@/util/key/StoreGetterKeys';
import StoreSetterKeys from '@/util/key/StoreSetterKeys';
/**
 * vue stroe工具类
 */
var VueStoreUtil = /** @class */ (function () {
    // 构造函数
    function VueStoreUtil(vue) {
        this.$vue = vue;
    }
    /**
     * 获取用户的权限信息
     * @returns {Array<string>}
     */
    VueStoreUtil.prototype.getUserPermission = function () {
        return this.$vue.$store.getters[StoreGetterKeys.USER_PERMISSION_LIST];
    };
    /**
     * 保存用户权限信息
     * @param {Array<string>} userPermissionList
     */
    VueStoreUtil.prototype.setUserPermission = function (userPermissionList) {
        this.$vue.$store.commit(StoreSetterKeys.USER_PERMISSION, userPermissionList);
    };
    /**
     * 设置用户菜单
     * @param {any[]} menuList
     */
    VueStoreUtil.prototype.setUserMenuList = function (menuList) {
        this.$vue.$store.commit(StoreSetterKeys.USER_MENU_LIST, menuList);
    };
    /**
     * 设置激活菜单
     * @param {any[]} menuList
     */
    VueStoreUtil.prototype.setActiveMenuList = function (menuList) {
        this.$vue.$store.commit(StoreSetterKeys.ACTIVE_MENU_LIST, menuList);
    };
    /**
     * 设置token
     * @param {string} token
     */
    VueStoreUtil.prototype.setToken = function (token) {
        this.$vue.$store.commit(StoreSetterKeys.TOKEN, token);
    };
    /**
     * 获取token
     * @returns {string}
     */
    VueStoreUtil.prototype.getToken = function () {
        return this.$vue.$store.getters[StoreGetterKeys.TOKEN];
    };
    /**
     * 设置激活的菜单
     * @param activeMenu
     */
    VueStoreUtil.prototype.setActiveMenu = function (activeMenu) {
        this.$vue.$store.commit(StoreSetterKeys.ACTIVE_MENU, activeMenu);
    };
    return VueStoreUtil;
}());
export default VueStoreUtil;
//# sourceMappingURL=VueStoreUtil.js.map