<template>
    <li>
      <!-- 点击折叠展开 -->
      <div @click="toggle">
        <!-- 显示内容 -->
        {{model.title}}
        <!-- 显示折叠展开的图标，如果没有下级目录的话，则不显示 -->
        <span v-if="isFolder">[{{open?'-':'+'}}]</span>
      </div>
      <!-- 控制是否显示下级目录 -->
      <ul v-show="open" v-if="isFolder">
        <!-- 重点代码，调用自身，实现递归，绑定数据 -->
        <Item v-for="model in model.children" :model="model" :key="model.title"></Item>
      </ul>
    </li>
  </template>
  <script>
  export default {
    name: "Item",
    // 如果想使用此组件，则需要传递的数据
    props: {
      model: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // 默认不显示下级目录
        open: false
      };
    },
    computed: {
      // 控制是否有下级目录和显示下级目录
      isFolder() {
        return this.model.children && this.model.children.length;
      }
    },
    methods: {
      // 点击折叠展开的方法
      toggle() {
        if (this.isFolder) {
          this.open = !this.open;
        }
      }
    }
  };
  </script>