<template>
  <div class="scroll-top">
    <transition name="fade">
      <button
        v-if="isFadeIn"
        class="scroll-top__btn"
        @click="setScrollTop"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VTop',
  props: {
    goTo: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      isMoving: false,
      isFadeIn: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.setFadeInOut, this.checkPassiveEvent)
  },

  destroyed () {
    window.removeEventListener('scroll', this.setFadeInOut)
  },

  methods: {
    setFadeInOut () {
      const currHeight = window.innerHeight + Math.ceil(window.pageYOffset)
      const targetHeight = window.innerHeight
      const isBottom = currHeight > targetHeight
      const isSame = this.isFadeIn === isBottom
      const fn = () => this.handleState(isBottom, 'isFadeIn')

      return this.setTaskQue(fn, {
        cancel: () => isSame,
        action: () => !isSame
      })()
    },

    setScrollTop () {
      if (this.isMoving) {
        return
      }

      const scrollManager = this.$smoothScroll
      const scroll = scrollManager.create()

      scrollManager.bindEvents(this.handleState)
      scroll.animateScroll(this.goTo)
    },

    handleState (reqState, stateName) {
      const name = stateName || 'isMoving'
      const prevState = [].concat(this[name])[0]

      if (reqState !== prevState) {
        this[name] = reqState
      }
    },

    setTaskQue (fn, { cancel = () => false, action = () => true }) {
      let tick = false
      return () => {
        if (tick) {
          return
        }

        tick = true
        return requestAnimationFrame(() => {
          if (cancel()) {
            tick = false
            return
          }

          if (action()) {
            tick = false
            return fn()
          }
        })
      }
    },

    checkPassiveEvent () {
      let passiveEventSupported = false
      const checker = Object.defineProperty({}, 'passive', {
        get: () => (passiveEventSupported = true)
      })

      window.addEventListener('checkEvent', null, checker)
      window.removeEventListener('checkEvent', null, checker)

      return passiveEventSupported ? { capture: false, passive: true } : false
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-top {
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 40px;
  z-index: 11;
  width: 60px;
  height: 60px;

  &__btn {
    width: inherit;
    height: inherit;
    background: url('~@/assets/images/icon/icon_scroll_top.png') no-repeat center / contain;
  }
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 1.2s;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

</style>
