<script lang="ts" setup>
    import ChannelIcon from '../channel/ChannelIcon.vue';
    import { inject, ref } from 'vue';
    import {_URL} from '../../tools/URL'
    import {setLikeQuery} from '../../querys/post.query'
    import Slider from '@/UI/Slider.vue';
    import { useStore } from 'vuex';
    import UserMini from '../user/UserMini.vue'
    const props = defineProps(['item'])
    const channelID= props?.item?.post?.result[0]?.channel_child
    const postData = (props.item.post.result[0])
    const likeData = props.item.like.result
    const likes = ref(postData.likes)
    const isLiked = ref(likeData.length>0?true:false)
    const media = postData.media
    const store = useStore()
    const doLike=()=>{
       if(store.state.id!==null){
        isLiked.value=isLiked.value?false:true
        likes.value=isLiked.value?likes.value+1:likes.value-1
        setLikeQuery(store.state.id,postData.ID)
       }
       else
        store.commit('bottomEvent',{open:true,data:'Вы не авторизованны!',status:'bad'})
    }
</script>

<template>
        <div class="post">
            <ChannelIcon
            :id="channelID"/>
            <UserMini 
            :id="postData.creator_id"/>
            <div class="post-data">
        <router-link :to="'/post/'+postData.ID">
            <div class="post-title">
                {{postData.title}}
            </div>
            <div class="post-text">
                {{postData.body}}
            </div>
        </router-link>
            <div class="post-views">
                <img src="https://cdn1.iconfinder.com/data/icons/science-technology-outline-24-px/24/Body_organ_eye_optical_view_visual-20.png" alt="">
               <span> {{postData.views}}</span>
            </div>
            <div class="post-date">
                {{postData.time_create}}
            </div>
            <div class="post-media">
               <Slider
               :imgs="media"/>
            </div>
        </div>
        <div class="post-likes"
        @click="doLike"
        :class="{enable:isLiked}">
            {{likes}}
        </div>
        </div>
    
</template>

<style lang="scss" scoped>

.post-date{
    opacity: .7;
    font-size: 1;
}
.post-views{
    display: flex;
    align-items: center;
}
a{
    text-decoration: none;
    color:black;
}
.post{
    padding: 1vw;
    box-shadow: 0px 0px 20px rgb(205, 205, 205);
    border-radius: 1.5vw;
    margin: 1.5vw 0;
    background-color: white;
    position: relative;
}
.post-media{
    display: flex;
    flex-wrap: wrap;
}
.post-media-item{
    width: 30%;
    margin:7.5px;
    img{
        width: 100%;
        height: 200px;
        border-radius: 10px;
    }
}
.post-likes{
    background-color: grey;
    display: inline-block;
    padding: 1px;
    font-size: 25px;
    font-weight: 600;
    padding: 0 7.5px;
    border-radius: 50%;
    cursor: pointer;
    margin: .5vw 0 0;
}

.enable{
    color: white;
    background-color: red;
}
.post-text{
    font-size: 20px;
}
.post-title{
    font-size: 27.5px;
}

</style>