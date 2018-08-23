import RestUtil from '@/util/RestUtil';
import VueStoreUtil from '@/util/VueStoreUtil';
/**
 * 安全认证rest工具类
 * @author zhongming
 * @since 3.0
 */
var AuthRestUtil = /** @class */ (function () {
    /**
     * 构造函数
     */
    function AuthRestUtil(vue) {
        this.vueStoreUtil = new VueStoreUtil(vue);
        this.restUtil = new RestUtil();
    }
    /**
     * 登录功能
     * @param {string} username
     * @param {string} password
     */
    AuthRestUtil.prototype.login = function (username, password, successFunction) {
        var $this = this;
        var parameters = { username: username, password: password };
        this.restUtil.postAjaxWithLoading(AuthRestUtil.LOGIN_URL, parameters, success, error);
        function success(result) {
            // 存储token
            $this.vueStoreUtil.setToken(result['token']);
            successFunction(result);
        }
        function error(result) {
            $this.restUtil.popupUtil.error('登录失败');
            console.log(result);
        }
    };
    /**
     * 发送认证ajax请求
     * @param {string} url
     * @param {{[p: string]: any}} parameters
     * @param {Function} success
     * @param {Function} error
     * @param successCallbackParameters
     */
    AuthRestUtil.prototype.authPostAjax = function (url, parameters, success, error) {
        var successCallbackParameters = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 4] = arguments[_i];
        }
        var _a;
        var header = {};
        header[AuthRestUtil.TOKEN_KEY] = this.getToken();
        header['Content-type'] = 'application/json;charse=UTF-8';
        (_a = this.restUtil).postAjaxBase.apply(_a, [false, header, url, parameters, success, error].concat(successCallbackParameters));
    };
    /**
     * 发送认证ajax请求
     * @param {string} url
     * @param {{[p: string]: any}} parameters
     * @param {Function} success
     * @param {Function} error
     * @param successCallbackParameters
     */
    AuthRestUtil.prototype.authPostAjaxWithLoading = function (url, parameters, success, error) {
        var successCallbackParameters = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 4] = arguments[_i];
        }
        var _a;
        var header = {};
        header[AuthRestUtil.TOKEN_KEY] = this.getToken();
        (_a = this.restUtil).postAjaxBase.apply(_a, [true, header, url, parameters, success, error].concat(successCallbackParameters));
    };
    /**
     * 获取token信息
     * @returns {string}
     */
    AuthRestUtil.prototype.getToken = function () {
        return this.vueStoreUtil.getToken();
    };
    /**
     * 获取vue存储工具类
     * @returns {VueStoreUtil}
     */
    AuthRestUtil.prototype.getVueStoreUtil = function () {
        return this.vueStoreUtil;
    };
    /**
     * 检查是否拥有相应权限
     * @param {string} permission
     * @returns {boolean}
     */
    AuthRestUtil.prototype.checkUserPermission = function (permission) {
        var permissionList = this.getVueStoreUtil().getUserPermission();
        if (permissionList && permissionList.indexOf(permission) > -1) {
            return true;
        }
        return false;
    };
    // 存储token的key
    AuthRestUtil.TOKEN_KEY = 'Authorization';
    AuthRestUtil.LOGIN_URL = 'auth/login';
    // 存储器
    AuthRestUtil.authStorage = localStorage;
    return AuthRestUtil;
}());
export { AuthRestUtil };
//# sourceMappingURL=AuthRestUtil.js.map