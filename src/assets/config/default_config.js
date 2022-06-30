export const ANALYSIS_URL = 'https://api.live.bilibili.com/room/v1/Room/room_init'
export const WS_URL = 'wss://broadcastlv.chat.bilibili.com:2245/sub'

export const ACC_TYPE = {
    radio: 0,//广播信息
    client_heartbeat:2, //客户端发送的心跳包
    hot_rate:3,	//人气值，数据不是JSON，是4字节整数
    cmd:5,	//命令，数据中['cmd']表示具体命令
    auth:7,	//认证并加入房间
    server_heartbeat:8,	//服务器发送的心跳包
}

export const MSG_CODE = {
    COMBO_SEND: 'COMBO_SEND',//赠送礼物
    DANMU_MSG: 'DANMU_MSG', //弹幕内容
    ENTRY_EFFECT: 'ENTRY_EFFECT', //进入特效
    GUARD_BUY :'GUARD_BUY', //购买舰长
    HOT_RANK_CHANGED:'HOT_RANK_CHANGED', //主播实时活动排名
    INTERACT_WORD:'INTERACT_WORD', //进入房间
    LIVE:'LIVE', //直播开始
    LIVE_INTERACTIVE_GAME:'LIVE_INTERACTIVE_GAME',
    NOTICE_MSG:'NOTICE_MSG', //直播间广播
    ONLINE_RANK_COUNT:  'ONLINE_RANK_COUNT',//高能榜数量更新
    ONLINE_RANK_V2: 'ONLINE_RANK_V2', //高能榜数据
    ONLINE_RANK_TOP3: 'ONLINE_RANK_TOP3',//用户进高能榜前三
    PREPARING: 'PREPARING', //主播准备中
    ROOM_REAL_TIME_MESSAGE_UPDATE: 'ROOM_REAL_TIME_MESSAGE_UPDATE', //主播粉丝信息更新
    STOP_LIVE_ROOM_LIST: 'STOP_LIVE_ROOM_LIST', //停止的直播间信息
    SUPER_CHAT_MESSAGE: 'SUPER_CHAT_MESSAGE', //超级留言
    SUPER_CHAT_MESSAGE_JPN: 'SUPER_CHAT_MESSAGE_JPN', //超级留言-JP
    SYS_MSG:'SYS_MSG', //系统消息
    SEND_GIFT: 'SEND_GIFT', //赠送礼物
    TRADING_SCORE: 'TRADING_SCORE',
    USER_TOAST_MSG: 'USER_TOAST_MSG', //续费舰长
    WELCOME: 'WELCOME', //欢迎加入房间
    WELCOME_GUARD: 'WELCOME_GUARD', //欢迎房管加入房间

}

export default {
    ANALYSIS_URL,
    WS_URL,
    ACC_TYPE
}