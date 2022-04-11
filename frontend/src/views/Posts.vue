<template>
  <div>
    <Navbar/>
    <AddPost/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import AddPost from '@/components/AddPost'
  import Content from '@/components/Content.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'Posts',
    components: {
      Navbar,
      AddPost,
      Content,
      Footer
    }
  }
</script>




