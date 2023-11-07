<template>
  <div>
    <pageheader/>
    <router-view/>
  </div>
</template>

<script>
import pageheader from '@/components/pageheader.vue'
export default {
  components: {
    pageheader
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>