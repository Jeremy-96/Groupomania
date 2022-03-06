<template>
  <div>
    <Nav/>
    <Administrator/>
    <Footer/>
  </div>
</template>


<script>
import  Nav from '@/components/Nav.vue'
import Administrator from '@/components/Administrator.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Admin',
  components: {
    Nav,
    Administrator,
    Footer
  }
}

</script>
