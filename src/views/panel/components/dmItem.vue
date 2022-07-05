<template>
  <p>
    {{content}}
  </p>
</template>

<script>
import {defineComponent,defineProps,ref,computed} from "vue";

export default defineComponent({
  props: {
    content: {
      type: Object,
    },
  },
  setup(props){

  }

})
</script>

<style scoped>

</style>