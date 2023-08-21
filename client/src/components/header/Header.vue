<script setup lang="ts">
    import { getMaster } from '@/querys/user.query';
    import {clearCookiesAll} from '@/tools/cookie'
    import { useStore } from 'vuex';
    import Master from './Master.vue';
    import Search from './Search.vue';
    import OuterPicker from '../../UI/OuterPicker.vue'
    const store = useStore()
    getMaster()
    .then(result=>{
        if(result.status==400){
            clearCookiesAll()
        }
        else store.commit('setUserData',result)
    })
    const exit=()=>{
        clearCookiesAll()
        window.location.reload()
    }
    
</script>

<template>
    <div class="header">
        <router-link class="main-link" to="/home">
            Main
        </router-link>
        <Search/>
        <Master 
        @click="store.state.id!==null?store.commit('outerEvents',true):''"/>
    </div>
    <OuterPicker>
        <div class="outer-picker">
            <a href="/settings" class="settings">
                Настройки
            </a>
            <a href="/create/channel" class="settings">
                Создать канал
            </a>
            <div @click="exit" class="settings">
                Выйти из аккаунта
            </div>
        </div>
    </OuterPicker>
</template>

<style scoped lang="scss">
    .settings{
        cursor: pointer;
    }
    .outer-picker{
        text-align: center;
        a{
            display: block;
            color: black;
            text-decoration: none;
        }
    }
    .header{
        backdrop-filter: blur(4px);
        background-color: rgba(255, 255, 255, 0.5);
        position: fixed;
        width: 70%;
        top: 2%;
        z-index: 100;
        left: 50%;
        transform: translate(-50%,0);
        box-shadow: 0px 0px 20px rgb(205, 205, 205);
        border-radius: 35px;
        display: flex;
        align-items: center;
        padding: .75vw;
        justify-content: space-between;
    }

    .main-link{
            font-size: 30px;
            color: black;
            text-decoration: none;
            font-weight: 600;
    }
</style>