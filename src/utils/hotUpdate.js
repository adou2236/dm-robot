// // 热更新相关js
// import { app } from 'electron';
// const admZip = require('adm-zip'); // 压缩解压插件
// const request = require('request');
// const fs = require('fs');
// const path = require('path');
// const baseUrl = path.resolve("./") + "/resources/app/"; //打包后 asar 解压后app 的地址
// const fileUrl = 'http://192.168.2.36:3333/download/' // 服务端 包， package.json存放位置
//
// /**
//  * 更新
//  */
// const downLoad = () => {
//     return new Promise((resolve, reject) => {
//
//         const stream = fs.createWriteStream(`${baseUrl}dist.zip`);
//         const url = `${fileUrl}dist.zip`;
//
//         request(url).pipe(stream).on('close', () => {
//
//             const unzip = new admZip(`${baseUrl}dist.zip`); //下载压缩更新包
//             unzip.extractAllTo(`${baseUrl}`, /*overwrite*/ true); //解压替换本地文件
//             resolve()
//         });
//     })
//
// }
//
// /**
//  * 检测更新
//  */
// export function hotUpdate () {
//     return new Promise((resolve, reject) => {
//         request({
//                 url: `${fileUrl}package.json`, //请求package.json，与本地对比版本号
//             },
//             (error, res, body) => {
//                 try {
//                     if (error || res.statusCode !== 200) {
//                         throw '更新版本号失败，请联系管理员';
//                     }
//                     const json = JSON.parse(body);
//                     const {
//                         version,
//                         description
//                     } = json;
//                     const localVersion = app.getVersion()
//
//                     downLoad()
//                         .then(() => {
//                             fs.readFile(`${baseUrl}package.json`, function (err, data) {
//                                 if (err) {
//                                     return console.error(err);
//                                 }
//                                 let newData = JSON.parse(data);
//                                 newData.version = version;
//                                 fs.writeFile(`${baseUrl}package.json`, JSON.stringify(newData), function (err) {
//                                     if (err) {
//                                         return console.error(err);
//                                     }
//                                     // 重启
//                                     app.relaunch({
//                                         args: process.argv.slice(1)
//                                     });
//                                     app.exit(0);
//                                 });
//                             });
//                         })
//                 } catch (err) {
//                     reject(err);
//                 }
//             })
//     })
// }