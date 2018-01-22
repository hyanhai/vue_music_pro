<template>
  <div id="app">
    <home_menu></home_menu>
    <router-view/>
  </div>
</template>

<script>
import home_menu from "./components/home_menu"
import homelist from "./components/homelist"
export default {
  name: 'app',
  components:{
    home_menu,homelist
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
