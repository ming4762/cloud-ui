import { Validate } from '@/util/Validate';
var SESSION_TYPE = 'session';
/**
 * 从strong获取数据
 * @param {string} key
 * @returns {null}
 */
export var getStore = function (key, debug) {
    var data = window.localStorage.getItem(key);
    if (Validate.validateNull(data)) {
        data = window.sessionStorage.getItem(key);
    }
    if (Validate.validateNull(data)) {
        return null;
    }
    data = JSON.parse(data);
    if (debug) {
        return data;
    }
    return data['content'];
};
/**
 * 数据存储到strong
 * @param {string} key
 * @param value
 */
export var setStore = function (key, content, type) {
    var data = {
        dataType: typeof content,
        content: content,
        type: type,
        datetime: new Date().getTime()
    };
    if (SESSION_TYPE === type) {
        window.sessionStorage.setItem(key, JSON.stringify(data));
    }
    else {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
};
//# sourceMappingURL=StoreUtil.js.map