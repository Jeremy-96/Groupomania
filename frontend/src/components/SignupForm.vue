<template>
  <div class="signup">
    <img class="signup__img" src="../assets/images/logo.svg" alt="Groupomania logo" />

    <nav class="signup__nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </nav>

    <form class="signup__form"> 
      
      <h2 class="signup__form__title">Would you like to create an account ?</h2>

      <div class="signup__form__input">
        <label for="firstname"></label>
        <input type="text" v-model="firstname" id="firstname" placeholder="First name" required>
      </div>

      <div class="signup__form__input">
        <label for="lastname"></label>
        <input type="text" v-model="lastname" id="lastname" placeholder="Last name" required>
      </div>

      <div class="signup__form__input">
        <label for="email"></label>
        <input type="email" v-model="email" id="email" placeholder="Email" required>
      </div>

      <div class="signup__form__input">
        <label for="password"></label>
        <input type="password" v-model="password" id="password" placeholder="Password" required>
      </div>

      <button  class="signup__form__btn" @click.prevent="signup" type="button">Create account !</button>

    </form>

  </div>
</template>


<script>
  import axios from 'axios';
  export default {
      
      name: 'SignupForm',

      data() {
        return{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          msg:  "",
        }
      },

      methods: {
        signup() {
          const payload = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
          }
          axios
            .post('http://localhost:3000/api/auth/signup', payload)
            .then(res => {
              let data = res.data;
              this.data = alert(
              "User " + data.firstname + " was registered !"
              );
              window.location.href='/'
            })
            .catch(error => {
              console.log('Error: User not created' + error)
            })
          
        }
      }
  }      
</script>


<style scoped lang="scss">
.signup {
  max-width:600px;
  height:800px;
  display:flex;
  flex-flow: column wrap;
  align-items:center;
  justify-content: space-around;
  border-radius:20px;
  background-color:rgb(255, 255, 255);
  &__img {
    display:flex;
    flex-wrap: wrap;
    width:90%;
    height:20%;
  }
  &__nav {
    display:flex;
    align-items: center;
    justify-content: center;
    width:90%;
    height:10%;
    a {
      font-size: 22px;
      font-weight: bold;
      color:rgb(0, 0, 0);
      text-decoration: none;
      &.router-link-exact-active {
        color: rgb(196,58,72);
      }
    }
  }
  &__form {
    width:90%;
    height:65%;
    display:flex;
    flex-flow:column wrap;
    align-items:center;
    justify-content:space-between;
    &__title {
      width:100%;
      height:15%;
      margin:0;
      display:flex;
      align-items:center;
      justify-content:center;
      color: rgb(80, 80, 80);
    }
    &__input {
      width:100%;
      height:12%;
      display:flex;
      align-items:center;
      justify-content:center;
      input {
        width:100%;
        height:100%;
        padding:0;
        text-align: center;;
        border-radius:15px;
        font-size: 20px;
      }
    }
    &__btn {
      width:100%;
      height:12%;
      display:flex;
      align-items:center;
      justify-content: center;
      flex-wrap: wrap;
      border-radius:15px;
      font-size: 20px;
      background-color: rgb(196,58,72);
      color: white;
      &:hover {
        cursor:pointer;
        color:black;
        background-color:rgba(196,58,72, .6);
        border:2px solid black;
      }
    }
  }
}
</style>