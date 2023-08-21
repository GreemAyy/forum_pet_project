<script lang="ts" setup>
    import SingleMessage from '@/components/messages/SingleMessage.vue'
    import {getSingleMessage} from '@/querys/post.query'
    import { useStore } from 'vuex';
    import { onMounted, reactive, ref ,watch } from 'vue';
    import { getListQuery } from '@/querys/post.query'
    import { useRoute } from 'vue-router';
    const route=useRoute()
    const store = useStore()
    const list = ref([])
    const newMessages = reactive<Object[]>([])
    let id = 0
    const path = route.path.split('/')
    let post = path[path.length-1]
    onMounted(()=>{
        
        if(store.state.id!=null)
            id=store.state.id
        getListQuery(post,id,null)
        .then(data=>list.value=data)
    })
    watch(()=>store.state.newMessage,
    async (newVal)=>{
       const req= await getSingleMessage(newVal,store.state.id)
       const data =await req
       if(data?.message?.type==='single')
            newMessages.push(data)
    })
</script>

<template>
    <div v-if="newMessages.length" 
    class="message-list new-messages">
        <span>Новое</span>
        <SingleMessage
        v-for="item of newMessages"
        :width="100"
        :item="item"/>   
        <span>Новое</span>
    </div>
    <div v-if="list.length" 
    class="message-list">
        <SingleMessage
        v-for="item of list"
        :width="100"
        :item="item"/>
    </div>
    <div 
    v-else-if="!list.length&&!newMessages.length" 
    class="no-res-message">
        Нет сообщений! Напишите первое!
    </div>
</template>

<style lang="scss" scoped>
.no-res-message{
    font-size: 2vw;
    text-align: center;
    margin: 1vw 0 0;
}
.new-messages{
    margin: 1vw 0 0;
    span{
        display: block;
        color: red;
        font-size: 20px;
        text-decoration: underline;
    }
    span:last-child{
        display: block;
        color: red;
        font-size: 20px;
        text-decoration: overline;
    }
}
.message-list{
    width: 40%;
    margin: 0 auto;
}
</style>