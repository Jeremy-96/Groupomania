<template>
  <div class="bloc">
    <div v-for="(user, i) in users" :key="i" id="users" class="users">
       <article class="user">
         <div class="user__id">
          <h4>Id</h4>
          <em>{{ user._id }}</em>
        </div>
        <div class="user__infos">
          <h4>Names</h4>
          <div class="user__infos__names">
            {{ user.lastname }}
            <em>, {{ user.firstname }}</em>
          </div>
        </div>
        <div class="user__email">
          <h4>Email</h4>
          <em>{{ user.email }}</em>
        </div>
        <button @click.prevent="deleteAccount(user._id)" class="user__btn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"></path><path fill="currentColor" d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32ZM192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416ZM272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"></path></svg>
          <p>Delete</p>
        </button>
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
        userId: localStorage.getItem("userId"),
        users: [],
        userAdmin: {
          token: localStorage.getItem("token"),
          admin: localStorage.getItem("admin"),
        }
      }
    },

    created() {
      axios
        .get(`http://localhost:3000/api/auth/${this.userId}/users`,{
          headers: {
            "Authorization": `Bearer ${this.userAdmin.token}`,
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
      deleteAccount(idUser) {
        axios
          .delete(`http://localhost:3000/api/auth/${idUser}`, {
            headers: {
              "Authorization": `Bearer ${this.userAdmin.token}`,
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            console.log(response);
            alert(`User nr ${idUser} deleted !`)
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>


<style scoped lang="scss">
 .bloc {
    width:100%;
    height:auto;
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items:center;
    .users {
      width:90%;
      height:auto;
      margin:0px 0 50px 0;
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
          text-align:center;
          width:50%;
          box-shadow: 0 0 0.5rem rgb(214 26 13 / 75%);
          position: relative;
          z-index: 1000;
          border-radius:10px;
        }
        &__id {
          width:10%;
          display:flex;
          align-items:center;
          justify-content: center;
          flex-direction:column;
        }
        &__infos {
          width:30%;
          height:90%;
          display:flex;
          align-items:center;
          justify-content: center;
          flex-direction:column;
          &__names {
            display:flex;
            flex-wrap:wrap;
          }
        }
        &__email {
          width:20%;
          height:90%;
          display:flex;
          align-items:center;
          justify-content: center;
          flex-direction:column;
        }
        &__btn {
          width:15%;
          height:40px;
          padding:0;
          margin:30px 0 30px 0;
          display:flex;
          align-items:center;
          justify-content: center;
          border:none;
          border-radius:20px;
          color:white;
          background-color:rgb(214,26,13);
          svg {
            width:20px;
            height:20px;
            margin-right:10px;
          }
          p {
            font-size:14px;
          }
          &:hover {
            cursor:pointer;
            color:rgb(214,26,13);
            background-color:rgba(214,26,13, 0.01);
            border:2px solid rgb(214,26,13);
          }
        }
      }
    }
  }
  @media screen and (max-width:768px) {
    .bloc {
      .users {
        .user {
          &__id {
          width:10%;
          }
          &__infos {
            width:50%;
          }
          &__email {
            width:40%;
            border:0;
          }
          &__btn {
            width:100%;
            height:30px;
            margin:30px 0 30px 0;
          }
        }
      }
    }
  }
  @media screen and (max-width:375px) {
    .bloc {
      .users {
        flex-direction:column;
        .user {
          align-items:center;
          justify-content:center;
          h4 {
            text-align:center;
          }
          &__id {
            order:1;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            width:100%;
            border:0;
          }
          &__infos {
            order:3;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            width:100%;
            border:0;
          }
          &__email {
            order:2;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            width:100%;
          }
          &__btn {
            order:4;
            p {
              display:none;
            }
          }
        }
      }
    }
  }
</style>
