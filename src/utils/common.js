import pako from 'pako'
import {ACC_TYPE,MSG_CODE} from "@/assets/config/default_config";
//字符串转Uint8Array
export const stringToUint = function (s) {
    const charList = s.split('');
    const uintArray = [];
    for (let i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}
//Uint8Array转字符串
export const uintToString = function (uintArray) {
    return decodeURIComponent(escape(String.fromCodePoint.apply(null, uintArray)));
}
//用于合成心跳包和验证包 返回arraybuffer 16均为包头长度
/**
 *
 * @param data 数据
 * @param p 版本协议号
 * @param o 协议类型
 * @param s 序列号
 * @returns {ArrayBuffer}
 */
export const  sendData = function (data, p, o, s) {
    let dataUint8Array = stringToUint(data);
    let buffer = new ArrayBuffer(dataUint8Array.byteLength + 16);
    let dv = new DataView(buffer);
    //包长
    dv.setUint32(0, dataUint8Array.byteLength + 16);
    //头部长度 固定16
    dv.setUint16(4, 16);
    //协议版本号
    dv.setUint16(6, parseInt(p, 10));
    //协议类型
    dv.setUint32(8, parseInt(o, 10));
    //序列号 通常为1
    dv.setUint32(12, parseInt(s, 10));
    for (let i = 0; i < dataUint8Array.byteLength; i++) {
        dv.setUint8(16 + i, dataUint8Array[i]);
    }
    return buffer;
}
// 接收数据
export const receiveData = function (data) {
    const dv = new DataView(data);
    //包长
    const packageLen = dv.getUint32(0);
    //头部长度 固定16
    const headerLen = dv.getUint16(4);
    //协议版本号
    const protover = dv.getUint16(6);
    //协议类型
    const operation = dv.getUint32(8);
    //序列号 通常为1
    const sequence = dv.getUint32(12);
    data = data.slice(headerLen, packageLen);
    return dataFormate(0,protover,operation,data)

}
//处理解压后的arraybuffer
export const unzip = function (data) {
    let result = []
    let offect = 0;
    let len = 0
    const maxLength = data.byteLength;
    while (offect < maxLength) {
        data = data.slice(len, maxLength);
        const dv = new DataView(data);
        const packageLen = dv.getUint32(0);
        const headerLen = dv.getUint16(4);
        const protover = dv.getUint16(6);
        const operation = dv.getUint32(8);
        let datas = data.slice(headerLen, packageLen)
        result.push(dataFormate(1,protover,operation,datas))
        offect += packageLen;
        len = packageLen;
    }
    return result
}

const dataFormate = function(type,protover,operation,data){
    console.log(protover,operation)
    let content = ''
    let contents = []
    let dataV = ''
    switch (protover) {
        case 0:
            //广播信息
            content = uintToString(new Uint8Array(data));
            break;
        case 1:
            dataV = new DataView(data);
            if (operation === 3) {
                content = dataV.getUint32(0)
            } else if (operation === 8) {
                //连接成功返回{code:0}
                content = uintToString(new Uint8Array(data));
            }
            break;
        case 2:
            if (operation === 5) {
                //解压
                 try {
                     if(type === 1){
                         content = pako.inflate(new Uint8Array(data), {
                             to: 'string'
                         })
                     }else{
                         contents = unzip(pako.inflate(new Uint8Array(data)).buffer);
                     }
                 } catch (err) {
                    console.log(err);
                 }

            }
            break;
        default:
            console.log("unknown data");
            break;
    }
    let obj = null
    if(content){
        obj = {
            code:protover,
            content:JSON.parse(content)
        }
    }
    return [...contents,obj]

}