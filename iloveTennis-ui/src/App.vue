
<template>
  <div id="app">
        <!-- 라우트 아울렛 -->
        <!-- 현재 라우트에 맞는 컴포넌트가 렌더링됩니다. -->
        <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
<script>
