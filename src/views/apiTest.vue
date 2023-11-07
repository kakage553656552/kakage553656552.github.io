<template>
  <div>
    <div v-loading="loading">
      <el-button size="mini" @click="addOrUpdateHandler"  type="primary">新增</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="Id"> </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="password" label="Password"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteHandler(scope.row)" size="mini" type="text">删除</el-button>
            <el-button @click="addOrUpdateHandler(scope.row)" size="mini" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-position="left" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Name:" label-width="100px" >
          <el-input size="mini" v-model="formInline.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="Password:" label-width="100px">
          <el-input size="mini" v-model="formInline.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubmit(formInline)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "apiTest",
  data() {
    return {
      tableData: [],
      loading: false,
      formInline:{},
      dialogVisible:false,
      updateInfo:{}
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.formInline = {}
    },
    addOrUpdateHandler(row) {
      if(row.id) {
        this.formInline = JSON.parse(JSON.stringify(row))
      }
      this.dialogVisible = true
    },
    deleteHandler(row) {
      var params = {
        id:row.id
      }
      this.loading = true
      this.$http.delete("/delete",{params}).then(({data:res}) => {
        this.loading = false;
        if(res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.getUserList()
        this.formInline = {}
      }).catch(()=>{
        this.loading = false;
        this.formInline = {}
      })
    },
    getUserList() {
      this.loading = true;
      this.$http.get("/test").then(({data:res}) => {
        this.loading = false;
        if(res.code !== 0) {
          return this.$message.error(res.msg)
        }
        this.tableData = res.data;
        this.loading = false;
      });
    },
    onSubmit() {
      if(!this.formInline.id) {
        this.loading = true;
        var params = this.formInline
        this.$http.post("/insert",params).then(({data:res}) => {
          this.loading = false;
          if(res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.getUserList()
          this.handleClose()
        }).catch(()=>{
          this.loading = false;
          this.handleClose()
        })
      }else {
        this.loading = true;
        var params = this.formInline
        this.$http.post("/update",params).then(({data:res}) => {
          this.loading = false;
          if(res.code !== 0) {
            return this.$message.error(res.msg)
          }
          this.getUserList()
          this.handleClose()
        }).catch(()=>{
          this.loading = false;
          this.handleClose()
        })
      }
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
