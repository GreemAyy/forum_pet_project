<script setup lang="ts">
    import Burger from '@/UI/Burger.vue';
    import SinglePost from '@/components/post/SinglePost.vue';
    import HeaderVue from '@/components/header/Header.vue';
    import CreateMessage from '@/components/create/CreateMessage.vue';
    import MessageList from '@/components/messages/MessageList.vue';
    import { getNewSinglePost } from '@/querys/post.query';
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    const route=useRoute()
    const item = ref('')
    const include = ref(true)
    const store=useStore()
    const noRes = ref(false)
    onMounted(()=>{callPost()})
    const callPost=()=>{
        const path = route.path.split('/')
        getNewSinglePost(path[path.length-1],store.state.id)
        .then(data=>{
            if(data.post?.result?.length>0) item.value=data
        })
        setTimeout(()=>{
            if(!include){
                include.value=false
                noRes.value=true
            }
        },10000)
    }
    watch(()=>route.path,
    NV=>{
        callPost()
    })
</script>

<template>
    <Burger/>
    <HeaderVue/>
    <div v-if="item!==''&&include">
        <div class="posts">
            <SinglePost
            :item="item"/>
        </div>
        <CreateMessage/>
        <MessageList/>
    </div>
    <div 
    v-else-if="!include&&noRes" 
    class="no-res-post">
            404.
    </div>
</template>

<style lang="scss" scoped>
    .no-res-post{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 4.5vw;
        font-weight: 600;
    }
    .posts{
        z-index: 2;
        margin: 100px auto 0;
        width: 60%;
        top: 0;
        .post{
            width: 100%;
        }
    }
</style>