<template>
    <router-view/>
</template>

<script>
export default {
  metaInfo () {
    const $this = this
    return {
      title: $this.currentMenu.menuName || '임직원 차량구매 지원시스템'
    }
  },
  name: 'Layout',

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
