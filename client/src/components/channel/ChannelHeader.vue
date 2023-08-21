<script lang="ts" setup>
    import {_URL } from "../../tools/URL"
    import { onMounted, reactive, watch } from 'vue';
    import {useStore} from 'vuex'
    import {getChannel} from '../../querys/channel.query'
    import Sub from './Sub.vue'
    const props =defineProps(['id'])
    const store = useStore()
    const userID = store.state.id
    const channelData= reactive({channel:null,sub:null})
    const callChannel=async()=>{
        getChannel(props.id,userID)
        .then(data=>{
            channelData.channel=data.channel
            channelData.sub=data.sub
            if(data.channel?.status!==404)
                store.commit('changeExsist',true)
        })
    }
    onMounted(()=>callChannel())
    watch(()=>props.id,NV=>callChannel())
    const update=async()=>{
        await callChannel()
        store.commit('setSubUpdate',true)
    }
</script>


<template>
    <div v-if="channelData.channel?.status!==404&&
        channelData.channel!==null" 
        class="channel-header">
        <div class="channel-header-photo">
            <img 
            :src="_URL+'api/media/'+channelData?.channel?.result?.profile_img[0]" alt="">
        </div>
        <div class="channel-header-info">
            <div class="channel-header-header">
                {{channelData.channel?.result.name}}
            </div>
            <div class="channel-header-description">
                {{channelData.channel?.result.description}}
            </div>
            <Sub 
            @recall="update"
            :subs="channelData.channel?.result.subs"
            :roles="channelData?.sub"
            :id="store.state.id"
            :channel="id"/>
        </div>
    </div>
    <div v-else class="channel-header">
        <div class="no-res">
            404.
        </div>
    </div>
</template>


<style lang="scss" scoped>

    .no-res{
        font-size: 4vw;
        text-align: center;
    }
    .channel-header-description{
        text-align: center;
        margin: 1vw 0;
    }
    .channel-header-info{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .channel-header-header{
        font-size: 2vw;
        text-align: center;
    }
    .channel-header{
        
        display: flex;
        width: 45%;
        margin: 100px auto 0;
        box-shadow: 0px 0px 20px rgb(205, 205, 205);
        padding: 1vw;
        border-radius: 30px;
        align-items: center;
    }
    .channel-header-photo{
        img{
            border: 3px solid rgb(0, 0, 0);
            width: 250px;
            height: 250px;
            border-radius: 50%;
        }
    }

</style>
