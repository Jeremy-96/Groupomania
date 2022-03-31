<template>
  <div class="bloc">
    <h2 class="title">All comments</h2>
  
    <div class="comments" v-for="(comment, commentKey) in comments" :key="commentKey">
      <div class="comment" v-if="comment.postId == postId">
        <div class="comment__infos">
          <h5 class="comment__infos__id">Comment Id :{{ comment._id }}</h5>
          <h5 class="comment__infos__user">User Id :{{ comment.userId }}</h5>
          <button @click.prevent="deleteComment(comment._id)" v-if="user.admin == 1 || comment.userId == user.id" class="comment__infos__del">Delete</button>
        </div> 
        <div class="comment__content">
          <h5 class="comment__content__title">Comment : </h5>
          <div class="comment__content__text">
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Comments',
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
      comment:{},
      comments:[],
      imagePreview: null,
      postId: localStorage.getItem("postId"),
      content: "",
    }
  },
  created() {
    axios
      .get(`http://localhost:3000/api/comments`, {
        headers: {
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        this.comments = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
  },

  methods: {
    deleteComment(commentId) {
      axios
        .delete(`http://localhost:3000/api/comments/${commentId}`, {
          headers: {
            "Authorization": `Bearer ${this.token}`,
            "Content-Type": 'application/json',
          }
        })
        .then((response) => {
          console.log(response);
          alert(`Comment with id: ${commentId} as deleted`);
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
    width:1200px;
    height:auto;
    display:flex;
    justify-content: flex-start;
    align-items:center;
    flex-direction:column;
    border:2px solid rgb(214,26,13);
    border-radius:20px;
    .title {
      width:100%;
      text-align:center;
      color: rgb(214,26,13);
    }
    .comments {
      width:90%;
      height:auto;
      display:flex;
      align-items:center;
      justify-content: center;
      flex-direction:column;
      .comment {
        width:100%;
        height:150px;
        margin-bottom:30px;
        display:flex;
        align-items:center;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap:wrap;
        border:1px solid rgb(35,50,75);
        border-radius:20px;
        box-shadow: 5px 2px 5px rgb(35,50,75);
        &__infos {
          width:100%;
          height:30%;
          display:flex;
          justify-content: space-around;
          align-items:center;
          h5 {
            padding:0;
            margin:0;
            width:40%;
            height:100%;
            color:rgb(35,50,75);
            font-weight:bold;
          }
          &__id {
            display:flex;
            align-items:center;
          }
          &__user {
            display:flex;
            align-items:center;
          }
          &__del {
            width:10%;
            height:80%;
            margin:0;
            background-color:rgb(214,26,13);
            color:white;
            font-weight:bold;
            font-size:14px;
            border:none;
            border-radius:20px;
            &:hover {
              cursor:pointer;
              border:2px solid rgb(214,26,13);
              color:rgb(214,26,13);
              background-color: rgba(214,26,13, 0.01);
            }
          }
        }
        &__content {
          width:100%;
          height:60%;
          display:flex;
          align-items:center;
          justify-content: flex-end;
          border-radius: 0 0 20px 20px;
          background-color:rgba(35,50,75, 0.1);
          &__title {
            width:20%;
          }
          &__text {
            width:70%;
          }
        }
      }
    }
  }
</style>