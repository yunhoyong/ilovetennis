<template>
  <el-container>
    <el-main>
      guide
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
