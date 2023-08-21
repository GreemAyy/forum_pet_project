<script setup lang="ts">
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    const store =useStore()
    const userData = computed(()=>store.state.userData)
    const log=()=>{
        //@ts-ignore
        if(!store.state.id)
            window.location.pathname='/auth/log'
        }
</script>

<template>
    <div class="master">
       <div 
       @click="log"
       class="master-name">
            {{userData?.name?userData?.name:'Войти'}}
       </div>
       <div class="master-img">
            <img src="" alt="">
       </div>
    </div>
</template>

<style scoped lang="scss">
.master{
    font-size: 30px;
    display: flex;
}

.master-name{
    color: blue;
    cursor: pointer;
}
</style>