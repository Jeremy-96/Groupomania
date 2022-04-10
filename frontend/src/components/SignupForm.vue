<template>
  <div class="bloc">
    <div class="signup">
      <img class="signup__img" src="../assets/images/logo.svg" alt="Groupomania logo" />

      <form class="signup__form"> 

        <div class="signup__form__input">
          <label for="firstname">First name :</label>
          <input type="text" v-model="firstname" id="firstname" placeholder="First name" required>
        </div>

        <div class="signup__form__input">
          <label for="lastname"> Last name :</label>
          <input type="text" v-model="lastname" id="lastname" placeholder="Last name" required>
        </div>

        <div class="signup__form__input">
          <label for="email">Email :</label>
          <input type="email" v-model="email" id="email" placeholder="Email" required>
        </div>

        <div class="signup__form__input">
          <label for="password">Password :</label>
          <input type="password" v-model="password" id="password" placeholder="Password" required>
        </div>

        <button  class="signup__form__btn" @click.prevent="signup" type="button">Create account !</button>
        
        <div v-if="error" role="alert" class="signup__form__alert">
          <em>{{ error  }}</em>
        </div>

      </form>

      <nav class="signup__nav">
        <p><em>Already have an account ?</em> <router-link to="/">Login</router-link></p>
      </nav>

    </div>
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
            })
            .catch(() => {
              (this.error = "Please fill in the fields !");
            } )
        }
      }
  }      
</script>


<style scoped lang="scss">
  .bloc {
    width:100%;
    display:flex;
    align-items:center;
    justify-content: center;
    .signup {
      max-width:800px;
      height:800px;
      display:flex;
      flex-flow: column wrap;
      align-items:center;
      justify-content: space-around;
      border-radius:25px;
      box-shadow: 0 0 0.5rem  rgb(0 0 0 / 25%);
      position: relative;
      z-index: 1000;
      &__img {
        width:90%;
      }
      &__form {
        width:90%;
        height:50%;
        display:flex;
        flex-flow:column wrap;
        align-items:center;
        justify-content:space-between;
        label {
          display:none;
        }
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
  }
  @media screen and (max-width:768px) {
    .signup {
       border:0;
       &__form {
         height:55%;
       }
    }
  }
  @media screen and (max-width:375px) {
    .signup {
      height:700px;
      &__form {
        height:60%;
        &__input {
          input {
            font-size:16px;
          }
        }
        &__btn {
          font-size:16px;
        }
      }
      &__nav {
        p, a{
          font-size:14px;
        }
      }
    }
  }
</style>