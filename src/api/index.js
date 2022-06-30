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