<template>
  <div>ONE ELEMENT</div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: 'OnePost',
    data() {
      return {
        users:[],
        user: {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          admin: localStorage.getItem("admin")
        },
        posts: [],
        post: {
          id:"",
          userId:"",
          title:"",
          imageUrl:"",
          content:""
        },
      }
    },
    async created() {
      await axios
        .get(`http://localhost:3000/api/auth/${this.user.id}/users`, {
          headers: {
            Authorization: "Bearer " + this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.users = response.data.users;
          console.log(this.users);
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
      await axios
        .get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.posts = response.data.posts;
          console.log(this.posts);
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
      await axios
        .get(`http://localhost:3000/api/posts/${this.post.id}`, {
          headers: {
            Authorization: "Bearer " + this.user.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.posts = response.data.posts;
          console.log(this.posts);
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });

    }
      
}
</script>
