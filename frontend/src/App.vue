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
  background-color: cyan;
  position: relative;
}

#app img {
  max-width: 100vw;
}

nav {
  overflow: hidden;
  width: 100%;
  height: 50px;
  background-color: #7342FF;  
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
</style>
