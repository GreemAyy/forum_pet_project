<script lang="ts" setup>
import Burger from '@/UI/Burger.vue';
import ChannelHeader from '@/components/channel/ChannelHeader.vue'
import Header from '@/components/header/Header.vue';
import CreatePost from '@/components/create/CreatePost.vue';
import PostList from '@/components/post/PostList.vue'
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const path = window.location.pathname.split('/')
const typeID = ref(path[path.length-1])
const store =useStore()
const route=useRoute()
const exsist = computed(()=>store.state.isExsist)
    watch(()=>route.path,
    NV=>{const routed = NV.split('/')
        typeID.value=routed[routed.length-1]})
</script>

<template>
    <Burger/>
    <Header/>
    <ChannelHeader :id="typeID" />
    <div v-if="exsist">
        <CreatePost
        :channel ='typeID'
        :id="store.state.id"/>
        <PostList
        :channel="typeID"
        :id = 'store.state.id'/>
    </div>
</template>