<template>
  <div class="nav">
    <img class="nav__img" src="../assets/images/logo.svg" alt="Groupomania logo">
    <nav>
      <router-link to="/posts">Home</router-link> 
    </nav>
  </div>
</template>


<script>

  export default {
    name: 'Nav',
  }
</script>


<style lang="scss">
  .nav{
    width:1200px;
    height:100px;
    margin:0 0 30px 0;
    display:flex;
    justify-content: space-between;
    align-items:center;
    border-bottom:2px solid rgb(35,50,75);
    &__img {
      margin-left:30px;
      width:30%;
      height:90%;
    }
    nav{
      height:90%;
      width:40%;
      display:flex;
      flex-flow: row wrap;
      align-items:center;
      justify-content: space-evenly;
      a {
        font-size: 18px;
        color:rgb(35,50,75);
        text-decoration: none;
        &:hover {
          color:rgb(214,26,13);
          border-bottom: 2px solid rgb(35,50,75);
        }
      }
    }
  }

</style>
