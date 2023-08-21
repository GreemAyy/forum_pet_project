<script lang="ts" setup>
    import { _URL } from '@/tools/URL';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    const store = useStore()
    const props =defineProps(['imgs','width','height'])
    let point = ref(0)
    let bigImg=ref(false)
    const inc=()=>point.value=point.value+1
    const dec=()=>point.value=point.value-1
    
</script>

<template>
    <div
    v-if="imgs.length>0"
    :style="{width:(width!==undefined?width:70)+'%',}"
    class="slider-block">
        <div class="slider-flex-block">
            <div 
            @click="dec"
            :class="{opac:point==0,'open-arrow':bigImg}"
            class="slider-arrow back">
            {{'<'}}
        </div>
        <div 
        @click="bigImg=!bigImg"
        v-for="(img,index) of imgs" 
        class="slider-item"
        :class="{show:index==point,hide:index!==point,'open-img':index==point&&bigImg,def:!bigImg}">
            <img 
            :style="{height:(height!==undefined?height:15)+'vw'}"
            :src="_URL+'api/media/'+img" 
            alt="">
        </div>
        <div 
        @click="inc"
        :class="{opac:point==imgs.length-1,'open-arrow':bigImg}"
        class="slider-arrow next">
            >
        </div>
        </div>
        <div 
        v-if="imgs.length>1"
        class="slider-counter">
            {{point+1+'/'+imgs.length}}
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .slider-counter{
        font-size: 1.5vw;
        font-weight: 600;
        box-shadow: 0px 0px 10px grey;
        padding: .1vw 1vw;
        border-radius: .5vw;
    }
    .slider-flex-block{
        display: flex;
        align-items: center;
    }
    .open-arrow{
        z-index: 105;
        position: fixed;
        font-size: 5vw;
        background-color: white;
        padding: .5vw 1.75vw;
        border-radius: 50%;
        transform: translate(0,-50%);
    }
    .next.open-arrow{
        top: 50%;
        right: 0;
    }
    .back.open-arrow{
        left: 0;
        top: 50%;
    }
    .open-img{
            z-index: 102;
            width: 100vw;
            height: 100vh;
            position: fixed;
            overflow: hidden;
            top: 0;
            left: 0;
            background-color: rgb(122, 122, 122,.5);
        img{
            z-index: 104;
            position: absolute;
            transform: translate(-50%,-50%);
            top: 50%;
            left: 50%;
            border-radius: 1vw;
        }
    }
    .opac{
        opacity:0;
        pointer-events: none;
    }
    .slider-arrow{
        font-size: 4vw;
        cursor: pointer;
    }
    .slider-block{
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 70%;
        padding: 1vw;
    }
    .show{
        display: block;
    }
    .hide{
        display: none;
    }
    .def{
        img{
            height: 400px;
            width: 100%;
            border-radius: 1vw;
        }
    }
    .slider-item{
        // transition: all .3s;
        img{
            transition:none;
        }
    }
</style>