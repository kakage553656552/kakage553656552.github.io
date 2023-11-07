<template>
  <div>
    <ul>
      <!-- 使用这个组件，并绑定数据 -->
      <Item :model="treeData"></Item>
    </ul>
  </div>
</template>
<script>
// 导入递归组件
import Item from "@/components/digui";
export default {
  name: "App",
  data() {
    return {
      // 需要实现递归的数据，上面已经给出
      treeData: {
        title: "AAAAAA",
        children: [
          {
            title: "CCC",
            children: [
              {
                title: "DDD",
                children: [
                  {
                    title: "DDD",
                    children: [
                      {
                        title: "DDD",
                        children: [
                          {
                            title: "DDD",
                            children: [
                              {
                                title: "DDD"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    // 注册组件
    Item
  }
};
</script>