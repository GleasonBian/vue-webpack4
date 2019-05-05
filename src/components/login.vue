<template> 
<div>
  <button @click="clickHandle">23232</button>
</div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},

  watch: {},

  methods: {
        clickHandle(){
      this.axios.post('/api/wxsupplier/supplierProduct/listData').then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    }
  },
  /**
   *
   * 生命周期
   *
   */
  created() {},
  mounted() {}
};
</script>
<style  scoped>
</style>