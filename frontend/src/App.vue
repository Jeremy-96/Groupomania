<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<style lang="scss">
body{
  display:flex;
  align-items:center;
  justify-content: center;
  background-color:rgba(208, 208, 208, 0.2);
  #app {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif, Helvetica, Arial, sans-serif;
  }
}
</style>
