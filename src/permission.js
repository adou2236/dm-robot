import router from '@/router';
import NProgress from 'nprogress';
import { store } from '@/store';

NProgress.configure({ showSpinner: false });

// 白名单,无需token便可访问
const whiteList = ['/login'];

router.beforeEach(async (to, form, next) => {
    NProgress.start();
    const isLogin = await store.dispatch('user/checkIsLogin');
    if (isLogin) {
        // 如果登录成功，跳转到首页
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            next();
            NProgress.done();
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
