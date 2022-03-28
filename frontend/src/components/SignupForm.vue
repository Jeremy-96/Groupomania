<template>
  <div class="signup">
    <img class="signup__img" src="../assets/images/logo.svg" alt="Groupomania logo" />

    <form class="signup__form"> 

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

      <button  class="signup__form__btn" @click.prevent="signup" type="button" accesskey="enter">Create account !</button>
      
      <div v-if="error" role="alert" class="signup__form__alert">
        <em>{{ error  }}</em>
      </div>

    </form>

    <nav class="signup__nav">
      <p><em>Already have an account ?</em> <router-link to="/">Login</router-link></p>
    </nav>

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
          error:  "",
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
          if(
            this.firstname != "" ||
            this.lastname != "" ||
            this.email != "" ||
            this.password != ""
          )
          axios
            .post('http://localhost:3000/api/auth/signup', payload)
            .then(() => {
              alert("Your account was created");
              this.$router.push("/");
            })
            .catch(() => {
              (this.error = "Please fill in the fields !");
            } )
        }
      }
  }      
</script>


<style scoped lang="scss">
  .signup {
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
        font-size:bold;
        font-size:20px;
      }
      &__info {
        background-color:rgba(58, 238, 142, 0.1);
        border-top: 1px solid green;
        border-bottom: 1px solid green;
        color:green;
        font-size:bold;
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
        color:rgb(214,26,13);
        text-decoration: none;
      }
    }
  }
</style>