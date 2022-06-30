<template>
  <div>面板
    <InfitiScroll roomId="23982773"></InfitiScroll>
  </div>
</template>

<script>
import {defineComponent, } from "vue";
import InfitiScroll from "@/views/panel/components/infitiScroll";


export default defineComponent({
  components: {InfitiScroll},
  setup() {

    return {

    };
  }
});

</script>

<style scoped>

</style>