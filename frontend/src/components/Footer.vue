<template>
  <div class="footer">
    <h4 class="footer__copy">
      Groupomania © 2022. All right reserved.
    </h4>

    <a href="mailto:groupomania.admin@hotmail.com" class="footer__contact">
      Email us !
    </a>
    
  </div>
</template>


<script>

  export default {
    name: 'Footer',
  }
</script>


<style lang="scss">
  .footer {
    width:1200px;
    height:100px;
    margin:30px 0 0 0;
    display:flex;
    justify-content: space-between;
    align-items:center;
    border-top:2px solid rgb(35,50,75);
    &__copy {
      color:rgb(35,50,75);
    }
    &__contact {
      font-size: 18px;
      color:rgb(35,50,75);
      text-decoration: none;
      &:hover {
        transform: scale(1.1);
        color:rgb(214,26,13);
        border-bottom: 2px solid rgb(35,50,75);
      }
    }
  }
</style>
