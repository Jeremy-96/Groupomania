<template>
  <div class="nav">
    <img class="nav__img" src="../assets/images/logo.svg" alt="Groupomania logo">
    <router-link class="nav__link" to="/posts">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ri"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454l-6 5.454V19z"></path></svg>
    <p>Home</p>
    </router-link> 
  </div>
</template>


<script>

  export default {
    name: 'Nav',
  }
</script>


<style lang="scss">
  .nav{
    width:100%;
    margin:0 0 50px 0;
    display:flex;
    justify-content: space-around;
    align-items:center;
    border-radius:0 0 20px 20px;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);
    z-index: 9999;
    position: fixed;
    top:0;
    left:0;
    right:0;
    background-color:white;
    &__img {
      width:30%;
      height:90px;
    }
    &__link {
      width:60%;
      height:100px;
      display:flex;
      align-items:center;
      justify-content: flex-end;
      font-size: 18px;
      color:rgb(35,50,75);
      text-decoration: none;
      svg {
        width:24px;
        height:24px;
        margin-right:10px;
      }
      &:hover {
        color:rgb(214,26,13);
      }
    }
  }
  @media screen and (max-width:768px) {
    .nav {
      &__img {
        width:40%;
      }
      &__link {
        width:40%;
        svg {
          width:22px;
          height:22px;
          margin:0;
        }
        p {
          display:none;
        }
      }
    }
  }
  @media screen and (max-width:375px) {
    .nav {
      flex-direction:column;
      &__img {
        width:70%;
      }
      &__link {
        justify-content: center;
        width:90%;
        height:50px;
      }
    }
  }

</style>
