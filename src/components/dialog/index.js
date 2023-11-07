import Dialog from '@/components/dialog/index.vue'

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog