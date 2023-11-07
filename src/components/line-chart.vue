<template>
  <div id="main" style="width: 100%; height: 100%"></div>
</template>
 
 <script>
import * as echarts from "echarts";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 0);
  },
  methods: {
    resize() {
      setTimeout(() => {
        var myChart = echarts.init(document.getElementById("main"));
        myChart.resize();
      }, 0);
    },
    init() {
      var chartDom = document.getElementById("main");
      console.dir(chartDom);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        grid: {
          show: true,
          z: 0,
          left: "40px",
          top: "40px",
          right: "40px",
          bottom: "40px",
          containLabel: false,
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 1,
          borderColor: "#ccc",
        },
        xAxis: {
          type: "category",
          data: [null, false, 0, 999, NaN, undefined, "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };

      option && myChart.setOption(option);
      myChart.on('click', params => {
      })
    },
  },
  created() {},
};
</script>