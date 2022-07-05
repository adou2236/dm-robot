import axios from 'axios';
import { message } from 'ant-design-vue';



// 创建 axios 实例
const service = axios.create({
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        if (!config.headers) {
            throw new Error(
                `Expected 'config' and 'config.headers' not to be undefined`
            );
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const {status} = response
        const { code, msg } = response.data;
        if (status === 200) {
            return response.data;
        } else {
            // 响应数据为二进制流处理(Excel导出)
            if (response.data instanceof ArrayBuffer) {
                return response;
            }

            message.error( msg || '系统出错',);

            return Promise.reject(new Error(msg || 'Error'));
        }
    },
    error => {
        const { msg } = error.response.data;
        message.error( msg || '系统出错',);
        return Promise.reject(new Error(msg || 'Error'));
    }
);

// 导出 axios 实例
export default service;