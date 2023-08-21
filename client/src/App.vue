<script lang="ts" setup>
import Bottom from './UI/Bottom.vue';

</script>

<template>
  <Bottom/>
  <div class="all ">
      <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }


  .all{
      color: black;
        background-color: white;
  }

  .theme{
    background-color: rgb(62, 62, 62);
    color: white;

    input{
      border: 2px solid grey;
      color: white;
    }
     
  }
</style>