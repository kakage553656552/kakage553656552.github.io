<template>
  <div>
    <testCom :aaa="aaa" @log="log">
      <template slot-scope="scope">
        {{scope.msg}}
      </template>
    </testCom>
  </div>
</template>
 
 <script>
import testCom from '@/components/test-component.vue'
export default {
  components:{testCom},
  data() {
    return {
      loading: true,
      aaa:'aaa'
    }
  },
  methods: {
    log(e) {
      alert(e)
    }
  },
  created() {
  }
}
</script>