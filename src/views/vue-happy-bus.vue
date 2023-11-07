<template>
  <div>
    11122222
    <el-button @click="click">emit</el-button>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      loading: true,
      dis:'',
      Bus: this.$Bus(this)
    }
  },
  methods: {
    click() {
      this.Bus.$emit('bus','AAAAAAA')
    }
  },
  created() {
    this.Bus.$on('bus',(e)=>{
      console.log(e)
    })
  }
}

</script>
<style module>
.red {
  color: red;
}
</style>