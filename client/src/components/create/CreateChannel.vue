<script lang="ts" setup>
    import { useStore } from 'vuex';
    import { ref } from 'vue';
    import {_URL} from '../../tools/URL'
    const name = ref('')
    const tag   =  ref('')
    const img = ref('')
    const store = useStore()
    const create=()=>{
        const formdata = new FormData()
        //@ts-ignore
        formdata.append('file',img.value.files[0])
        formdata.append('data',JSON.stringify({
            name:name.value,
            tag:tag.value.split(',').map(item=>{
                return item.trim().toLowerCase()
            }),
            creator:store.state.id
        }))
        fetch(_URL+'api/create/channel',{
            method:"POST",
            body:formdata
        })
    }
</script>

<template>
    <div class="create-channel">
        <form 
        method="POST" >
            <div class="form-title">Имя</div>
            <input v-model="name" type="text" class="form-input">
            <div class="form-title">Фото профиля</div>
            <input ref="img" type="file" class="form-input">
            <div class="form-title">Теги</div>
            <input v-model="tag" placeholder="Напишите теги через запятую" type="text">
            <div type="submit" @click.prevent="create" class="sub">Создать</div>
        </form>
        
    </div>
</template>