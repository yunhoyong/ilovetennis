<template>
  <el-dialog
    :show-close="isShowClose"
    :visible.sync="isOpen"
    :width="width"
    :top="popHeight"
    :custom-class="`popup-container ${popupType}`"
    @close="onClose"
  >
    <button
      v-if="isClose"
      class="popup-close-button"
      @click="onClose"
    >
      <span class="sr-only">창닫기</span>
    </button>
    <!-- Header -->
    <div class="popup-header">
      <slot name="header" />
    </div>

    <!-- Body -->
    <div
      class="popup-body"
      :class="popupTextAlign"
      style="margin-bottom: 40px;"
    >
      <slot name="body" />
    </div>

    <div
      v-if="$slots.footer"
      class="popup-footer"
    >
      <slot name="footer" />
    </div>
    <div
      v-else-if="footer.length"
      class="popup-footer"
    >
      <v-btn
        v-for="(value, index) in footer"
        :key="index"
        :data-id="value"
        :b-color="value === 'cancel' ? 'btn-gray' : ''"
        b-size="btn-md"
        @click="onClickBtn(value)"
      >
        {{ footerBtn[value] }}
      </v-btn>
    </div>
  </el-dialog>
  <!--
  <transition name="popup">
    <div
      v-show="visible"
      class="popup-mask"
      @click="onClose"
    >
      <div class="popup-wrapper">
        <div
          class="popup-container"
          :class="popupType"
          :style="getWidthSize"
          @click.stop
        >
          <button class="popup-close-button" @click="onClose">
            <span class="sr-only">창닫기</span>
          </button>
          <div class="popup-header">
            <slot name="header" />
          </div>
          <div
            class="popup-body"
            :class="popupTextAlign"
          >
            <slot name="body" />
          </div>

          <div
            v-if="$slots.footer"
            class="popup-footer"
          >
            <slot name="footer" />
          </div>
          <div v-else-if="footer.length" class="popup-footer">
            <v-btn
              v-for="(value, index) in footer"
              :key="index"
              :data-id="value"
              :b-color="value === 'cancel' ? 'btn-gray' : ''"
              b-size="btn-md"
              @click="onClickBtn(value)"
            >
              {{ footerBtn[value] }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </transition>
  -->
</template>

<script>
import VBtn from './VBtn'
export default {
  components: {
    VBtn
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    footer: {
      type: Array,
      default: () => []
    },
    popupType: {
      type: String,
      default: 'basic'
    },
    popupTextAlign: {
      type: String,
      default: 'left'
    },
    isShowClose: {
      type: Boolean,
      default: true
    },
    popHeight: {
      type: String,
      default: '15vh'
    },
    tmpVersion: {
      // TODO - 확정 팝업 확인 불가 - 임시 구분
      type: String,
      default: 'tmp2'
    },
    isClose: {
      type: Boolean,
      default: true,
      required: false
    }
  },

  data () {
    return {
      isOpen: false,
      footerBtn: {
        confirm: '확인',
        cancel: '취소',
        close: '닫기'
      }
    }
  },

  computed: {
    getWidthSize () {
      return this.width !== null ? `width: ${this.width}` : ''
    }
  },

  watch: {
    visible (newVisible, oldVisible) {
      console.log(oldVisible)
      this.isOpen = newVisible
      /*
      const bodyStyle = newVisible ? 'hidden' : 'visible'
      this.bodyFix(bodyStyle)
      */
    },

    isOpen (newValue) {
      if (!newValue) {
        this.onClose()
      }
    }
  },
  methods: {
    bodyFix (val) {
      document.querySelector('body').style.overflow = val
    },

    onClickBtn (value) {
      if (value === 'cancel' || value === 'close') {
        this.onClose()
        return
      }
      this.$emit(value)
    },

    onClose () {
      this.$emit('close')
    }
  }
}
</script>
