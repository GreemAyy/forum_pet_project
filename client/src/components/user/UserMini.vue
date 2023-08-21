<script lang="ts" setup>
    import {_URL} from '../../tools/URL.ts'
    import { getUser } from '@/querys/user.query';
    import {onMounted,reactive} from 'vue'
    const props= defineProps(['id','low'])
    const user=reactive({name:null,username:null,profile_img:null})
    onMounted(()=>{
        getUser(props.id)
        .then(data=>{
            user.name=data.name
            user.username=data.username
            user.profile_img=data.profile_img
        })
    })
</script>

<template>
    <div 
    :class="{'low':low==true,high:!low}"
    class="profile-mini" >
        <div class="profile-mini-img">
            <img v-if="user.profile_img?.length>0" :src="_URL+'api/media/'+user.profile_img[0]" />
            <div v-else class="no-res-img"></div>
        </div>
        <div class="profile-mini-name">
            {{user.name}}
        </div>
    </div>
</template>

<style scoped lang="scss">
    .low{
        font-size: .75vw;
        padding: .25vw;
    }
    .profile-mini-name{
        margin:0 10px;
    }
    .profile-mini{
        border-radius:15px;
        width:50%;
        cursor: pointer;
        flex-shrink: 0;
        display:flex;
        align-items:center;
    }
    .high{
           font-size:20px;
    }
    .high .profile-mini-img{
        width:40px;
        height:40px;
        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }
    }
    .low .profile-mini-img{
        width:25px;
        height:25px;
        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }
    }
    .high .no-res-img{
        width:40px;
        height:40px;
        background-color:grey;
        border-radius:50%;
    }
    .low .no-res-img{
        width:25px;
        height:25px;
        background-color:grey;
        border-radius:50%;
    }
</style>