<template>
  <form class="addPost">
    <input v-model="title" class="addPost__title" placeholder="Title">
    <input id="addPost__img" name="img" type="file" @change="onSelectedFile" accept="image/*" class="addPost__img">
    <input type="text" v-model="content" class="addPost__text" placeholder="Type your text" required>

    <button @click.prevent="addpost" class="addPost__btn" type="submit">Add post</button>

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
        content:"",
      }
    },
    methods: {
      onSelectedFile(event) {
        this.imageUrl = event.target.files[0];
      },
      addpost() {
        const formData = new FormData()
        formData.append('userId', parseInt(this.userId))
        formData.append('title', this.title)
        if(this.imageUrl == "") {
          formData.append('image', this.imageUrl)
        }formData.append('image', this.imageUrl)
        
        formData.append('content', this.content)

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


<style lang="scss">
  .addPost {
    width:100%;
    height:auto;
    margin:50px 0 50px 0;
    display:flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    &__title {
      width:100%;
      height:30px;
      margin-bottom: 20px;
      text-align: center;
      border-radius:20px;
      border:2px solid rgb(35,50,75);
      background-color:rgba(208, 208, 208, 0.01);
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
      width:15%;
      height:100px;
      text-align:center;
      border-radius:20px;
      border:2px solid rgb(35,50,75);
      color:rgb(35,50,75);
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
    &__text {
      width:70%;
      height:100px;
      text-align:center;
      border-radius:20px;
      border:2px solid rgb(35,50,75);
      background-color:rgba(208, 208, 208, 0.01);
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
      cursor:pointer;
      height:100px;
      border:2px solid rgb(35,50,75);
      border-radius:20px;
      font-size:18px;
      font-weight:bold;
      color:rgb(208, 208, 208);
      background-color:rgb(35,50,75);
      &:hover {
        background-color: rgba(214,26,13, 0.2);
        color:rgb(35,50,75);
      }
    }
  }
</style>
