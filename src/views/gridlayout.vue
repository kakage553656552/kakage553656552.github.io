<template>
  <div class="board" style="width: 100%">
    <div class="home">
      <el-button type="primary" size="mini" @click="add">Add</el-button>
      <grid-layout
        :layout="layoutData"
        :col-num="12"
        :row-height="150"
        :is-draggable="layoutConfig.dialogVisible"
        :is-resizable="layoutConfig.dialogVisible"
        :is-mirrored="false"
        :vertical-compact="false"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(item) in layoutData"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :is-draggable="item.isDraggable"
          :is-resizable="item.isResizable"
          :static="item.static"
          @resized="resizedEvent"
          @moved="movedEvent"
        ><line-chart ref="gadget" style="width: 100%; height: 100%" :item="item"></line-chart></grid-item>
      </grid-layout>
    </div>
  </div>
</template>
 
 <script>
import layoutData from '@/components/layoutData.json'
import VueGridLayout from 'vue-grid-layout'
import lineChart from '@/components/line-chart'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem
export default {
  data() {
    return {
      // 布局数据
      layoutData: [],
      layoutConfig: {
        height: 100, // 默认高度
        dialogVisible: true // 是否可拖拽或改变大小
      },
      temData: {
        "x": 0,
        "w": 1,
        "h": 1
      },
    }
  },
  components: {
    GridLayout,
    GridItem,
    lineChart
  },
  methods: {
    init() {
      this.layoutData = layoutData.mainData
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log("大小改变完了", i, newH, newW, newHPx, newWPx);
      this.$refs.gadget[0].resize()
    },
    movedEvent(i, newX, newY) {
      console.log("移动结束了", i, newX, newY);
    },
    add() {
      var arr = []
      this.layoutData.forEach(item => {
        arr.push(item.y)
      });
      var y = Math.max.apply(Math,arr)
      this.temData.y = y+1
      this.temData.i = this.layoutData.length
      this.layoutData.push(JSON.parse(JSON.stringify(this.temData)))
    }
  },
  created() {
    this.init()
  }
}

</script>
 <style scoped>
.vue-grid-item {
  /* background: aquamarine; */
  border: 1px solid #ccc;
}
</style>