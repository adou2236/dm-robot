const Store = require('electron-store');

let option={
    name:"dmrobot-config",//文件名称,默认 config
    fileExtension:"json",//文件后缀,默认json
    clearInvalidConfig:true, // 发生 SyntaxError  则清空配置,
}
const  store = new Store(option);

export const getSetting = (key) => store.get(key)

export const setSetting = (key,value) => store.set(key,value)