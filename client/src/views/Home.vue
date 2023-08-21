<script setup lang="ts">
    import Burger from '@/UI/Burger.vue';
    import { useStore } from 'vuex';
    import Header from '@/components/header/Header.vue';
    import PostList from '@/components/post/PostList.vue';
    const store =useStore()
</script>

<template>
    <Burger/>
    <div class="total">
        <Header/>
        <div class="header-header">
        Главная</div>
        <PostList
        :channel="'all'"
        :id = 'store.state.id'
        />
    </div>
</template>


<style scoped lang="scss"> 
    .header-header{
        text-align: center;
        display: block;
        font-size: 40px;
        margin-top: 40px;
        margin-left:20px ;
        font-weight: 600;
    }
    .total{
        display: flex;
    }
</style>