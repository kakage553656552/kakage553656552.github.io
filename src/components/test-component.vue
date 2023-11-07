<template>
  <div>
    test component
     <slot v-bind:msg="msg">
      </slot>
      <ka-tag v-bind="$attrs" v-on="$listeners">AAA</ka-tag>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      loading: true,
      dis:'',
      visible: false,
      msg: 'this is a message'
    }
  },
  methods: {
    beforeCloseHander() {

    }
  },
  created() {
    console.log(this.$style.red);
  }
}

</script>
<style module>
.red {
  color: red;
}
</style>