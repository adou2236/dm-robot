<template>
  <div>
    dm设置
    <a-form layout="inline">
      {{streamConfig}}
      <a-form-item v-for="(item,index) in streamConfig" :key="index" :label="item.label">
        <a-row>
          <a-switch v-model:checked="item.active"></a-switch>
          <a-checkbox v-model:checked="item.sound">语音播报</a-checkbox>
          <a-input v-model:value="item.template"></a-input>
        </a-row>
      </a-form-item>
    </a-form>
    <infiti-scroll roomId="23982773" @onMessage="receiveMessage"></infiti-scroll>

  </div>
</template>

<script>
import {defineComponent, computed, watch, ref, onMounted} from 'vue';
import {useStore} from "@/store";
import {Form,FormItem,Checkbox,Switch,Input,Row} from 'ant-design-vue'
import InfitiScroll from "@/views/panel/components/infitiScroll";
export default defineComponent({
  components:{
    InfitiScroll,
    AForm:Form,
    AFormItem:FormItem,
    ACheckbox:Checkbox,
    ASwitch:Switch,
    AInput:Input,
    ARow:Row
  },
  setup(){
    const store = useStore()
    const userInfo = computed(()=>{
      return store.state.user.userInfo
    })
    const uid = computed(()=>{
      return store.state.user.uid
    })
    const testAB = ref(0)
    const streamConfig = computed(()=>{
      return store.state.config.streamConfig
    })
    watch(streamConfig, (value) => {
      store.dispatch('config/setStreamConfig',value)
    },{deep:true});



    function receiveMessage(message){
      message.forEach(item=>{
        console.log(item)
        // let msg = item.info[1]
        // store.dispatch('message/readMessage', {msg:`测试弹幕${testAB.value}`,speed:5})
      })

    }
    return {
      userInfo,
      uid,
      streamConfig,
      receiveMessage
    }

  }

})
</script>

<style scoped>

</style>