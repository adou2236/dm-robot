<template>
  <p>
    {{props.name}}：{{props.content}}
  </p>
</template>

<script>
import {defineComponent,defineProps} from "vue";

export default defineComponent({
  setup(){
    const props = defineProps({
      name:{
        type:String,
        default:'***'
      },
      content:{
        type:String,
        default:'****'
      }
    })
    return {
      props
    }
  }

})
</script>

<style scoped>

</style>