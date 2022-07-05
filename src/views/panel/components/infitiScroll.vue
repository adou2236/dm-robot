<template>
  <div>
    <dm-item v-for="(item,index) in dmList" :key="index" :content="item"></dm-item>
  </div>
</template>

<script>
import {computed, defineComponent, defineEmits, onBeforeUnmount, onMounted, ref} from "vue";
import {ACC_TYPE, WS_URL} from "@/assets/config/default_config";
import {createSocket} from "@/api/websocket";
import {dataToTTS, dmFormatter, receiveData, sendData} from "@/utils/common";
import DmItem from "@/views/panel/components/dmItem";

export default defineComponent({
  components: {DmItem},
  props:{
   roomId:{
     type:String,
     required:true
   }
  },
  setup(props,context){
    const emit = defineEmits(['onMessage'])

    const timer = ref(null)
    const socket = ref(null)

    const dmList = ref([])

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
    const visualList = computed(() => {
      return dmList.value
    })
    onMounted(()=>{
      wsInit()
    })

    onBeforeUnmount(()=>{
      if(timer.value){
        clearInterval(timer.value)
        timer.value = null
      }
    })


    const wsInit = function(){
      if(socket.value){
        socket.value.close()
      }
      socket.value = createSocket(WS_URL)
      socket.value.onopen = handleOpen
      socket.value.onmessage = handleReceive
    }

    const handleReceive = (msg) =>{
      let reader = new FileReader();
      reader.readAsArrayBuffer(msg.data); //把blob对象变成arraybuffer
      reader.onload =  (event) => {
        let content = reader.result;
        let res = receiveData(content); // 处理
        res.forEach((item)=>{
          dmList.value.push(dataToTTS(dmFormatter(item)))
        })
        context.emit('onMessage',res)
      };
    }

    const handleOpen = function(){
      sendMessage(firstData.value,1,ACC_TYPE.auth,1)
      setHeartbeat()
    }
    const sendMessage = function(msg,p,o,s){
      socket.value.send(sendData(JSON.stringify(msg), p, o, s))
    }

    const setHeartbeat = function(){
      if(timer.value){
        clearInterval(timer.value)
        timer.value = null
      }
      timer.value = setInterval( () => {
        socket.value.send(sendData('', 1, ACC_TYPE.client_heartbeat, 1))
      }, 30000);
    }
    return{
      visualList,
      dmList,

    }
  }
})
</script>

<style scoped>

</style>