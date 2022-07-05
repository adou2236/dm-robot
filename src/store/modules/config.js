
const configModule = {
    namespaced: true,
    state: {
        //弹幕设置
        streamConfig:{
            danmu:{
                label:'弹幕设置',
                keys:['DANMU_MSG'],
                active:true,
                sound:true,
                template: '{%name%}说{%message%}'
            },
            gift:{
                label:'礼物设置',
                keys:['COMBO_SEND','SEND_GIFT'],
                active:true,
                sound: true,
                template: '{%name%}送出{%num%}个{%gift%}'
            },
            welcome:{
                label:'欢迎设置',
                keys:['INTERACT_WORD','WELCOME','WELCOME_GUARD'],
                active:true,
                sound: true,
                template: '欢迎{%name%}进入直播间'
            }
        },
        //自动设置
        autoconfig:{},
        //互动设置
        interactionConfig:{},
        readMode:'queue',//queue,cover

    },
    mutations: {
        SET_STREAMCONFIG(state, streamConfig) {
            state.streamConfig = streamConfig;
        },
    },
    actions: {
        setStreamConfig({commit},data){
            commit('SET_STREAMCONFIG',data)
        }
    },
    getters: {
        danmuTempalte(state){
            return state.streamConfig.danmu
        },
        giftTemplate(state){
            return state.streamConfig.gift
        },
        welcomeTemplate(state){
            return state.streamConfig.welcome
        }

    }
};

export default configModule;