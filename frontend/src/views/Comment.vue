<template>
  <div>
    <Nav/>
    <OnePost/>
    <Footer/>
  </div>
</template>


<script>
import Nav from '@/components/Nav.vue'
import OnePost from '@/components/OnePost.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Comment',
  components: {
    Nav,
    OnePost,
    Footer
  }
}

</script>