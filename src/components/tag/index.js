import kaTag from '@/components/tag/index.vue'

kaTag.install = function (Vue) {
  Vue.component(kaTag.name, kaTag)
}

export default kaTag