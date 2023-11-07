<template>
  <div class="model" id="model" v-show="visible" @click="close">
    <div class="content" id="dialog" @click.stop :style="{width:width,'margin-top':top}">
      <div class="header">
        <slot v-if="$slots.title" name="title"></slot>
        <template v-else>
          <div>{{title}}</div>
        </template>
        <div v-if="showClose" class="el-icon-close close_icon" @click="close"></div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean
    },
    fullScreen: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      type: String
    },
    top: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.$nextTick(() => {
          // this.oppendToBody()
          if (this.fullScreen) {
            this.showFullScreen()
          }
          if (this.lockScroll) {
            document.body.style.overflow = 'hidden'
          }
        })
      } else {
        if (this.lockScroll) {
          document.body.style.overflow = ''
        }
      }
    }
  },
  methods: {
    // oppendToBody () {
    //   this.$nextTick(() => {
    //     var model = document.getElementById('model')
    //     document.body.appendChild(model)
    //   })
    // },
    close () {
      if (this.$attrs['before-close']) {
        this.$attrs['before-close']()
      }
      // this.visible = false
      this.$emit('update:visible',false)
    },
    launchFullScreen (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    showFullScreen () {
      this.$nextTick(() => {
        this.launchFullScreen(document.getElementById('dialog'))
      })
    }
  }
}
</script>
<style scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #808080;
  transition: all 1s;
}
 .model .content {
    margin: auto;
    margin-top: 15vh;
    width: 50vw;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .model .content  .header {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }
   .model .content  .header   .close_icon {
        cursor: pointer;
      }
        .model .content  .header   .close_icon:hover {
          color:#409eff
        }
</style>
