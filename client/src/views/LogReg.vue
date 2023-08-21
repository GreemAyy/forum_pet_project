<script lang="ts" setup>
    import {setCookie} from '../tools/cookie'
    import {ref,onBeforeMount} from 'vue'
    import {useStore} from'vuex'
    import {regUser} from '@/querys/auth.query'
    import Modal from '../UI/Modal.vue'
    const path = window.location.pathname
    const store = useStore()
    const type = path.split('/').at(-1)
    const nameRef = ref('')
    const usernameRef = ref('')
    const passwordRef= ref('')
    onBeforeMount(()=>{
        if(store.state.id!==null)
            window.location.pathname='/home'
    })
    let alertData=''
    const link=()=>
        window.location.pathname='/auth/'+(type=='reg'?'log':'reg')
    const submit=()=>{
        if(usernameRef.value.length>=6 && 
            passwordRef.value.length>=6)
                regUser({
                    name: nameRef.value,
                    username: usernameRef.value,
                    password: passwordRef.value
                },String(type))
                .then(result=>{
                    console.log(result)
                    alertData=result?.status==200?'Успешно!':'Ошибка!'
                    store.commit('modalEvents',true)
                    if(result.status==200)
                        setTimeout(() => 
                            window.location.pathname=
                            type=='reg'?'/auth/log':'/home'
                            ,2000)
                    if(result.status==200&&type=='log'){
                        console.log(result)
                        setCookie('id',result.id)
                        setCookie('hash',result.hash)
                    }
                })
        else{
            alertData='Логин или пароль слишком короткие!'
            store.commit('modalEvents',true)
        }
    }
</script>

<template>
    <Modal>
        <div class="alert">
            {{alertData}}
        </div>
    </Modal>
    <div class="log-block">
        <div class="log-title">
            {{type==='reg'?'Регестрация':"Вход"}}
        </div>
        <div class="log-form">
            <div v-if="type==='reg'" class="form-title">Имя:</div>
            <input v-if="type==='reg'" v-model="nameRef" type="text" class="form-input">
            <div class="form-title">Логин:</div>
            <input v-model="usernameRef" type="text" class="form-input">
            <div class="form-title">Пароль:</div>
            <input v-model="passwordRef" type="password" class="form-input">
            <div 
            @click="submit"
            class="log-submit">{{type=='log'?'Войти':'Зарегестрироваться'}}</div>
            <div
            @click="link"
            class="link-to">
                {{type=='log'?'Нет аккаунта? Зарегестрироваться':'Есть аккаунт? Войти'}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .alert{
        font-size: 2vw;
    }
    .log-block{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 1vw;
        box-shadow: 0px 0px 50px rgb(115, 115, 255,.75);
        border-radius: 1.5vw;
        *{
            margin: .25vw 0;
            font-size: 2vw;
            font-weight: 600;
            border-radius: .5vw;
        }
        .form-title{
            opacity: .75;
        }
    }
    .link-to{
        font-size: 1.25vw;
        text-align: center;
        margin: 1vw 0 0;
        cursor: pointer;
        color: blue;
    }
    .log-submit{
        text-align: center;
        cursor: pointer;
        background-color:rgb(115, 115, 255,.75) ;
        border-radius: .5vw;
        margin: 1vw 0 0;
        padding: .25vw 0;
    }
    .log-title{
        text-align: center;
    }
</style>