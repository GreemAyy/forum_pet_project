<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import UserMini from '@/components/user/UserMini.vue'
    import Slider from '@/UI/Slider.vue';
    import RequestMessage from './RequestMessage.vue';
    import {setLikeMessage,changeStatus,getRequst} from '@/querys/post.query'
    import { useStore } from 'vuex';
    import CreateMessage from '../create/CreateMessage.vue';
    const store = useStore()
    const props = defineProps(['width','item'])
    const isLiked = ref(props.item.like)
    const likeCount = ref(props.item.message.likes)
    const reqList = reactive([])
    const isDeleted=ref(false)
    const setMessageReq= ref(false)
    const likeEvent=()=>{
       if(store.state.id!==null){
        isLiked.value=!isLiked.value
        likeCount.value=isLiked.value?likeCount.value+1:likeCount.value-1
        setLikeMessage(props.item.message.id,store.state.id)
       }
       else store.commit('bottomEvent',{open:true,data:'Вы не авторизованны!',status:'bad'})
    }
    const deleteMessage=()=>{
        props.item.message.status=404
        changeStatus(props.item.message.id,404)
        isDeleted.value=true
    }
    const reviveMessage=()=>{
        props.item.message.status=200
        changeStatus(props.item.message.id,200)
    }
    const setReq=()=>{
        setMessageReq.value=true
        const id =props.item.message.id
        store.commit('setReqID',id)
    }
    onMounted(()=>{
            getRequst(props.item.message.id,store.state.id)
            //@ts-ignore
            .then((data:Array<any|never>)=>reqList.push(...data))
    })
</script>

<template>
    <div
    v-if="item?.message.status==200"
    :style="{width:width+'%'}"
    class="message-item">
        <div class="message-creator">
            <UserMini :low="true" :id="item.message.creator_id"/>
        </div>
        <div class="message-body">
            {{item.message.body}}
        </div>
        <div class="message-media">
            <Slider 
            :width="50"
            :height="12.5"
            :imgs="item.message.media"/>
        </div>
        <div 
        @click="likeEvent"
        :class="{liked:isLiked}"
        class="message-like">
            {{likeCount}}
        </div>
        <div
        v-if="store.state.id!==null"
        class="events">
            <div 
            @click="setReq"
            class="request-message">
                Ответить
            </div>
            <div
            @click="deleteMessage"
            v-if="item?.message.creator_id==store.state.id"
            class="delete-message">Удалить</div>
        </div>
    </div>
    <div
    v-if="item?.message.status==404&&reqList.length>0
    ||isDeleted"
    :style="{width:width+'%'}"
    class="message-item">
      <span>Сообщение удалено.</span>
      <span 
      class="req"
      @click="reviveMessage"
      v-if="item?.message.creator_id==store.state.id">
      Восcтановить?</span>
    </div>
    <div v-if="reqList.length" class="req-list">
            <RequestMessage 
            v-for="item of reqList"
            :item="item"
            />
    </div>
    <div
    v-if="setMessageReq"
    class="req-message-create">
        <div 
        @click="setMessageReq=false"
        class="remove-req-btn">
            <span>x</span>
            Убрать
        </div>
        <CreateMessage
        :low="true"/>
    </div>
</template>

<style scoped lang="scss">
    .remove-req-btn{
        display: flex;
        align-items: center;
        font-size: 1vw;
        margin: .25vw 0;
        color: red;
        cursor: pointer;
        span{
            background-color: red;
            color: white;
            padding: 0 .35vw;
            border-radius: 50%;
        }
    }
    .req-list{
        margin-bottom: .75vw;
    }
    .request-message{
        font-size: 1vw;
        font-weight: 600;
        margin: 0 1vw 0 0;
    }
    .req{
        color: rgb(41, 41, 255);
        cursor: pointer;
    }
    .events{
        align-items: center;
        display: flex;
       font-size: .8vw;
       margin: .25vw 0 0;
       div{
        color: rgb(41, 41, 255);
        cursor: pointer;
       }
    }
    .message-like{
        text-align: end;
        display: inline-block;
        padding: .1vw .5vw;
        font-size: 1.25vw;
        font-weight: 600;
        border-radius: 50%;
        cursor: pointer;
    }
    .liked{
        color: white;
        background-color: red;
    }
    .message-item{
        padding: .5vw 1vw;
        background-color: white;
        box-shadow: 0px 0px 10px grey;
        border-radius: 1vw;
        margin: 1vw 0;
        span{
            font-size: 1.25vw;
        }
    }
    .message-body{
        margin: .25vw 0;
    }
    .message-body{
        font-size: 1.35vw;
    }
</style>