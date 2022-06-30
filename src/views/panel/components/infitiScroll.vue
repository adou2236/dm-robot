<template>
  <div>无限滚动</div>
</template>

<script>
import {computed, defineComponent, defineProps, onMounted, ref} from "vue";
import {ACC_TYPE, WS_URL} from "@/assets/config/default_config";
import {createSocket} from "@/api/websocket";
import { receiveData, sendData} from "@/utils/common";

export default defineComponent({
  props:{
   roomId:{
     type:String,
     required:true
   }
  },
  setup(props){
    const socket = ref(null)

    const firstData = computed(()=>{
      return {
        'uid': 0,
        'roomid': parseInt(props.roomId, 10),
        'protover': 2,
        'platform': 'web',
        'clientver': '1.8.5',
        'type': 2,
      };
    })
    onMounted(()=>{
      console.log(props)
      wsInit()
    })
    const wsInit = function(){
      if(socket.value){
        socket.value.close()
      }
      socket.value = createSocket(WS_URL)
      socket.value.onopen = handleOpen
      socket.value.onmessage = handleReceive
    }

    const handleReceive = function(msg){
      let reader = new FileReader();
      reader.readAsArrayBuffer(msg.data); //把blob对象变成arraybuffer
      reader.onload = function (event) {
        let content = reader.result;
        let res = receiveData(content); // 处理
        console.log("获取数据",res)
      };
    }

    const handleOpen = function(){
      sendMessage(firstData.value,1,ACC_TYPE.auth,1)
    }
    const sendMessage = function(msg,p,o,s){
      socket.value.send(sendData(JSON.stringify(msg), p, o, s))


    }
    return{

    }
  }
})
</script>

<style scoped>

</style>