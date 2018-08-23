/**
 * rest工具类
 * @author zhongming
 * @since 3.0
 */
import axios from 'axios'; // 引入axios ajax支持
import layer from 'layui-layer'; // 引入layer弹窗支持
import 'layui-layer/dist/theme/default/layer.css';
import { PopupUtil } from '@/util/PopupUtil';
var RestUtil = /** @class */ (function () {
    /**
     * 构造函数
     */
    function RestUtil() {
        this.popupUtil = new PopupUtil();
    }
    /**
     * 保存后台接口地址
     * @param {string} apiUrl
     */
    RestUtil.prototype.saveApiUrl = function (apiUrl) {
        localStorage.setItem(RestUtil.API_URL_KEY, apiUrl);
    };
    /**
     * 获取后台接口地址
     */
    RestUtil.prototype.getApiUrl = function () {
        return localStorage.getItem(RestUtil.API_URL_KEY);
    };
    /**
     * 发送ajax请求
     * 带有加载中动画
     * @author zhongming
     */
    RestUtil.prototype.postAjaxWithLoading = function (url, parameters, success, error) {
        var successCallbackParameters = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 4] = arguments[_i];
        }
        this.postAjaxBase(true, null, url, parameters, success, error, successCallbackParameters);
    };
    /**
     * 发送ajax请求
     * 没有加载中动画
     * @author zhongming
     */
    RestUtil.prototype.postAjax = function (url, parameters, success, error) {
        var successCallbackParameters = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 4] = arguments[_i];
        }
        this.postAjaxBase(false, null, url, parameters, success, error, successCallbackParameters);
    };
    /**
     * 初始化本地配置
     */
    RestUtil.prototype.initLocalConfig = function () {
        var _this = this;
        axios.get('/static/config/config.json')
            .then(function (result) {
            var data = result['data'];
            var config = data['cloud']['config'];
            if (config) {
                // 设置后台api地址
                _this.saveApiUrl(config['apiUrl']);
            }
        })
            .catch(function (error) {
            console.log(error);
            layer.alert('读取本地配置信息失败', {
                icon: 1
            });
        });
    };
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
    RestUtil.prototype.postAjaxBase = function (withLoading, headers, url, parameters, success, error) {
        var _this = this;
        var successCallbackParameters = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 6] = arguments[_i];
        }
        console.log('发送请求');
        var index;
        // 打开加载中
        if (withLoading) {
            index = this.loading();
        }
        if (!parameters) {
            parameters = {};
        }
        axios.post(this.getApiUrl() + url, parameters, {
            headers: headers
        })
            .then(function (response) {
            // 关闭加载中
            if (withLoading) {
                _this.loaded(index);
            }
            // 执行默认的成功回调函数
            _this.defalutSuccessFunction.apply(_this, [response.data, success, error].concat(successCallbackParameters));
        })
            .catch(function (errorData) {
            // 关闭加载中
            if (withLoading) {
                _this.loaded(index);
            }
            // 执行默认的失败回调
            _this.defalutErrorFunction(errorData, error);
        });
    };
    /**
     * 加载中
     * @returns {number}
     */
    RestUtil.prototype.loading = function () {
        return layer.load(2, {
            shade: [0.1, '#fff'] // 0.1透明度的白色背景
        });
    };
    /**
     * 加载结束
     * @param {number} index
     */
    RestUtil.prototype.loaded = function (index) {
        layer.close(index);
    };
    /**
     * 默认的成功回调函数
     * @param data
     * @param success
     * @param error
     * @param successCallbackParameters
     */
    RestUtil.prototype.defalutSuccessFunction = function (data, success, error) {
        var successCallbackParameters = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            successCallbackParameters[_i - 3] = arguments[_i];
        }
        if (data && data['code'] === 200) {
            if (success) {
                success.apply(void 0, [data['data']].concat(successCallbackParameters));
            }
            else {
                console.log(data);
            }
        }
        else {
            this.defalutErrorFunction(data, error);
        }
    };
    /**
     * 默认的失败回调函数
     * @param data
     * @param {Function} error
     */
    RestUtil.prototype.defalutErrorFunction = function (data, error) {
        if (error != null) {
            error(data);
        }
        else {
            console.log(data);
            this.popupUtil.error('获取数据异常');
        }
    };
    // 存储器中存储api接口的地址
    RestUtil.API_URL_KEY = 'API_URL';
    return RestUtil;
}());
export { RestUtil };
export default RestUtil;
//# sourceMappingURL=RestUtil.js.map