<template>
  <div class="content">
    <article v-for="(post, key) in posts" :key="key" class="post">
      <div class="post__infos">
        <div class="post__infos__id">
          {{ post._id }} :
        </div>

        <div class="post__infos__title">
          <em>{{ post.title }}</em>
        </div>

        <button v-if="user.admin == 1 || userId == post.userId" @click.prevent="deletePost(post._id)" class="post__infos__delete">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"></path><path fill="currentColor" d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32ZM192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416ZM272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"></path></svg>
          <p>Delete</p>
        </button>
      </div>

      <div v-if="post.imageUrl" class="post__img">
        <img :src="post.imageUrl" alt="Image of the post">
      </div>

      <div class="post__content">
        {{ post.content }}
      </div>

      <form v-if="userId == post.userId" class="post__update">
        <input type="text" class="post__update__title" v-model="updateTitle" placeholder="Title">
        <input type="text" class="post__update__content" v-model="updateContent" placeholder="Content">
        <button @click.prevent="updatePost" class="post__update__btn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--radix-icons" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 1 1-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663c.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638c-.715.804-1.253 1.776-1.253 2.97Zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 1 1 .192-1.024c2.874.54 5.457 2.98 5.457 6.557c0 1.537-.699 2.744-1.515 3.663c-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 1 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64c.715-.803 1.253-1.775 1.253-2.97Z" clip-rule="evenodd"></path></svg>
          <p>Update</p>
        </button>
      </form>
      
      <form class="post__comment">
        <label for="content"></label>
        <input class="post__comment__input"  id="content" type="text" v-model="content" placeholder="Type your comment :">
          
        <button @click.prevent="commentPost" class="post__comment__btn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--eos-icons" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m21.558 3.592l-1.15-1.15a1.49 1.49 0 0 0-2.12 0L13 7.731V11h3.27l5.288-5.288a1.49 1.49 0 0 0 0-2.12ZM15.579 9.45h-1.03V8.42L18 4.973l1.03 1.03Z"></path><path fill="currentColor" d="M19 19H5V5h6V3H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2v-6h-2Z"></path></svg>
          <p>Comment</p>
        </button>
      </form>
    </article>
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
        updateTitle: "",
        updateContent: "",
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
            })
            .catch((error) => {
              console.log(error);
            })
        }
      },

      updatePost() {
        const payload = {
          title:this.updateTitle,
          content:this.updateContent
        }

        if(this.updateContent != "" && this.updateTitle != "")  
        axios
            .put(`http://localhost:3000/api/posts/${this.postId}`, payload, {
              headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              alert("Your post is update !");
              location.reload(); 
            })
            .catch((error) => {
              (error);
            })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    width:100%;
    height:auto;
    display:flex;
    align-items:center;
    justify-content: center;;
    .post {
      padding:0;
      margin:0 0 50px 0;
      width:90%;
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
          width:60%;
          font-weight:bold;
          color:rgb(35,50,75);
        }
        &__delete {
          width:15%;
          height:80%;
          padding:0;
          margin:0;
          display:flex;
          align-items:center;
          justify-content: center;
          border-radius:20px;
          border:none;
          font-size:14px;
          background-color: rgb(214,26,13);
          color:white;
          svg {
            width:20px;
            height:20px;
            margin-right:10px;
          }
          &:hover {
            cursor:pointer;
            color:rgb(214,26,13);
            background-color:rgba(35,50,75, 0.1);
            border:2px solid rgb(214,26,13);
          }
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
        margin-bottom:30px;
        display:flex;
        align-items:center;
        justify-content: center;
        border-radius:20px;
        font-size:20px;
        color:rgb(35,50,75);
        background-color:rgba(35,50,75, 0.1);
      }
      &__update {
        width:100%;
        height:50px;
        margin:20px 0 20px 0;
        display:flex;
        justify-content: space-around;
        align-items:center;
        &__title {
          width:15%;
          height:50%;
          border-radius:20px;
          border:none;
          text-align:center;
          color:rgb(35,50,75);
        }
        &__content {
          width:50%;
          height:60%;
          border-radius:20px;
          border:none;
          text-align:center;
          color:rgb(35,50,75);
        }
        &__btn {
          width:15%;
          height:60%;
          display:flex;
          align-items:center;
          justify-content: center;
          border-radius:20px;
          border:none;
          background-color:rgb(35,50,75);
          color:white;
          svg {
            width:16px;
            height:16px;
            margin-right:10px;
          }
          &:hover {
            cursor:pointer;
            background-color:rgba(35,50,75, 0.1);
            border:2px solid rgb(35,50,75);
            color:rgb(35,50,75);
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
          display:flex;
          align-items:center;
          justify-content: center;
          border-radius:0 20px 20px 0;
          border:none;
          background-color:rgb(35,50,75);
          color:white;
          font-size: 16px;
          svg {
            width:20px;
            height:20px;
            margin-right:10px;
          }
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
  @media screen and (max-width:768px) {
    .content {
      .post {
        flex-direction:column;
        &__infos {
          &__delete {
            svg {
              margin:0;
            }
            p {
              display:none;
            }
          }
        }
        &__img {
          width:auto;
          margin-bottom:10px;
        }
        &__content {
          width:90%;
        }
        &__update {
          &__btn {
            svg {
              margin:0;
            }
          }
          p {
            display:none;
          }
        }
        &__comment {
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
  @media screen and (max-width:375px) {
    .content {
      .post {
        &__update {
          height:120px;
          flex-direction:column;
          &__title {
            width:90%;
            height:30%;
          }
          &__content {
            width:90%;
            height:30%;
          }
          &__btn {
            width:90%;
            height:30%;
          }
          
        }
      }
    }
  }
</style>
