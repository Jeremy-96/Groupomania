<template>
  <div class="content">
    <h2 class="onepost">Post</h2>
    <div>
      <article v-for="(post, key) in posts" :key="key" class="post">
        <div class="post__infos">
          <div class="post__infos__id">
            {{ post._id }} :
          </div>

          <div class="post__infos__title">
            <em>{{ post.title }}</em>
          </div>
        </div>

        <div class="post__img">
          <img v-if="post.imageUrl" :src="post.imageUrl" alt="Image of the post">
        </div>

        <div class="post__content">
          {{ post.content }}
        </div>

        <div class="post__btn">
          <button v-if="user.admin == 1 || userId == post.userId" @click.prevent="deletePost(post._id)" class="post__btn__delete">Delete</button>
          <button v-if="userId == post.userId" @click.prevent="updatePost" class="post__btn__update">Update</button>
        </div>
        
        <form class="post__comment">
          <label for="content"></label>
          <input class="post__comment__input"  id="content" type="text" v-model="content" placeholder="Type your comment :">
            
          <button @click.prevent="commentPost" class="post__comment__btn">Comment</button>
        </form>
      </article>
    </div>
</div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: 'OnePost',

    data() {
      return {
        userId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
        user: {
          id: localStorage.getItem("userId"),
          admin: localStorage.getItem("admin")
        },
        users:[],
        post: {},
        posts: [],
        comments:[],
        imagePreview: null,
        postId: localStorage.getItem("postId"),
        content: "",
      }
    },
    async created() {
      await axios
        .get(`http://localhost:3000/api/auth/${this.user.id}/users`, {
          headers:{
            "Authorization": `Bearer ${this.token}`,
          }
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    
      await axios
        .get(`http://localhost:3000/api/posts/${this.postId}`, {
          headers: {
            "Authorization": `Bearer ${this.token}`,
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    methods: {
      async deletePost(idPost) {
        await axios
          .delete(`http://localhost:3000/api/posts/${idPost}`, {
            headers: {
              "Authorization": `Bearer ${this.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(() => {
            alert('WARNING: This post will be deleted !')
            this.$router.push("/posts");
          })
          .catch((error) => {
            console.log(error);
          })
      },

      commentPost() {
        const payload = {
          userId: parseInt(this.userId),
          postId: parseInt(this.postId),
          content: this.content
        }
        if(this.content != "") {
          axios
            .post(`http://localhost:3000/api/comments`, payload, {
              headers: {
                "Authorization": `Bearer  ${this.token}`,
                "Content-Type": "application/json"
              }
            })
            .then(() => {
              alert("This post has commented");
              window.location.reload();
              console.log(payload);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width:1200px;
    height:auto;
    .onepost {
      width:100%;
      height:50px;
    }
    .post {
    padding:0;
    margin:0 0 30px 0;
    width:100%;
    border-radius:20px;
    display:flex;
    justify-content: space-around;
    flex-wrap:wrap;
    align-items:center;
    background-color:rgba(35,50,75, 0.1);
      &__infos {
        width:100%;
        height:40px;
        margin:0 0 25px 0;
        border-radius: 20px 20px 0 0;
        border-bottom:2px solid rgb(35,50,75);
        display:flex;
        align-items:center;
        justify-content: space-around;
        background-color:rgba(35,50,75, 0.1);
        &__id {
          width:15%;
          text-align:center;
          font-weight:bold;
          color:rgb(214,26,13);
        }
        &__title {
          width:80%;
          font-weight:bold;
          color:rgb(35,50,75);
        }
      }
      &__img {
        width:15%;
        height:100px;
        display:flex;
        align-items:center;
        justify-content: center;
        img {
          width:100%;
          height:100%;
          border-radius:20px;
        }
      }
      &__content {
        width:80%;
        height:100px;
        display:flex;
        align-items:center;
        justify-content: center;
        border-radius:20px;
        font-size:20px;
        color:rgb(35,50,75);
        background-color:rgba(35,50,75, 0.1);
      }
      &__btn {
        width:100%;
        margin:30px 0 30px 0;
        display:flex;
        align-items:center;
        justify-content: space-around;
        border-radius:20px;
        &__delete {
          width:30%;
          height:40px;
          border-radius:20px;
          border:none;
          font-size:18px;
          background-color: rgb(214,26,13);
          color:white;
          &:hover {
            cursor:pointer;
            color:rgb(214,26,13);
            background-color:rgba(35,50,75, 0.1);
            border:2px solid rgb(214,26,13);
          }
        }
        &__update {
          width:30%;
          height:40px;
          border-radius:20px;
          border:none;
          font-size:18px;
          background-color:rgb(35,50,75);
          color:white;
          &:hover {
            cursor:pointer;
            color:rgb(35,50,75);
            background-color:rgba(35,50,75, 0.1);
            border:2px solid rgb(35,50,75);
          }
        }
      }
      &__comment {
        padding:0;
        width:100%;
        height:40px;
        display:flex;
        align-items:center;
        flex-direction:row;
        border-radius:20px;
        &__input {
          width:80%;
          height:40px;
          border-radius: 20px 0 0 20px ;
          border:none;
          text-align:center;
          background-color:white;
          color:rgb(35,50,75);
          font-size:16px;
          &:focus {
            outline-color:rgb(35,50,75);
          }
          &:focus::placeholder {
            color:transparent;
          }
        }
        &__btn {
          width:20%;
          height:40px;
          border-radius:0 20px 20px 0;
          border:none;
          background-color:rgb(35,50,75);
          color:white;
          font-size: 16px;
          font-weight:bold;
          &:hover {
            cursor:pointer;
            background-color:rgba(35,50,75, 0.1);
            color:rgb(35,50,75);
            border:2px solid rgb(35,50,75);
          }
        }
      }
    }
  }
</style>
