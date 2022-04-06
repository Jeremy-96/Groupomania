<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<style lang="scss">
  html {
    height:100%;
  }
  body {
    width:100%;
    min-height:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    margin:0;
    padding-top:150px;
    padding-bottom:150px;
    box-sizing: border-box;
    #app {
      width:1500px;
      height:100%;
      font-family: Arial, Helvetica, sans-serif, Helvetica, Arial, sans-serif;
      position:relative;
    }
  }

  

</style>
