<template>
  <div>
    <el-form label-position="left" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Name:" label-width="100px" >
          <el-input size="mini" v-model="formInline.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="PassWord:" label-width="100px">
          <el-input size="mini" v-model="formInline.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit(formInline)">确 定</el-button>
      </span>
  </div>
</template>

<script>
export default {
  name: "apiTest",
  data() {
    return {
      loading: false,
      formInline:{},
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.formInline = {}
    },
    onSubmit(formInline) {
      this.loading = true;
      var params = this.formInline
      this.$http.post("/login",params).then((res) => {
        if(res.data.code !=0) {
          return this.$message.error('登录失败')
        }
        if(res.data.data.token) {
          localStorage.setItem('token',res.data.data.token)
        }

        this.$store.commit('user/setUserInfo',res.data.data)
        this.$message.success('登录成功')
        this.$router.push('/home')
        this.handleClose()
      }).catch(()=>{
        this.loading = false;
        this.handleClose()
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
