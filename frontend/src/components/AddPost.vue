<template>
  <form class="addPost__form">
    <div class="addPost__form__title">
      <label for="title">Title :</label>
      <input v-model="title" id="title" placeholder="Title" required>
    </div>

    <div class="addPost__form__img">
      <label for="image" id="label__image">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--uil" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.71 6.29a1 1 0 0 0-1.42 0L20 7.59V2a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 .33.21a.94.94 0 0 0 .76 0a1 1 0 0 0 .33-.21l3-3a1 1 0 0 0 0-1.42ZM19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7l-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1ZM5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17l4.3 4.3Zm13-1a.89.89 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21Z"></path></svg>
        <p>Select file</p>
        </label>
      <input name="image" type="file" @change="onSelectedFile" accept="image/*" id="image">
    </div>

    <div class="addPost__form__text">
      <label for="text"> Content :</label>
      <input type="text" v-model="content" id="text" placeholder="Type your text" required>
    </div>

    <button @click.prevent="addpost" class="addPost__form__btn" type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ri" width="28" height="28" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.5V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2l-10-9zM0 10h5v2H0v-2zm0 5h8v2H0v-2z"></path></svg>
      <p>Post</p>
    </button>
  </form>
</template>


<script>
  import axios from 'axios'

  export default {
    name: 'AddPost',
    data() {
      return {
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        title:"",
        imageUrl:"",
        imagePreview: null,
        content:"",
        likes:"",
        usersLiked:"",
        dislikes:""
      }
    },

    methods: {
      onSelectedFile(event) {
        this.imageUrl = event.target.files[0];
        this.imagePreview = URL.createObjectURL(this.imageUrl)
      },
      addpost() {
        const formData = new FormData();
        formData.append('userId', parseInt(this.userId));
        formData.append('title', this.title);
        formData.append('image', this.imageUrl);
        formData.append('content', this.content);
        formData.append('likes', this.likes);
        formData.append('usersLiked', this.usersLiked);
        formData.append('dislikes', this.dislikes);

        if(this.content != "" && this.title != "")  
        axios
            .post('http://localhost:3000/api/posts', formData, {
              headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              alert("Your post is published !");
              location.reload(); 
            })
            .catch((error) => {
              (error);
              console.log(error);
            })   
      }
    }
  }

</script>


<style scoped lang="scss">
  .addPost__form {
    width:100%;
    height:auto;
    margin:100px 0 100px 0;
    display:flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    &__title {
      width:90%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      border-radius:20px 20px 0 0;
      background-color: rgba(214,26,13, 0.2);
      label {
        display:none;
      }
      #title {
        width:90%;
        height:60%;
        border-radius:20px;
        border:none;
        text-align: center;
        &:focus {
          outline-color:rgb(214,26,13);
        }
        &::placeholder {
          font-size:16px;
        }
        &:focus::placeholder {
          color:transparent;
        }
      }
    }
    &__img {
      width:15%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      border-radius:0 0 0 20px ;
      color:rgb(35,50,75);
      background-color: rgba(214,26,13, 0.2);
      #label__image {
        width:90%;
        height:60%;
        display:flex;
        align-items:center;
        justify-content: center;
        border:2px solid rgb(35,50,75);
        border-radius:20px;
        text-align:center;
        cursor:pointer;
        background-color:white;
        &:hover {
          border:2px solid rgb(214,26,13);
          color:rgb(214,26,13);
        }
        svg {
          width:24px;
          height:24px;
          margin-right:10px;
        }
      }
      #image {
        display:none;
      }
    }
    &__text {
      width:60%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      background-color:rgba(214,26,13, 0.2);
      label {
        display:none;
      }
      #text {
        width:90%;
        height:60%;
        border-radius:20px;
        text-align:center;
        border:none;
        &:focus {
          outline-color:rgb(214,26,13);
        }
        &::placeholder {
          font-size:16px;
        }
        &:focus::placeholder {
          color:transparent;
        }
      }
    }
    &__btn {
      padding:0;
      width:15%;
      height:50px;
      display:flex;
      align-items:center;
      justify-content: center;
      border:none;
      border-radius:0 0 20px 0;
      font-size:16px;
      font-weight:bold;
      color:white;
      background-color:rgb(35,50,75);
      svg {
        margin-right:10px;
      }
      &:hover {
        cursor:pointer;
        background-color: rgba(214,26,13, 0.2);
        color:rgb(35,50,75);
      }
    }
  }
  @media screen and (max-width:768px) {
    .addPost__form {
      margin:80px 0 80px 0;
      &__title {
        margin:0;
      }
      &__img {
        width:20%;
        border-radius:0;
        #label__image {
          svg {
            margin:0;
          }
          p {
            display:none;
          }
        }
      }
      &__text {
        width:70%;
        border-right:0;
      }
      &__btn {
        width:90%;
        border-radius:0 0 20px 20px ;
        padding:0;
        svg {
          width:26px;
          height:26px;
        }
      }
    }
  }
  @media screen and (max-width:375px) {
    .addPost__form {
      &__btn {
        p {
          display:none;
        }
      }
    }
  }
    

</style>
