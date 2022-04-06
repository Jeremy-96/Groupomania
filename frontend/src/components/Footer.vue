<template>
  <div class="footer">
    <h4 class="footer__copy">
      Groupomania © 2022. All right reserved.
    </h4>

    <a href="mailto:groupomania.admin@hotmail.com" class="footer__contact">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"></path></svg> 
      <p>Email</p>
    </a>
    
  </div>
</template>


<script>

  export default {
    name: 'Footer',
  }
</script>


<style scoped lang="scss">
  .footer {
    width:100%;
    height:auto;
    margin:30px 0 0 0;
    display:flex;
    justify-content: space-around;
    align-items:center;
    border-radius:20px 20px 0 0;
    box-shadow: 0 0 0.5rem rgb(0 0 0 / 25%);
    position: relative;
    z-index: 1000;
    &__copy {
      color:rgb(214,26,13);
      width:70%;
    }
    &__contact {
      width:20%;
      height:100px;
      display:flex;
      align-items:center;
      justify-content: flex-end;
      font-size: 18px;
      color:rgb(35,50,75);
      text-decoration: none;
      svg {
        width:28px;
        height:28px;
        margin-right:10px;
      }
      &:hover {
        color:rgb(214,26,13);
      }
    }
  }
  @media screen and (max-width:768px) {
    .footer {
      &__copy {
        width:80%;
        display:flex;
        align-items:center;
        justify-content: flex-start;
      }
      &__contact {
        width:10%;
        svg {
          width:22px;
          height:22px;
        }
        p {
          display:none;
        }
      }
    }
  }
  @media screen and (max-width:375px) {
    .footer {
      flex-direction:column;
      justify-content: center;
      &__copy {
        order:2;
        width:90%;
        justify-content: center;
      }
      &__contact {
        height:60px;
      }
    }
  }
</style>
