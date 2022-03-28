<template>
  <div>
    <Nav/>
    <OnePost/>
    <Comments/>
    <Footer/>
  </div>
</template>


<script>
import Nav from '@/components/Nav.vue'
import OnePost from '@/components/OnePost.vue'
import Comments from '@/components/Comments.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Comment',
  components: {
    Nav,
    OnePost,
    Comments,
    Footer
  }
}

</script>