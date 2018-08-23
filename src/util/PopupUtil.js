import layer from 'layui-layer'; // 引入layer弹窗支持
import 'layui-layer/dist/theme/default/layer.css';
/**
 * 弹窗工具类
 * @author zhongming
 * @since 3.0
 */
var PopupUtil = /** @class */ (function () {
    function PopupUtil() {
    }
    /**
     * 错误信息弹窗
     * @param {string} message
     */
    PopupUtil.prototype.error = function (message) {
        if (!message) {
            message = '数据获取异常！';
        }
        layer.alert(message, {
            icon: 2
        });
    };
    /**
     * 警告信息弹窗
     * @param {string} message
     */
    PopupUtil.prototype.warn = function (message) {
        if (!message) {
            message = '警告！';
        }
        layer.alert(message, {
            icon: 0
        });
    };
    return PopupUtil;
}());
export { PopupUtil };
//# sourceMappingURL=PopupUtil.js.map