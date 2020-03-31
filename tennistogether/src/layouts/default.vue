<template>
    <header-comp
        :data="menuList"
      />
    <router-view/>
</template>

<script>
import Header from '~/components/layout/Header'
import VTop from '~/components/common/VTop.vue'

export default {
  metaInfo () {
    return {
      title: 'TENNIS TOGETHER'
    }
  },
  name: 'Layout',

  components: {
    HeaderComp: Header,
    VTop
  },
  data: () => ({
    showMenu: true,
    showFav: false,
    showHeader: true
  }),

  methods: {
    async fetchData () {
      await Promise.all([...this.loadData()]).then(() => {
        this.$store.commit('setCurrMenuId', this.$route.path)
      })
    },
    loadData () {
      const uesrInfoPromise = this.$store.dispatch('loadUserInfo', { vm: this })
      const menuListPromise = this.$store.dispatch('loadMenuList', { vm: this })
      return [uesrInfoPromise, menuListPromise]
    },
    showMenuToggle: function () {
      this.showFav = false
      this.showMenu = !this.showMenu
    },

    showFavToggle: function () {
      this.showMenu = false
      this.showFav = !this.showFav
    }
  }
}
</script>
