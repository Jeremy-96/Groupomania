<template>
  <div class="navbar">
    <img class="navbar__img" src="../assets/images/logo.svg" alt="Groupomania logo">
    <nav>
      <router-link v-if="admin == true" to="/admin">Admin</router-link>
      <router-link to="/account">Profil</router-link> 
      <button @click.prevent="disconnect" type="button">Disconnect</button>
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


<style lang="scss">
  .navbar{
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
      button {
        cursor:pointer;
        font-size: 18px;
        color:rgb(35,50,75);
        background-color: rgba(208, 208, 208, 0.001);
        border: none;
        &:hover {
          color:rgb(214,26,13);
          border-bottom: 2px solid rgb(35,50,75);
        }

      }
    }
  }

</style>
