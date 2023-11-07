<template>
  <div class="pageheader">
    <div></div>
    <div class="right" @click="signOut">Sign Out</div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
    }
  },
  methods: {
    async signOut() {
      let params = {
        id:this.$store.state.user.userInfo.id
      }
      const {data:res} = await api.signOut(params)
      if(res.code !== 0) {
        return this.$message.error(res.message)
      }
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.pageheader {
  display: flex;
  height: 50px;
  background-color: #002754;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.pageheader .right {
  margin-right: 10px;
}
</style>