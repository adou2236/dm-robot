import {MAX_LENGTH} from "@/assets/config/default_config";
// import {dmRead} from "@/utils/common";
import {dmRead} from "@/utils/common";

// const readMode = this.$store.state.config.readMode
// const streamConfig = this.state.config.streamConfig

const messageModule = {
    namespaced: true,
    state: {
        queue:[],
        audio:null,
    },
    mutations: {
        SET_AUDIO(state,audio) {
            state.audio = audio
        },
        PUSH_QUEUE(state, message) {
            if(state.queue.length>MAX_LENGTH){
                state.queue.shift()
            }
            state.queue.push(message);
        },
        SHIFT_QUEUE(state){
            state.queue.shift()
        }

    },
    actions: {
        shiftMessage({commit,state}){
            return state.queue.shift()
        },
        readMessage({dispatch,commit,state},{msg,speed=5}){
            if(msg){
                let audioInstance = state.audio
                // 音频初始化
                if(!audioInstance) {
                    audioInstance = dmRead(msg, speed)
                    commit('SET_AUDIO', audioInstance)
                    audioInstance.addEventListener('ended', () => {
                        let nextMessage = state.queue.shift()
                        dispatch('readMessage', {msg:nextMessage, speed})
                    })
                }else{
                    //没有播放，更换播放源
                    if(audioInstance.paused){
                        audioInstance.src = `https://fanyi.baidu.com/gettts?lan=zh&spd=${speed}&source=web&text=${msg}`
                    }else{
                        //播放中入队
                        commit('PUSH_QUEUE',msg)
                    }
                }
                if(audioInstance.paused){
                    audioInstance.play()
                }
            }
        }

    },
    getters: {}
};

export default messageModule;