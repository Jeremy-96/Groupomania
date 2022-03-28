<template>
  <div class="content">
    <h2 class="allposts">All posts</h2>
    <div v-for="(post,key) of posts" :key="key" class="posts" id="posts">
      <article class="post">
        <div class="post__infos">
          <h3 class="post__infos__id">
            {{ post._id }} :
          </h3>
          <h3 class="post__infos__title">
            <em>{{ post.title }} </em>
          </h3>
        </div>

        <div class="post__img">
          <img v-if="post.imageUrl" :src="post.imageUrl" alt="Image of the post">
        </div>

        <div class="post__content">
          {{ post.content }}
        </div>

        <button @click.prevent="getThePost(post._id)" class="post__btn">View the post</button>
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
        userId: localStorage.getItem("userId"),
        imagePreview: null,
        users:[],
        replaceUsers:[],
        user: {
          id: localStorage.getItem("userId"),
          admin: localStorage.getItem("admin"),
          token: localStorage.getItem("token"),
        },
        posts: [],
        post: {},
        postId: "",
        content:"",
      }
    },
    async created() {
        await axios
          .get(`http://localhost:3000/api/posts`,{
            headers: {
              "Authorization": `Bearer ${this.user.token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.posts = response.data;
            localStorage.removeItem('postId');
          })
          .catch((error) => {
            console.log(error);
          })
        
        await axios
          .get(`http://localhost:3000/api/auth/${this.user.id}/users`, {
            headers: {
              "Authorization": `Bearer ${this.user.token}`,
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },
    methods: {
      getThePost(idPost) {
        localStorage.setItem("postId", idPost);
        this.$router.push("/comment");
      }
    }
  }

</script>


<style scoped lang="scss">
  .content{
    width:1200px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:center;
    .allposts {
      width:100%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      background-color: rgba(214,26,13, 0.35);
      color:rgb(35,50,75);
      border-top:2px solid rgb(214,26,13);
      border-bottom:2px solid rgb(214,26,13);
    }
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
          color:rgb(214,26,13);
        }
        &__title {
          width:80%;
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
        height:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-top:30px;
        border:none;
        text-decoration:none;
        border-radius:20px;
        font-size:18px;
        background-color:rgb(35,50,75);
        color:white;
        &:hover {
          cursor:pointer;
          background-color:rgba(35,50,75, 0.01);
          color:rgb(35,50,75);
          border:2px solid rgb(35,50,75);
        }
      }
    }
  }
</style>
