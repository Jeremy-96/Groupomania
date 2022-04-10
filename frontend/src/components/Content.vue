<template>
  <div class="content">
    <h2 class="allposts">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ri" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16.8 19L14 22.5L11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1h-5.2zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z"></path></svg>
      Posts
    </h2>
    
    <div v-for="(post,key) of posts" :key="key" class="posts" id="posts">
      <article class="post">
        <div class="post__infos">
          <h3 class="post__infos__id">
            {{ getName(post._id) }} 
          </h3>
          <h3 class="post__infos__title">
            <em> {{ post.title }} </em>
          </h3>

          <div v-if="myFilter(post._id).length > 0" class="post__infos__btn">
            <button @click.prevent="likePost(post._id)" class="post__infos__btn__like">
              <svg  style="color:rgb(9, 180, 0)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fluent" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M15.056 9.004c.46-1.427.693-2.677.693-3.754c0-2.398-.939-4.247-2.5-4.247c-.847 0-1.109.504-1.437 1.747c.018-.065-.163.634-.215.821c-.101.359-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.174 9.953a5.885 5.885 0 0 1-2.855 2.326l-1.257.482a1.75 1.75 0 0 0-1.092 1.967l.686 3.539a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.43h-3.165Z"></path></svg>
              <span>{{ getLikes(post._id) }}</span>
            </button>
          </div>

          <div v-else class="post__infos__btn">
            <button @click.prevent="likePost(post._id)" class="post__infos__btn__like">
              <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fluent" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M15.056 9.004c.46-1.427.693-2.677.693-3.754c0-2.398-.939-4.247-2.5-4.247c-.847 0-1.109.504-1.437 1.747c.018-.065-.163.634-.215.821c-.101.359-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.174 9.953a5.885 5.885 0 0 1-2.855 2.326l-1.257.482a1.75 1.75 0 0 0-1.092 1.967l.686 3.539a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.43h-3.165Z"></path></svg>
              <span>{{ getLikes(post._id) }}</span>
            </button>
          </div>

        </div>

        <div v-if="post.imageUrl" class="post__img">
          <img :src="post.imageUrl" alt="Image of the post">
        </div>

        <div class="post__content">
          {{ post.content }}
        </div>

        <button @click.prevent="getThePost(post._id)" class="post__btn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 6c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c2.73 0 5.06 1.66 6 4c-.94 2.34-3.27 4-6 4s-5.06-1.66-6-4c.94-2.34 3.27-4 6-4m0 1.5A2.5 2.5 0 0 0 13.5 7A2.5 2.5 0 0 0 16 9.5A2.5 2.5 0 0 0 18.5 7A2.5 2.5 0 0 0 16 4.5m2 8.25V16h-4.92L10 19.08V16H4V6h4.27c.32-.73.73-1.4 1.23-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v3a1 1 0 0 0 1 1h.5c.25 0 .5-.1.7-.29L13.9 18H18c1.11 0 2-.89 2-2v-4c-.63.33-1.3.58-2 .75Z"></path></svg>
          <p>View the post</p>
        </button>
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
        user: {
          id: localStorage.getItem("userId"),
          admin: localStorage.getItem("admin"),
          token: localStorage.getItem("token"),
        },
        posts: [],
        post: {},
        postId: "",
        content:"",
        reaction:"",
        reactions:[],
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
        
        await axios
          .get(`http://localhost:3000/api/reactions`, {
            headers: {
              "Authorization": `Bearer ${this.user.token}`,
              "Content-Type": "application/json"
            }
          })
          .then((response) => {
            this.reactions = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },
    methods: {
      getThePost(idPost) {
        localStorage.setItem("postId", idPost);
        this.$router.push("/comment");
      },

      likePost(idPost) {
        const payload = {
          postId:idPost,
          userId:parseInt(this.userId),
          reaction:"",
        }
        axios
          .post(`http://localhost:3000/api/reactions/${idPost}`, payload, {
            headers: {
              "Authorization": `Bearer ${this.user.token}`,
              "Content-Type": "application/json",
            }
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
      },

      getName(idPost){
        let name = "";
        let id = "";
        for(let i = 0 ; i < this.posts.length ; i++) {
          if(this.posts[i]._id == idPost) {
            id = this.posts[i].userId;
          }
        }
        for(let i = 0 ; i < this.users.length ; i++) {
          if(id == this.users[i]._id) {
            name = this.users[i].firstname + ' ' + this.users[i].lastname;
            return name;
          }
        }
      },

      myFilter(idPost){
        let filterReaction = [];
        for(let i = 0 ; i < this.reactions.length ; i++) {
          let react = this.reactions[i];
          
          if(react.userId == this.userId && react.postId == idPost) {
            filterReaction.push(react);
          }
        }
        return filterReaction;
      },

      getLikes(idPost){
        let filterReaction = [];
        for(let i = 0 ; i < this.reactions.length ; i++) {
          let react = this.reactions[i];
          
          if(react.postId == idPost) {
            filterReaction.push(react);
          }
        }
        return filterReaction.length;
      },
    }
  }

</script>


<style lang="scss">
  .content{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    z-index:100;
    .allposts {
      width:90%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      color:rgb(214,26,13);
      border-radius:20px;
      box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);

      svg {
        margin-right:10px;
      }
    }
    .posts {
      width:90%;
      display:flex;
      align-items:center;
      justify-content: center;
    }
    .post {
      padding:0;
      margin:0 0 80px 0;
      width:100%;
      border-radius:20px;
      display:flex;
      justify-content: space-around;
      flex-wrap:wrap;
      align-items:center;
      background-color:rgba(35,50,75, 0.1);
      border-bottom:3px solid rgb(214,26,13);
      &__infos {
        width:100%;
        height:50px;
        margin:0 0 25px 0;
        border-radius: 20px 20px 0 0;
        border-bottom:2px solid rgb(35,50,75);
        display:flex;
        align-items:center;
        justify-content: space-around;
        background-color:rgba(35,50,75, 0.1);
        &__id {
          width:50%;
          text-align:center;
          color:rgb(214,26,13);
        }
        &__title {
          width:40%;
          margin-left:50px;
          color:rgb(35,50,75);
        }
        &__btn {
          width:10%;
          display:flex;
          align-items:center;
          justify-content: space-around;
          &__like {
          border:none;
          background-color:rgba(35,50,75, 0.01);
            svg {
              width:24px;
              height:24px;
              color:rgb(35,50,75);
            }
            &:hover {
              cursor:pointer;
              svg {
                color:rgb(9, 180, 0);
              }
            }
          }
        }
      }
      &__img {
        width:auto;
        height:150px;
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
        width:60%;
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
        height:50px;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-top:30px;
        border:none;
        text-decoration:none;
        border-radius:20px;
        font-size:16px;
        background-color:rgb(35,50,75);
        color:white;
        svg {
          width:24px;
          height:24px;
          margin-right:10px;
        }
        &:hover {
          cursor:pointer;
          background-color:rgba(35,50,75, 0.01);
          color:rgb(35,50,75);
          border:2px solid rgb(35,50,75);
        }
      }
    }
  }
  @media screen and (max-width:768px) {
    .content {
      .post {
        flex-direction:column;
        &__infos {
          &__title {
            margin:0;
          }
        }
        &__img {
          width:auto;
          margin-bottom:30px;
        }
        &__content {
          width:90%;
        }
      }
      
    }
  }
  @media screen and (max-width:375px) {
    .content {
      .posts {
        .post {
          &__btn {
            svg {
              margin:0;
            }
            p {
              display:none;
            }
          }
        }
      }
    }
  }
</style>
