export default {
  data() {
    return {
      global:'this is global mixin',
      msg: 'mixin msg'
    }
  },
  methods: {
  },
  created() {
    console.log(this.global);
  },
  mounted() {
  }
}