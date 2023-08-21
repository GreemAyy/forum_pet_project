<script lang="ts" setup>
    import { reactive, ref,watch } from 'vue';
    import {searchQuery} from '@/querys/any.query'
    const input= ref('')
    const res =reactive({user:[],post:[],channel:[]})
    watch(()=>input.value,
    throttle((newVal:string)=>{
        if(newVal?.length>0)
        searchQuery(newVal)
        .then(data=>{
            res.channel=data.channel
            res.post=data.post
            res.user=data.user
        })
    },1000))
    function throttle(callback:any, delay:any) {
        let inThrottle = false;
        return function() {
          const context = this;
          const args = arguments;
          if (!inThrottle) {
            callback.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
              inThrottle = false;
            }, delay);
          }
        }
}

</script>

<template>
    <div class="search-total">
        <div class="search-block">
            <input v-model="input" type="text">
        </div>
        <div
        :class="{none:input.length==0}"
        class="search-outer">
            <div class="post-out out">
                <div class="out-header">Посты</div>
                <div class="out-data">
                    <a :href="'/post/'+item?.ID" 
                    v-for="item of res.post" 
                    v-if="res.post?.length>0" 
                    class="out-item">
                        {{item.title.substring(0,12)+'...'}}
                    </a>
                    <div v-else class="no-res">Нет результата...</div>
                </div>
            </div>
            <div class="channel-out out">
                <div class="out-header">Каналы</div>
                <div class="out-data">
                    <a :href="'/channel/'+item?.ID" 
                    v-for="item of res.channel" 
                    v-if="res.channel?.length>0" 
                    class="out-item">
                        {{item?.name.substring(0,12)+'...'}}
                    </a>
                    <div v-else class="no-res">Нет результата...</div>
                </div>
            </div>
            <div class="user-out out">
                <div class="out-header">Пользователи</div>
                <div class="out-data">
                    <a :href="'/user/'+item?.ID" 
                    v-for="item of res.user" 
                    v-if="res.user?.length>0" 
                    class="out-item">
                        {{item?.username.substring(0,12)+'...'}}
                    </a>
                    <div v-else class="no-res">Нет результата...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .out-item{
        display: block;
        color: black;
        font-size: 1.25vw;
        font-weight: 500;
    }
    .out-data{
        padding: .5vw;
        background-color: white;
        border-radius: .5vw;
    }
    .out{
        z-index: 15;
        margin: .5vw 0;
        background-color: rgb(36, 102, 255);
        padding: .25vw;
        border-radius: .5vw;
    }
    .out:last-child{
        margin: .5vw 0 0;
    }
    .out-header{
        font-weight: 600;
        font-size: 1.25vw;
        color: white;
    }
    .none{
        display: none;
    }
    .search-outer{
        border-radius: 1vw;
        padding: 1vw;
        position: absolute;
        z-index: 15;
        top: 100%;
        width: 100%;
        box-shadow: 0px 0px 10px grey;
        background-color: white;
    }
    .search-total{
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .search-block{
        input{
            width: 45vw;
            border: 1px solid grey;
            font-size: 30px;
            border-radius: 30px;
            padding: 0 10px;
        }
    }

</style>