<template>
  <div class="profil">
    <h3 class="profil__title">Your information :</h3>

    <div class="profil__information">
      <div class="profil__information__firstname">
        <h4>First name :</h4>
        <p><em>{{ this.user.firstname }}</em></p>
      </div>

      <div class="profil__information__lastname">
        <h4>Last name :</h4>
        <p><em>{{ this.user.lastname }}</em></p>
      </div>

      <div class="profil__information__email">
        <h4>Email :</h4>
        <p><em>{{ this.user.email }}</em></p>
      </div>
    </div>

    <div class="profil__delete">
      <p>Do you want delete your account ?</p>
      <button @click.prevent="deleteAccount" class="profil__delete__btn">Delete account</button>
    </div>

  </div>
</template>


<script>
  import axios from 'axios'


  export default {
    name: 'Profil',

    data() {
      return{
        user: {
          id: localStorage.getItem("userId"),
          admin: localStorage.getItem("admin"),
          firstname: "",
          lastname:"",
          email:"",
        },
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
      };
    },

    async created() {
      await axios
        .get(`http://localhost:3000/api/auth/${this.userId}`, {
          headers: {
            Authorization: 'Bearer ' + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.user = response.data[0];
          console.log(this.user);
        })
        .catch((error) => {
          console.log(error);
        })
    },

    methods: {
      deleteAccount() {
        axios
          .delete(`http://localhost:3000/api/auth/${this.userId}`, {
            headers: {
              "Authorization" : "Bearer " + this.token,
            },
          })
          .then(() => {
            alert("Your account was deleted");
            localStorage.clear();
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
    
</script>


<style lang="scss">
  .profil {
    width:100%;
    height:700px;
    display:flex;
    flex-direction: column;
    align-items: center;
    &__title {
      width:90%;
      height:10%;
      display:flex;
      align-items:center;
      justify-content: center;
      color:rgb(35,50,75);
    }
    &__information {
      display:flex;
      flex-direction:column;   
      justify-content: space-around;
      width:90%;
      height:80%;
      font-size:20px;
      &__firstname {
        width:100%;
        height:25%;
        background-color:rgba(214,26,13, 0.2);
        border-radius:20px;
      }
      &__lastname {
        width:100%;
        height:25%;
        background-color:rgba(214,26,13, 0.2);
        border-radius:20px;
      }
      &__email {
        width:100%;
        height:25%;
        background-color:rgba(214,26,13, 0.2);
        border-radius:20px;
      }
      h4 {
        width:90%;
        margin-left:20px;
        color:rgb(35,50,75);
        border-bottom: 2px solid rgba(214,26,13);
      }
      p {
        margin-left:40px;
        color:rgb(35,50,75);
      }
    }
    &__delete {
      width:90%;
      height:15%;
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      p{
        height:20%;
      }
      &__btn {
        width:30%;
        height:70%;
        border:none;
        border-radius:35px;
        font-size:18px;
        color:white;
        background-color:rgb(214,26,13);
        &:hover {
          cursor:pointer;
          background-color:rgba(214,26,13, 0.5);
          border:2px solid rgb(35,50,75);
          font-weight: bolder;
          color: rgb(35,50,75);
        }
      }
    }
  }
</style>