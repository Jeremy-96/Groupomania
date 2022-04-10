<template>
  <div class="bloc">
    <h3 class="title">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--codicon" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5v1.79zM10.29 13l1.86 1.85l.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5h3.79zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14l-.35-.15z" clip-rule="evenodd"></path></svg>
      Comments
    </h3>
  
    <div class="comments" v-for="(comment, commentKey) in comments" :key="commentKey">
      <div class="comment" v-if="comment.postId == postId">
        <div class="comment__infos">
          <h5 class="comment__infos__id"><em>Comment Id :</em> {{ comment._id }} </h5>
          <h5 class="comment__infos__user">User Id :{{ comment.userId }}</h5>
          <button @click.prevent="deleteComment(comment._id)" v-if="user.admin == 1 || comment.userId == user.id" class="comment__infos__del">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="16" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"></path><path fill="currentColor" d="M432 96h-96V72a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v24H80a16 16 0 0 0 0 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 0 0 0-32ZM192.57 416H192a16 16 0 0 1-16-15.43l-8-224a16 16 0 1 1 32-1.14l8 224A16 16 0 0 1 192.57 416ZM272 400a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm32-304h-96V72a7.91 7.91 0 0 1 8-8h80a7.91 7.91 0 0 1 8 8Zm32 304.57A16 16 0 0 1 320 416h-.58A16 16 0 0 1 304 399.43l8-224a16 16 0 1 1 32 1.14Z"></path></svg>
            <p>Delete</p>
          </button>
        </div> 
        <div class="comment__content">
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
        .then(() => {
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
    width:100%;
    height:auto;
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    .title {
      width:90%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      color:rgb(35,50,75);
      border-radius:20px;
      box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);
      svg {
        width:30px;
        height:30px;
        margin-right:10px;
      }
    }
    .comments {
      width:80%;
      height:auto;
      display:flex;
      align-items:center;
      justify-content: center;
      flex-direction:column;
      .comment {
        width:100%;
        height:auto;
        margin-bottom:30px;
        display:flex;
        align-items:center;
        flex-direction: column;
        justify-content: space-between;
        flex-wrap:wrap;
        border-radius:20px;
        &__infos {
          width:100%;
          height:50px;
          display:flex;
          justify-content: space-around;
          align-items:center;
          border-radius:20px 20px 0 0;
          background-color:rgba(214,26,13, 0.1);
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
            width:15%;
            height:60%;
            margin:0;
            padding:0;
            display:flex;
            align-items:center;
            justify-content: center;
            background-color:rgb(214,26,13);
            color:white;
            font-size:14px;
            border:none;
            border-radius:20px;
            svg {
              margin-right:10px;
            }
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
          min-height:100px;
          display:flex;
          align-items:center;
          justify-content: center;
          border-radius: 0 0 20px 20px;
          background-color:rgba(214,26,13, 0.1);
          color:rgb(35,50,75);
          border-top:2px solid rgb(214,26,13);
          &__text {
            width:90%;
            margin:30px 0 30px 0;
            text-align:center;
          }
        }
      }
    }
  }
  @media screen and (max-width:768px) {
    .bloc {
      width:100%;
      .comments {
        width:90%;
        .comment {
          &__infos {
            &__del {
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
  }
</style>