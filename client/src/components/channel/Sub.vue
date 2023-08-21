<script lang="ts" setup>
    import { computed, reactive, ref, watch } from 'vue';
    import {subChannel} from '../../querys/channel.query'
    const props= defineProps(['subs','roles','id','channel'])
    const emit= defineEmits(['recall'])
    const subCounter= computed(()=>props.subs)
    const role = computed(()=>props.roles)
    const status = computed(()=>role.value?.status)
    const sub=async()=>{
        await subChannel(props.id,props.channel)
        emit('recall')
    }
    const unsub=async()=>{
        await subChannel(props.id,props.channel)
        emit('recall')
    }
</script>

<template>
    <div class="sub">
        <div class="sub-header">Подписчиков:{{subCounter}}</div>
        <div v-if="status==200" class="sub-btn black">
            <div 
            v-if="role?.result?.role=='admin'||
            role?.result?.role=='creator'" 
            class="admin-sub">Вы админ</div>
            <div 
            @click="unsub"
            v-else class="default-sub">
                Отписаться
            </div>
        </div>
        <div 
        class="sub-btn red"
        @click="sub"
        v-else-if="status!==200&&id!=null" >
          Подписаться
        </div>
    </div>
</template>

<style>
    .sub{
        font-size: 1.25vw;
        text-align: center;
    }

    .sub-btn{
        display: inline-block;
        padding: .15vw 1vw;
        color: white;
        border-radius: 2vw;
        cursor: pointer;
    }

    .red{
        background-color: red;
    }
    
    .black{
        background-color: black;
    }
</style>