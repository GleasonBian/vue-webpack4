<template>
  <div id="app">
    hello world
    <button @click="clickHandle">click me</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
    }
  },
  methods: {
    clickHandle(){
      this.axios.post('/api/wxsupplier/supplierProduct/listData').then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    }
  },
}
</script>

<style scoped>

</style>
