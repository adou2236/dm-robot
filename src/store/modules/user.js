import {getUserId, getUserInfoById, isLogin} from "@/api";

const getDefaultState = () => {
    return {
        uid: '',
        userInfo: {}
    };
};

const userModule = {
    namespaced: true,
    state: {
        uid: '',
        userInfo: {}
    },
    mutations: {
        SET_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        SET_USERID(state, uid) {
            state.uid = uid;
        }
    },
    actions: {
        /**
         * 检查是否登录
         */
        checkIsLogin({dispatch,commit}) {
            return new Promise((resolve, reject) => {
                getUserId().then((response) => {
                    const {uid} = response.data;
                    if (!uid) {
                        return reject('验证失败，请重新登录');
                    }
                    commit('SET_USERID', uid);
                    resolve(true);
                    // dispatch('getUserInfo').then(() => {
                    // }).catch((error) => {
                    //     reject(error);
                    // })
                }).catch((error) => {
                    reject(error);
                });
            })
        },
        /**
         *  获取用户信
         */
        getUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfoById(state.uid)
                    .then((response) => {
                        const {data} = response;
                        if (!data) {
                            return reject('验证失败，请重新登录');
                        }
                        commit('SET_USERINFO', data);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },

        /**
         *  注销
         */
        logout({commit}) {

        },

        /**
         * 清除 Token
         */
        resetToken({commit}) {

        }
    },
    getters: {}
};

export default userModule;