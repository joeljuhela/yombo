<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 450px;
  height: 95vh;
  max-height: 900px;
  margin: auto;
  position: relative;
}

#app img {
  max-width: 100vw;
}

nav {
  overflow: hidden;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.body-wrap {
  min-height: 100vh;
  background: linear-gradient(rgba(115,66,255, 0.4), rgba(255, 36, 220, 0.4))
}
</style>
