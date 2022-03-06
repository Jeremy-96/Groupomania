<template>
  <div>
    <Nav/>
    <Profil/>
    <Footer/>
  </div>
</template>


<script>
  import Nav from '@/components/Nav.vue'
  import Profil from '@/components/Profil.vue'
  import Footer from '@/components/Footer.vue'
  
  export default {
    name: 'Account',

    components: {
      Nav,
      Profil,
      Footer
    }
  }
</script>