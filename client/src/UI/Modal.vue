<script setup lang="ts" >
    import {useStore} from 'vuex'
    import { computed } from 'vue';
    const store = useStore()
    const closeModal= computed(()=>store.state.openModal)
</script>

<template>
    <div v-if="closeModal" class="modal-block">
        <div class="modal-item">
            <slot></slot>
        </div>
        <div @click="store.commit('modalEvents',false)" class="modal-back"></div>
    </div>

</template>

<style scoped> 
    .modal-block{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }
    .modal-item{
        background-color: white;
        position: fixed;
        padding: .5vw;
        border-radius: .75vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .modal-back{
        width: 100vw;
        height: 100vh;
        background-color: rgba(128, 128, 128, 0.5);
    }

    .close{
        display: none;
    }
</style>