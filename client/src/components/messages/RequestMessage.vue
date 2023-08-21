<script lang="ts" setup>
    import UserMini from '@/components/user/UserMini.vue'
    import { changeStatus, setLikeMessage } from '@/querys/post.query';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    const props = defineProps(['item'])
    const isLiked = ref(props.item.like)
    const likeCount=ref(props.item.message.likes)
    const store = useStore()
    const like=()=>{
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
    }
    const reviveMessage=()=>{
        props.item.message.status=200
        changeStatus(props.item.message.id,200)
    }
</script>

<template>
    <div v-if="item.message.status==200" 
    class="req-message">
        <UserMini 
        :low="true"
        :id="item.message.creator_id"/>
        <div class="req-message-body">
            {{item.message.body}}
        </div>
        <div class="event-req">
            <div 
            @click="like"
            :class="{liked:isLiked}"
            class="req-message-like">
            {{likeCount}}
            </div>
            <div 
            v-if="item?.message.creator_id==store.state.id"
            @click="deleteMessage"
            class="delete-req">Удалить</div>
        </div>
    </div>
    <div
    v-else-if="item.message.status==404&&
    item?.message.creator_id==store.state.id"
    class="req-message no-res">
        Сообщение удалено.
        <span
        @click="reviveMessage"
        v-if="item?.message.creator_id==store.state.id">
        Восстановить.</span>
    </div>
</template>

<style scoped lang="scss">
.event-req{
    display: flex;
    align-items: center;
}
.no-res{
    font-size: 1vw;
    span{
        color: rgb(29, 29, 254);
        cursor: pointer;
    }
}
.delete-req{
    margin: 0 0 0 .5vw;
    font-size: .75vw;
    color: blue;
    cursor: pointer;
}
.req-message-like{
    display: inline-block;
    cursor: pointer;
    font-size: 1vw;
    text-align: end;
    padding: .1vw .45vw;
    border-radius: 50%;
    font-weight: 600;
}
.liked{
    color: white;
    background-color: red;
}
.req-message{
    margin: .5vw 0 .0vw auto;
    padding: 0 .25vw;
    width: 90%;
    font-size: 1.25vw;

}
</style>