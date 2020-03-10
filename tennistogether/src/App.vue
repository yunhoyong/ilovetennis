
<template>
  <div id="app">
        <h1>Hello App!</h1>
        <p>
          <!-- 네비게이션을 위해 router-link 컴포넌트를 사용합니다. -->
          <!-- 구체적인 속성은 `to` prop을 이용합니다. -->
          <!-- 기본적으로 `<router-link>`는 `<a>` 태그로 렌더링됩니다.-->
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