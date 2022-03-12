<template>
  <form class="addPost">

    <input class="addPost__img" placeholder="Insert image">

    <input class="addPost__text" placeholder="Type your text">

    <button @click.prevent="addpost" class="addPost__btn" type="submit">Add post</button>

  </form>
</template>


<script>

  export default {
    name: 'AddPost',

    methods: {
      addpost() {
        
      }
    }
  }

</script>


<style lang="scss">
  .addPost {
    width:100%;
    height:120px;
    margin:0 0 30px 0;
    display:flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    &__img {
      width:15%;
      height:80%;
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
      height:80%;
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
      height:90%;
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
