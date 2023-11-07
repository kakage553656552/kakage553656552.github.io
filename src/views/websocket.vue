<template>
  <div>
    <div class="el-icon-s-custom" style="margin-bottom:10px">{{ id}}</div>
    <el-input v-model="msg" placeholder="请输入内容" @keyup.enter.native="submit"></el-input>
    <div v-for="item in arr" :key="item">{{ item }}</div>
    <el-button style="margin-top: 20px" @click="submit" type="primary"
      >提交</el-button
    >
  </div>
</template>

<script>
import { io } from "socket.io-client";
export default {
  name: "websocket",
  data() {
    return {
      msg: "",
      arr: [],
      socket:null,
      id:null
    };
  },
  created() {
    this.socket = io("http://127.0.0.1:9000?token=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.socket.on("connect", () => {
      this.$message.success("你连接上websocket啦");
    });
    this.socket.on("setId", (id) => {
      this.id = id
    });
    this.socket.on("message", (msg) => {
      console.log(11111)
      this.arr.push(msg);
    });
  },
  methods: {
    submit() {
      this.socket.emit("message", this.msg,this.id);
      this.msg = "";
    }
  }
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
