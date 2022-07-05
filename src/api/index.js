import service from "@/api/http";
import {ANALYSIS_URL} from '@/assets/config/default_config'
export function getRealUrl(roomId){
    let params = {
        id:roomId
    }
    return service({
        baseURL:ANALYSIS_URL,
        method:'get',
        params
    })
}

export function getQrcode(){
    return service({
        baseURL:'https://passport.bilibili.com/qrcode/getLoginUrl',
        method:'get',
    })
}

export function checkLogin(data){
    return service({
        baseURL: 'https://passport.bilibili.com/qrcode/getLoginInfo',
        method:'post',
        params: data
    })
}

export function getUserId(){
    return service({
        baseURL: 'https://api.live.bilibili.com/User/getUserInfo',
        method: 'get'
    })
}

export function getUserInfoById(UID){
    return service({
        baseURL: `https://api.bilibili.com/x/space/acc/info`,
        method: 'get',
        params:{
            mid:UID
        },
    })
}

export function isLogin(){
    return service({
        baseURL: 'https://passport.bilibili.com/qrcode/getLoginUrl',
        method: 'get'
    })
}