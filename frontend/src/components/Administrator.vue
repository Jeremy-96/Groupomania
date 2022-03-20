<template>
  <div class="bloc">
    <div v-for="(user, i) in users" :key="i" id="users" class="users">
       <article class="user">
        <div class="user__firstname">
          <h4 class="firstname">First name :</h4>
          <em>{{ user.firstname }}</em>
        </div>
        <div class="user__lastname">
          <h4 class="lastname">Last name :</h4>
          <em>{{ user.lastname }}</em>
        </div>
        <div class="user__email">
          <h4 class="email">Email :</h4>
          <em>{{ user.email }}</em>
        </div>
        <button  @click.prevent="deleteAccount" class="user__btn">Delete</button>
      </article> 
    </div>
  </div>
</template>


<script>
  import axios from 'axios'

  export default  {
    name: 'Administrator',

    data() {
      return{
        users: [],
        user: {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          admin: localStorage.getItem("admin"),
          password:"",
        }
      }
    },

    created() {
      axios
        .get(`http://localhost:3000/api/auth/${this.user.id}/users`,{
          headers: {
            "Authorization": `Bearer ${this.user.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },

    methods: {
      deleteAccount() {
        axios
          .delete(`http://localhost:3000/api/auth/${this.userAdmin.id}/users/${this.user.id}`, {
            headers: {
              "Authorization" : "Bearer " + this.token,
            },
          })
          .then(() => {
            alert("Account deleted");
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>


<style lang="scss">
 .bloc {
    width:100%;
    height:auto;
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items:center;
    .users {
      width:90%;
      height:100px;
      margin:25px 0 25px 0;
      display:flex;
      justify-content: space-around;
      align-items:center;
      border-bottom:2px solid rgb(35,50,75);
      color:rgb(35,50,75);
      .user {
        width:100%;
        display:flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items:center;
        h4 {
          width:40%;
          border-bottom: 2px solid rgba(214,26,13);
        }
        &__firstname {
          width:25%;
          height:90%;
          border-right:1px solid rgb(35,50,75);
        }
        &__lastname {
          width:25%;
          height:90%;
          border-right:1px solid rgb(35,50,75);
        }
        &__email {
          width:25%;
          height:90%;
          border-right:1px solid rgb(35,50,75);
        }
        &__btn {
          width:15%;
          height:50%;
          border:none;
          border-radius:20px;
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
  }
</style>
