<template>
  <form class="addPost">
    <input v-model="title" class="addPost__title" placeholder="Title">
    <input name="image" type="file" @change="onSelectedFile" accept="image/*" class="addPost__img">
    <input type="text" v-model="content" class="addPost__text" placeholder="Type your text" required>

    <button @click.prevent="addpost" class="addPost__btn" type="submit">
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
            })
            
      }
    }
  }

</script>


<style scoped lang="scss">
  .addPost {
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
      text-align: center;
      border-radius:20px 20px 0 0;
      border:none;
      border-bottom:2px solid rgb(35,50,75);
      background-color: rgba(214,26,13, 0.2);
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
    &__img {
      width:14.8%;
      height:52px;
      display:flex;
      align-items:center;
      justify-content: center;
      border-radius:0 0 0 20px ;
      border:none;
      color:rgb(35,50,75);
      background-color: rgba(214,26,13, 0.2);
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
    &__text {
      width:60%;
      height:50px;
      text-align:center;
      border:none;
      border-left:2px solid rgb(35,50,75);
      border-right:2px solid rgb(35,50,75);
      background-color:rgba(214,26,13, 0.2);
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
    &__btn {
      padding:0;
      width:15%;
      height:52px;
      display:flex;
      align-items:center;
      justify-content: center;
      border:none;
      border-radius:0 0 20px 0;
      font-size:16px;
      font-weight:bold;
      color:rgb(208, 208, 208);
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
    .addPost {
      margin:80px 0 80px 0;
      &__title {
        margin:0;
      }
      &__img {
        width:30%;
        border-radius:0;
      }
      &__text {
        border-right:0;
      }
      &__btn {
        width:90.8%;
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
    .addPost {
      &__btn {
        p {
          display:none;
        }
      }
    }
  }
    

</style>
