<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import {useRouter,useRoute} from 'vue-router'
    import {getSubs} from '../querys/post.query'
    import { _URL } from '@/tools/URL';
    const closeBurger =ref(true)
    const store= useStore()
    const list=ref([])
    const router = useRouter()
    const isAuth = (window.location.pathname).includes('/auth/')
    const callSub=async()=>{
        getSubs(store.state.id)
        .then(data=>{
            //@ts-ignore
            if(data.status==200)list.value=data?.result
        })
    }
    const linkTo=(id:string)=>{
       router.push('/channel/'+id)
    }
    onMounted(()=>callSub())
    watch(()=>store.state.subUpdate,
    NV=>{
        if(store.state.subUpdate==true){
            callSub()
            store.commit('setSubUpdate',false)
        }
    })
</script>

<template>
    <div
        :class="{open:!closeBurger,none:isAuth}"
        @click="closeBurger=!closeBurger"
        class="burger-btn-to-open">>>></div>
    <div class="burder"
    :class="{close:closeBurger,none:isAuth}">
        <div class="burger-header">Подписки
            <div
        :class="{open:!closeBurger,none:isAuth}"
        @click="closeBurger=!closeBurger"
        class="burger-btn">
            <div class="burger-line line-1"></div>
            <div class="burger-line line-2"></div>
            <div class="burger-line line-3"></div>
        </div>
        </div>
        <div v-if="store.state.id!==null" class="subs">
            <div v-if="list?.length==0" 
            class="no-subs">Нет подписок!</div>
            <div 
            @click="linkTo(item?.ID)"
            v-else 
            v-for="item of list" class="sub-item">
                <div class="sub-img">
                    <img v-if="item?.profile_img?.length>0" :src="_URL+'api/media/'+item.profile_img[0]" alt="">
                    <div v-else class="no-res-img"></div>
                </div>
                <div class="sub-name">{{item?.name}}</div>
            </div>
        </div>
        <router-link
        class="log-to-see"
        v-else to="/auth/log">
            Войдите что-бы увидеть подписки
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
    .burger-btn-to-open{
        font-size: 2vw;
        margin: 10px;
        position: fixed;
        top: 0;     
        cursor: pointer;   
        font-weight: 600;
    }
    .sub-name{
        margin: 0 2px;
    }
    .subs{
        padding: 10px;
    }
    .sub-item{
        cursor: pointer;
        margin: 5px 0;
        display: flex;
        align-items: center;
        font-weight: 600;
        text-decoration: none;
        transition: all .5s;
        padding: .25vw;
        border-radius: .5vw;
        &:hover{
            box-shadow: 0px 0px 10px rgb(57, 149, 255);
        }
    }
    .sub-img{
        width: 50px;
        img{
            width: 100%;
            height: 50px;
            border-radius: 50%;
        }
    }
    .log-to-see{
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0,-50%);
        font-size: 20px;
        padding: 10xp;
        margin: 0 auto;
    }
    .burger-header{
        position: relative;
        font-size: 30px;
        font-weight: 500;
        margin: 10px;
        letter-spacing: 1.5px;
    }
    .none{
        display: none;
        opacity: 0;
        pointer-events: none;
    }
    .open{
        // left: 17%;
        padding: 10px;
        .line-3{
            display: none;
        }
        .line-1{
            top: 10px;
            position: absolute;
            margin: 0;
            transform: rotate(45deg);
        }
        .line-2{
            margin: 0;
            transform: rotate(135deg);
        }
    }
    .burger-btn{
        position: absolute;
        right: 0;
        cursor: pointer;
        transition: all .5s;
        top: 0;
        z-index: 102;
        display: flex;
        flex-direction: column;
        &:hover{
           .burger-line{
                background-color: red
           }
        }
    }
    .burger-line{
        transition: all .5s;
        margin: 3px;
        width: 30px; 
        height: 4px;
        background-color: black;
    }
    .close{
        left: -100%;
    }
    .burder{
        top: 0;
        position: fixed;
        transition: all .3s;
        z-index: 101;
        box-shadow: 0px 0px 20px grey;
        width: 20%;
        border-radius: 0 20px 20px 0;
        background-color: white;
        height: 100%;
    }
</style>