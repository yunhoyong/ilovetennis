<template>
  <el-pagination
    :class="pageType"
    :layout="layout"
    :total="parseInt(total)"
    :page-size="parseInt(size)"
    :current-page="parseInt(page)"
    @current-change="onPageChange"
  />
</template>

<script>
export default {
  props: {
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    page: {
      type: [Number, String],
      default: 1
    },
    size: {
      type: [Number, String],
      default: 10
    },
    total: {
      type: [Number, String],
      default: null
    },
    pageType: {
      type: String,
      default: ''
    }
  },

  data () {
    return {}
  },

  methods: {
    onPageChange (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/style/common/mixin.scss';
@import '~/assets/style/common/var.scss';
</style>
