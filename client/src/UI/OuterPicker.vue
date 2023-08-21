<script setup lang="ts">
    import { useStore } from 'vuex';
    const store= useStore()
</script>

<template>
    <div class="outer"
        :class="{hide:!store.state.openOuter}">
        <div 
        @click="store.commit('outerEvents',false)"
        class="outer-header">
            Закрыть
        </div>
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    .outer-header{
        border-bottom: 1px solid black;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        padding: 0 .5vw ;
    }
    .outer{
        position: fixed;
        font-size: 25px;
        top: 2%;
        right: 2%;
        transition: all .3s;
        border: 1px solid grey;
        padding: 0 0 .5vw 0;
        border-radius: 20px;
    }
    .slot{
        padding: 10px;
    }
    .hide{
        top: -100%;
    }
</style>