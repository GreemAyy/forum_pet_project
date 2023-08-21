<script lang="ts" setup>
    import { onMounted, provide, reactive ,ref,watch} from 'vue';
    import {getChannelPosts,
            getNewSinglePost} 
            from '../../querys/post.query'
    import SinglePost from './SinglePost.vue';
    import { useStore } from 'vuex';
    let observer;
    const toObserver = ref('')
    const props = defineProps(['channel','id'])
    const posts= ref([])
    const newAdded=ref([])
    const store = useStore()
    let isNull= reactive({nullVal:false})
    const loadLimit= 10
    let canLoadMore= ref(true)
    let entred=0
    onMounted(()=>{
            observer = new IntersectionObserver(enter=>loadPost())
            observer.observe(toObserver.value)
    })
    const loadPost=()=>
        getChannelPosts(props.channel,props.id,posts.value.length+loadLimit)
        .then(result=>{
                if(result?.length<loadLimit&&result?.length>0)
                    canLoadMore.value=false
                //@ts-ignore
                if(result!=null){
                    isNull.nullVal=false
                    //@ts-ignore
                    posts.value.push(...(result.sort((a,b)=>{
                        const thisA=a.post.result[0]
                        const thisB=b.post.result[0]
                        return ((thisB.likes+thisB.views)-(thisA.likes+thisA.views))
                    })))
                }
                else canLoadMore.value= false 
                if(result==null&&isNull.nullVal==true) isNull.nullVal=true   
        })
    watch(()=>props.channel,NV=>{
        posts.value=[]
        loadPost()
    })
    watch(()=>store.state.newPost,
    (newVal)=>{
        if(newVal!==null){
            getNewSinglePost(newVal,props.id)
            .then(data=>newAdded.value.push(data))
        }
    })

</script>

<template>
    <div class="post-list">
        <div class="list new-add">
            <div
            v-for="item of newAdded"
            class="new-post">
                <span>Новое</span>
                <SinglePost
                :item ='item'/>
            </div>
        </div>
        <div v-if="!isNull.nullVal" class="list">
            <SinglePost
            v-for="item of posts"
            :item ='item'/>
            <div
            ref='toObserver'
            :class="{unshow:canLoadMore==false}"
            @click="loadPost"
            class="load-more">
                Загрузить ещё
            </div>
        </div>
        <div v-else class="none">
            Нет постов! Напишите первый
        </div>
        <div v-if="posts.length==0" class="loading-posts">Loading...</div>
    </div>
</template>

<style scoped lang="scss">
    .loading-posts{
        font-size: 2vw;
        text-align: center;
    }
    .new-post{
        span{
            font-size: 1.5vw;
            color: red;
            text-decoration: underline;
        }
    }
    .unshow{
        display: none;
    }
    .post-list{
        width: 50%;
        margin: 100px auto 0;
    }

    .none{
        text-align: center;
        font-size: 1.75vw;
        font-weight: 600;
    }
</style>