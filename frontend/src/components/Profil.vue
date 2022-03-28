<template>
  <div class="bloc">
    <div id="users" class="users">
       <article class="user">
        <div class="user__firstname">
          <h4 class="firstname">First name :</h4>
          <em>{{ this.user.firstname }}</em> 
        </div>
        <div class="user__lastname">
          <h4 class="lastname">Last name :</h4>
          <em>{{ this.user.lastname }}</em> 
        </div>
        <div class="user__email">
          <h4 class="email">Email :</h4>
          <em>{{ this.user.email }}</em>
        </div>
        <div class="user__btn">
          <button @click.prevent="deleteAccount" class="user__btn__delete">Delete</button>
        </div>
      </article> 
    </div>

    <form class="update">
      <div class="update__firstname">
        <label for="firstname"></label>
        <input type="text" class="update__firstname__input" v-model="firstname" id="firstname" placeholder="New first name">
      </div>
        
      <div class="update__lastname">
        <label for="lastname"></label>
        <input type="text" class="update__lastname__input" v-model="lastname" id="lastname" placeholder="New last name">
      </div>

      <button type="submit" @click.prevent="updateAccount" class="update__btn">Update</button>
    </form>
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
        firstname:"",
        lastname:""
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
      },

      updateAccount() {
        console.log(payload);
        const payload = {
          firstname: this.firstname,
          lastname:this.lastname
        }
        console.log(payload);
        
        axios
          .put(`http://localhost:3000/api/auth/${this.userId}`, payload, {
            headers: {
              "Authorization": `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data"
            },
          })
          .then(() => {
            console.log({payload});
            alert("Your informations has changed");
            //window.location.reload();
            
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
          padding:0;
          width:20%;
          height:90%;
          display:flex;
          align-items:center;
          justify-content: space-around;
          flex-direction:column;
          &__update {
            width:100%;
            height:40px;
            margin-bottom:5px;
            border:none;
            border-radius:20px;
            background-color:rgb(35,50,75);
            color:white;
            &:hover {
              cursor:pointer;
              background-color:rgba(35,50,75, 0.01);
              color:rgb(35,50,75);
              border:2px solid rgb(35,50,75);
            }
          }
          &__delete {
            width:100%;
            height:40px;
            margin-top:5px;
            border:none;
            border-radius:20px;
            background-color:rgb(214,26,13);
            color:white;
            &:hover {
              cursor:pointer;
              border:2px solid rgb(214,26,13);
              font-weight:bold;
              background-color:rgba(35,50,75, 0.01);
              color:rgb(214,26,13);
            }
          }
          
        }
      }
    }
  }

</style>