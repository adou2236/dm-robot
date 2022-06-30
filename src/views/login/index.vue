<template>
  <div class="login-page">
    <a-form>
      <a-form-item>
        <a-input v-model:value="roomId" placeholder="请输入ID" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { useRouter } from 'vue-router';
import {Input,Button,Form,FormItem} from 'ant-design-vue'
import {getRealUrl} from "@/api";

export default defineComponent({


  components:{
    AInput:Input,
    AButton:Button,
    AForm:Form,
    AFormItem:FormItem
  },
  setup() {
    const router = useRouter();
    // const cacheRoomId = getSetting('roomId')

    const roomId = ref('7100183')

    const handleLogin = async function(){
      if(roomId.value){
        let {data} = await getRealUrl(roomId.value)
        if(data){
          console.log(data['room_id'])
          router.push('/panel')
        }
      }
    }
    return {
      roomId,
      handleLogin
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

</style>