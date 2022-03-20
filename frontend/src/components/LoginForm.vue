<template>
  <div class="login">
    
    <img class="login__img" src="../assets/images/logo.svg" alt="Groupomania logo" />

    <form class="login__form"> 

      <div class="login__form__input">
        <label for="email"></label>
        <input type="text" v-model="email" id="email" placeholder="Email" required>
      </div>

      <div class="login__form__input">
        <label for="password"></label>
        <input type="password" v-model="password" id="password" placeholder="Password" required>
      </div>

      <button class="login__form__btn" @click.prevent="login" type="submit" accesskey="enter">Connect</button>

      <div v-if="error" role="alert" class="login__form__alert">
        <em> {{ error  }} </em>
      </div>

    </form>

    <nav class="login__nav">
      <p><em>No account ?</em> <router-link to="/signup">Signup</router-link></p>
    </nav>
  </div>
</template>


<script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',

    data() {
        return{
          email: "",
          password: "",
          error:  "",
        }
      },

    methods: {
      login() {
        const payload = {
            email: this.email,
            password: this.password
        }
        axios
          .post('http://localhost:3000/api/auth/login', payload)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("admin", res.data.admin);
            this.$router.push("/posts");
          })
          .catch(() => {
            (this.error = "Please fill in the fields !")
          })
        }
      }
    }
  
</script>

<style scoped lang="scss">
.login {
  padding:0;
  margin:0;
  max-width:500px;
  height:800px;
  display:flex;
  flex-flow: column wrap;
  align-items:center;
  justify-content: space-around;
  border:3px solid;
  border-color: rgb(35,50,75);
  border-radius:25px;
  &__img {
    width:90%;
    height:30%;
  }
  &__form {
    width:90%;
    height:50%;
    display:flex;
    flex-flow:column wrap;
    align-items:center;
    justify-content:space-between;
    &__input {
      width:100%;
      height:12.5%;
      display:flex;
      align-items:center;
      justify-content:center;
      input {
        width:100%;
        height:100%;
        padding:0;
        text-align: center;
        color: rgb(35,50,75);
        background-color:rgba(208, 208, 208, 0);
        border:none;
        border-bottom: 2px solid;
        border-color:rgb(35,50,75);
        font-size: 20px;
        &:focus {
          outline:none;
        }
        &:focus::placeholder {
          color:transparent;
        }
      }
    }
    &__btn {
      width:100%;
      height:15%;
      margin-top:30px;
      display:flex;
      align-items:center;
      justify-content: center;
      flex-wrap: wrap;
      border-radius:15px;
      font-size: 20px;
      background-color: rgb(35,50,75);
      border:none;
      color: white;
      &:hover {
        cursor:pointer;
        background-color:rgb(214,26,13);
        transform:scale(1.05);
      }
    }
    &__alert {
      background-color:rgba(214,26,13, 0.1);
      border-top: 1px solid red;
      border-bottom: 1px solid red;
      color:rgb(214,26,13);
      font-weight:bold;
      font-size:20px;
    }
  }
  &__nav {
    display:flex;
    align-items: center;
    justify-content: center;
    width:90%;
    height:10%;
    p {
      font-size:18px;
    }
    a {
      font-size: 18px;
      font-weight: bold;
      color:rgb(214, 26, 13);
      text-decoration: none;
      &:hover {
        color: rgb(35,50,75);
      }
    }
  }
}
</style>