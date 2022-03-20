<template>
  <div class="content">
    <div v-for="(post, j) in posts" :key="j" class="posts" id="posts">
      <article class="post">
        <h4 class="post__title">
          {{  post.userId }} + {{ post.title }} 
        </h4>

        <div class="post__img">
          IMAGE
        </div>

        <div class="post__content">
          <em>{{ post.content }}</em>
        </div>

        <router-link class="post__comment" to="/comment">Comment</router-link>
      </article>
    </div>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: 'Content',
  
    data() {
      return{
        users:[],
        user: {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          admin: localStorage.getItem("admin")
        },
        posts: [],
        post: {},
      }
    },
    created() {
        axios
          .get(`http://localhost:3000/api/posts`,{
            headers: {
              "Authorization": `Bearer ${this.user.token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.posts = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },
  }

</script>


<style lang="scss">
  .content{
    width:1200px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:center;
    .posts {
      width:100%;
      display:flex;
      align-items:center;
      justify-content: center;
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
      &__title {
        width:100%;
        height:40px;
        margin:25px 0 25px 0;
        border:1px solid rgb(35,50,75);
        display:flex;
        align-items:center;
        justify-content: center;
      }
      &__img {
        width:15%;
        height:100px;
        display:flex;
        align-items:center;
        justify-content: center;
      }
      &__content {
        width:80%;
        height:100px;
        display:flex;
        justify-content: flex-start;
        border:1px solid black;
      }
      &__comment {
        width:100%;
        height:40px;
        display:flex;
        align-items:center;
        justify-content: center;
        text-decoration:none;
        margin:25px 0 0 0;
        font-size:18px;
        font-weight:bold;
        background-color:rgb(35,50,75);
        color:white;
        &:hover {
          cursor:pointer;
          transform:scale(1.03);
        }
        
      }
    }
  }
</style>
