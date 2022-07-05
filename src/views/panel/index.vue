<template>
  <div>面板
    <InfitiScroll roomId="21657849"></InfitiScroll>
    <a-button @click="handleLogout">退出</a-button>
  </div>
</template>

<script>
import {defineComponent, } from "vue";
import {Button} from 'ant-design-vue'
import InfitiScroll from "@/views/panel/components/infitiScroll";
import {useRouter} from "vue-router";


export default defineComponent({
  components: {InfitiScroll,AButton:Button},
  setup() {

    const router = useRouter()
    const handleLogout = function(){
      router.push('/')
    }
    return {
      handleLogout,

    };
  }
});

</script>

<style scoped>

</style>