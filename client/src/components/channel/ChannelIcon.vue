<script setup lang="ts">
import { _URL } from '@/tools/URL';
import { onMounted, reactive, watch } from 'vue';
    const props = defineProps(['id'])
    const info=reactive({
        ID: null, 
        name: null, 
        profile_img: [0], 
        subs: null,
        description:null
    })
    onMounted(()=>{callChannelInfo()})
    const callChannelInfo=async()=>{
        const req = await fetch(_URL+`api/get-channel-info/${props.id}`)
        const data = await req.json()
        info.ID=data?.ID
        info.name=data?.name
        info.profile_img=data?.profile_img
        info.subs=data?.subs
        info.description=data?.description
    }
    watch(()=>props.id,()=>callChannelInfo())
</script>

<template>
    <div class="channel-icon-block">
        <router-link 
        :to="`/channel/${id}`"
        class="channel-icon">
        <div class="channel-icon-name">
            @{{info.name}}
        </div>
        <div class="channel-icon-img">
            <img :src="_URL+`api/media/${info.profile_img[0]}`" alt="">
        </div>
        </router-link>
        <router-link 
        :to="`/channel/${id}`"
        class="show-channel-info">
            <div class="show-icon-img">
               <img :src="_URL+`api/media/${info.profile_img[0]}`" alt="">
            </div>
            <div class="show-icon-name">
                {{info.name}}
            </div>
            <div class="show-icon-desc">
                {{info.description}}
            </div>
            <div class="show-icon-subs">
               Подписчиков:<span>{{info.subs}}</span>
            </div>
        </router-link>
    </div>
</template>

<style scoped lang="scss">
    .show-icon-subs{
        width: 8vw;
        span{
            font-weight: 600;
        }
    }
    .show-icon-desc{
        width: 8vw;
        text-align: center;
        font-size: .75vw;
        font-weight: 300;
    }
    .show-icon-name{
        text-align: center;
        font-size: 1vw;
        font-weight: 600;
        margin: .25vw 0 0;
        width: 8vw;
    }
    .show-icon-img{
        width: 8vw;
        height: 8vw;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .show-channel-info{
        div{
            color: black;
            text-decoration: none;
        }
        text-decoration: none;
        padding: 1vw ;
        border-radius: 1vw;
        position: absolute;
        box-shadow: 0px 0px 5px grey;
        z-index: 106;
        top: 0;
        // left: -21%;
        background-color: white;
        display: none;
        transition: all .3s;
    }
    .channel-icon-block{
        position: relative;
        z-index: 100;
        &:hover{
            .show-channel-info{
                display: block;
            }
        }
    }
    .channel-icon{
        color: black;
        text-decoration: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0px 5px 2px;
    }
    .channel-icon-img{
        margin: 0 5px;
        width: 40px;
        height: 40px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
</style>