<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter/>
      </div>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from '~/components/layout/TheSidebar'
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'

export default {
  metaInfo () {
    return {
      title: 'I LOVE TENNIS'
    }
  },
  name: 'Layout',

  components: {
    TheHeader,
    TheFooter,
    TheSidebar
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
