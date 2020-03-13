
<template>
  <div id="app">
        <h1>Hello App!</h1>
        
        <p>
          <router-link to="/bar">Go to Bar</router-link>
        </p>
        <p>
          <router-link to="/foo">Go to Foo</router-link>
        </p>
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

<script>