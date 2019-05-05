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
      num : 0,
    }
  },
  methods: {
    clickHandle(){
      let num2 = 1
      console.log(this.num++ + num2)
    }
  },
}
</script>

<style scoped>

</style>
