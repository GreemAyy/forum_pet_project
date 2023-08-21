<script setup lang="ts">
    import { computed, watch } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore()
    const status = computed(()=>store.state.bottomStatus)
    const statusData = computed(()=>store.state.bottomData)
    const isOpen = computed(()=>{
        if(store.state.showBottom)
            setTimeout(()=>store.commit('bottomEvent',{'open':false,'data':'',status:'def'}),3000)
        return  store.state.showBottom
    })
</script>

<template>
    <div
    :class="{
        show:isOpen,
        close:!isOpen,
        def:status=='def',
        suc:status=='suc',
        bad:status=='bad'
        }"
    class="bottom">
        <div class="bottom-data">
            {{statusData}}
        </div>
    </div>
</template>

<style scoped lang="scss">
    .def{
        color: black;
        border: 1px solid black;
    }
    .suc{
        color: rgb(47, 130, 9);
        border: 1px solid rgb(47, 130, 9);
    }
    .bad{
        color: red;
        border: 1px solid red;
    }
    .close{
        right: -100%;
    }
    .show{
        right: 0;
    }
    .bottom{
        font-weight: 600;
        transition: all .3s;
        position: fixed;
        bottom: 0;
        margin: 1vw;
        font-size: 1.25vw;
        padding: 1vw;
        border-radius: 1vw;
        background-color: white;
        z-index: 100;
    }
</style>