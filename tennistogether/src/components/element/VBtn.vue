<template>
  <a
    v-if="linkType === 'link'"
    class="btn"
    :href="linkData"
    :class="[bSize, bType, bColor, active, iName, iSize, iColor, iAlign]"
    :disabled="disabled"
    :target="target"
  >
    <span>
      <slot />
      <em
        v-if="msg"
        class="sub"
      >{{ msg }}</em>
    </span>
  </a>

  <n-link
    v-else-if="linkType === 'nlink'"
    class="btn"
    to="/"
    :class="[bSize, bType, bColor, active, iName, iSize, iColor, iAlign]"
    :disabled="disabled"
    :target="target"
  >
    <span>
      <slot />
      <em
        v-if="msg"
        class="sub"
      >{{ msg }}</em>
    </span>
  </n-link>

  <button
    v-else-if="type === 'button'"
    class="btn"
    :type="type"
    :class="[bSize, bType, bColor, active, iName, iSize, iColor, iAlign, iconClass]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span>
      <slot />
      <em
        v-if="msg"
        class="sub"
      >{{ msg }}</em>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    // eslint-disable-next-line
    link: [String, Object],
    target: {
      type: String,
      default: null
    },
    bTitle: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    bSize: {
      type: String,
      default: ''
    },
    bType: {
      type: String,
      default: ''
    },
    bColor: {
      type: String,
      default: ''
    },
    iName: {
      type: String,
      default: ''
    },
    iColor: {
      type: String,
      default: ''
    },
    iSize: {
      type: String,
      default: ''
    },
    iAlign: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    iconClass () {
      return this.icon ? `el-input__icon ${this.icon}` : ''
    },

    linkData () {
      return this.link ? (typeof this.link === 'object' ? { ...this.link } : this.link) : null
    },

    linkType () {
      const linkType = typeof this.link
      return this.type === 'button' ? this.type : linkType === 'string' ? 'link' : 'nlink'
    }
  },

  methods: {
    handleClick (e) {
      if (this.type === 'submit') {
        e.preventDefault()
      }
      this.$emit('click', e)
    }
  }
}
</script>
