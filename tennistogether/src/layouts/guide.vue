<template>
  <el-container>
    <el-main>
      <p>This is a guid layout</p>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {

  },

  computed: {
    ...mapGetters({
      // menuList: 'menuList'
    })
  }
}
</script>
