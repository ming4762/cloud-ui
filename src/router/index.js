import Vue from 'vue';
import Router from 'vue-router';
import systemRouter from '@/router/system/';
Vue.use(Router);
var routes = [
    {
        path: '/',
        name: '主页',
        redirect: '/login'
    },
    // 登录跳转
    {
        path: '/login',
        name: '登录',
        component: function () {
            return import('@/page/login/index.vue');
        }
    },
    // 主页
    {
        path: '/index',
        name: '主页',
        component: function () {
            return import('@/page/index/Index.vue');
        }
    }
];
routes = routes.concat(systemRouter);
export default new Router({
    routes: routes
});
//# sourceMappingURL=index.js.map