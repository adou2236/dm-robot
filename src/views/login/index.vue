<template>
  <div class="login-page">
    <div class="qrcode">
      <img class="qr-img" :src="qrcodeSrc" />
      <div class="refresh-wrap" @click="getQrcodeSrc">刷新</div>

    </div>
<!--    <a-form>-->
<!--      <a-form-item>-->
<!--        <a-input v-model:value="roomId" placeholder="请输入ID" />-->
<!--      </a-form-item>-->
<!--      <a-form-item label="扫描二维码">-->
<!--      </a-form-item>-->
<!--      <a-form-item>-->
<!--        <a-button type="primary" @click="handleLogin">登录</a-button>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';
import {Input,Button,Form,FormItem} from 'ant-design-vue'
import {checkLogin, getQrcode, getRealUrl} from "@/api";
import QRCode from 'qrcode'
import {useStore} from "@/store";

export default defineComponent({


  components:{
    AInput:Input,
    AButton:Button,
    AForm:Form,
    AFormItem:FormItem
  },
  setup() {
    const router = useRouter();
    const store = useStore()
    // const cacheRoomId = getSetting('roomId')

    const roomId = ref('7100183')
    const oauthKey = ref('')
    const qrcodeSrc = ref('')
    const interval = ref(null)
    onMounted(()=>{
      getQrcodeSrc()
    })
    onBeforeUnmount(()=>{
      if(interval.value){
        clearInterval(interval.value)
        interval.value = null
      }
    })

    const handleLogin = async function(){
      if(roomId.value){
        let {data} = await getRealUrl(roomId.value)
        if(data){
          router.push('/panel')
        }
      }
    }
    const getQrcodeSrc = async function(){
      let {data} = await getQrcode()
      if(data){
        oauthKey.value = data.oauthKey
        checkIfLogin()
        QRCode.toDataURL(data.url, function (err, url) {
          if(url){
            qrcodeSrc.value = url
          }
        })
      }

    }
    const checkIfLogin = function(){
      if(interval.value){
        clearInterval(interval.value)
        interval.value = null
      }
      interval.value = setInterval(async()=>{
        let res = await checkLogin({
          'oauthKey':oauthKey.value,
          'gourl': 'https://passport.bilibili.com/account/security'
        })
        let {status} = res
        if(status){
          await store.dispatch('user/getUserInfo')

        }

      },2000)
    }
    return {
      roomId,
      qrcodeSrc,
      getQrcodeSrc,
      handleLogin,
    };
  }
});

</script>

<style scoped>
.login-page{
  width: 300px;
  height: 300px;
  line-height: 300px;
  vertical-align: middle;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

}
.qrcode{

  position: relative;
  margin: auto;
  cursor: pointer;
}
.qr-img{
  width: 100%;
  height: 100%;
}

.refresh-wrap{
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #FFF;
  font-size: 20px;
  background: rgba(0,0,0,0.3);
}
.qrcode:hover > .refresh-wrap{
  display: block;
}


</style>