var state = {
    aside: {
        isCollapse: false
    }
};
var mutations = {
    // 设置宽度
    setAsideCollapse: function (state, isCollapse) {
        state.aside.isCollapse = isCollapse;
    }
};
var getters = {
    asideCollapse: function (state) { return state.aside.isCollapse; }
};
export default {
    state: state,
    mutations: mutations,
    getters: getters
};
//# sourceMappingURL=System.js.map