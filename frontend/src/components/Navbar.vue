<template>
  <div class="navbar">
    <img class="navbar__img" src="../assets/images/logo.svg" alt="Groupomania logo">
    <nav>
      <router-link v-if="admin == true" to="/admin">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 2c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm6 12H8v-1.5c0-1.99 4-3 6-3s6 1.01 6 3V16z"></path></svg>
        <p>Admin</p>
      </router-link>

      <router-link to="/account">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="10" cy="8" r="4" fill="currentColor"></circle><path fill="currentColor" d="M10.67 13.02c-.22-.01-.44-.02-.67-.02c-2.42 0-4.68.67-6.61 1.82c-.88.52-1.39 1.5-1.39 2.53V20h9.26a6.963 6.963 0 0 1-.59-6.98zM20.75 16c0-.22-.03-.42-.06-.63l1.14-1.01l-1-1.73l-1.45.49c-.32-.27-.68-.48-1.08-.63L18 11h-2l-.3 1.49c-.4.15-.76.36-1.08.63l-1.45-.49l-1 1.73l1.14 1.01c-.03.21-.06.41-.06.63s.03.42.06.63l-1.14 1.01l1 1.73l1.45-.49c.32.27.68.48 1.08.63L16 21h2l.3-1.49c.4-.15.76-.36 1.08-.63l1.45.49l1-1.73l-1.14-1.01c.03-.21.06-.41.06-.63zM17 18c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"></path></svg>
        <p>Profil</p>
      </router-link> 

      <button @click.prevent="disconnect" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--icomoon-free" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M10 2.29v2.124c.566.247 1.086.6 1.536 1.05C12.48 6.408 13 7.664 13 9s-.52 2.591-1.464 3.536C10.592 13.48 9.336 14 8 14s-2.591-.52-3.536-1.464C3.52 11.592 3 10.336 3 9s.52-2.591 1.464-3.536c.45-.45.97-.803 1.536-1.05V2.29a7 7 0 1 0 4 0zM7 0h2v8H7z"></path></svg>
        <p>log off</p>
      </button>
    </nav>
  </div>
</template>


<script>

  export default {
    name: 'Navbar',

    data() {
      return{
        admin: localStorage.getItem("admin"),
      }
    },
    methods: {
      disconnect() {
        localStorage.clear();
        this.$router.push("/");
      }
    }
  }
</script>


<style  scoped lang="scss">
  .navbar{
    width:100%;
    height:auto;
    display:flex;
    justify-content: space-around;
    align-items:center;
    border-radius:0 0 20px 20px;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:9999;
    background-color:white;
    &__img {
      width:30%;
    }
    nav{
      height:100px;
      width:60%;
      display:flex;
      flex-flow: row wrap;
      align-items:center;
      justify-content: space-around;
      svg {
        width:24px;
        height:24px;
        margin-right:10px;
      }
      a {
        display:flex;
        align-items:center;
        justify-content: center;
        font-size: 16px;
        color:rgb(35,50,75);
        text-decoration: none;
        &:hover {
          color:rgb(214,26,13);
        }
      }
      button {
        padding:0;
        display:flex;
        align-items:center;
        justify-content: center;
        font-size: 18px;
        color:rgb(35,50,75);
        background-color: rgba(208, 208, 208, 0.001);
        border: none;
        svg {
          margin-right:10px;
        }
        &:hover {
          cursor:pointer;
          color:rgb(214,26,13);
        }

      }
    }
  } 
  @media screen and (max-width:768px){
    .navbar {
      &__img {
        width:40%;
        //height:80%;
      }
      nav {
        width:40%;
        p {
        display:none;
      }
        svg {
          margin:0;
          width:22px;
          height:22px;
        }
        button {
          border:none;
          margin:0;
          svg {
            margin:0;
          }
        }
      }
    } 
  }
  @media screen and (max-width:375px) {
    .navbar {
      flex-direction: column;
      &__img {
        width:70%;
        margin:0 0 0 0;
      }
      nav {
        width:90%;
        height:50px;
        margin-top:20px;
        justify-content: space-around;
      }
    }
  }
</style>
