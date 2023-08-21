<script setup lang="ts">
    import { createMessageQuery } from '@/querys/post.query';
    import { reactive, ref } from 'vue';
    import { useStore } from 'vuex';
    const props=defineProps(['low'])
    const store = useStore()
    const inputRef = ref('')
    const file = ref();
    const filesOut = reactive<File[]>([]);
    const outerFiles = reactive<{ _URL: string; type: string }[]>([]);
    const showFiles = async () => {
      if (filesOut.length < 10 && file.value.files.length < 10) {
        for (let i = 0; i < file.value?.files.length; i++) {
          filesOut.push(file.value?.files[i]);
        }
        if (file.value?.files.length > 0) {
          for (let i = 0; i < file.value?.files.length; i++) {
            const inFile = file.value?.files[i];
            const reader = new FileReader();
            reader.readAsDataURL(inFile);
            reader.onload = () =>
              outerFiles.push({
                _URL: URL.createObjectURL(inFile),
                type: inFile.type,
              });
          }
        }
      }
    };
    const deleteFile = (index: number) => {
      filesOut.splice(index, 1);
      outerFiles.splice(index, 1);
    };
    const create = () => {
      if(inputRef.value.length>0&&store.state.id!==null)
        createMessageQuery({
          creator:store.state.id,
          body:inputRef.value,
          post:store.state.path,
          media:filesOut,
          type:store.state.reqID==0?'single':'request',
          resend:store.state.reqID
        })
        .then(data=>{
          store.commit('bottomEvent',{open:true,data:'Сообщение создано!',status:'suc'})
          store.commit('addNewMessage',data.id)        
        })
      else if(store.state.id==null)
          store.commit('bottomEvent',{open:true,data:'Вы не авторизованны!',status:'bad'})          
      else
          store.commit('bottomEvent',{open:true,data:'Сообщение меньше 1 символа!',status:'bad'})          
    };
</script>

<template>
        <div class="message"
        :class="{low:low,high:!low}">
            <textarea 
            v-model="inputRef"
            name="" id="" cols="30" :rows="low?1:2" class="textarea"></textarea>
            <div class="file-out-block">
              <div
                v-if="outerFiles.length > 0"
                v-for="(item, index) of outerFiles"
                class="file-out">
                <div @click="deleteFile(index)" class="close-file">x</div>
                <img v-if="item.type.includes('image/')" :src="item._URL" alt="" />
                <div class="another" v-else>{{ item.type }}</div>
              </div>
            </div>
            <input
              max="9"
              @change="showFiles"
              ref="file"
              multiple="multiple"
              type="file"/>
        <button 
        @click="create" 
        class="send-btn">Написать</button>
      </div>
</template>

<style scoped lang="scss">
    .close-file{
        position: absolute;
        top: 0;
        font-size: 1.5vw;
        color: white;
        background-color: rgb(55, 55, 55);
        right: 0;
        padding: 0 .5vw;
        border-radius: .5vw;
        cursor: pointer;
    }
    .file-out-block{
        padding: .2vw;
        display: flex;
        flex-wrap: wrap;
        background-color: white;
        border-radius: .25vw;
    }
    .file-out{
        position: relative;
        width: 20%;
        img{
            width: 100%;
            height: 150px;
        }
    }
    .textarea{
        display: block;
        width: 98%;
        margin: .25vw auto;
        border-radius: 0.5vw;
        padding: .15vw;
        font-size: 1.15vw;
        min-width: 98%;
        max-width: 100%;
    }
    .low.message{
      width: 100%;
    }
    .high.message{
        width: 55%;
    }
    .message{
        display: flex;
        flex-direction: column;
        margin:  0 auto;
        border-radius: 1vw;
        padding: .25vw;
        background-color: rgb(36, 102, 255);
    }
    .high .send-btn{
      font-size: 1.5vw;
      padding: .1vw 1vw;
      max-width: 10vw;
      border-radius: .75vw;

    }
    .low .send-btn{
      font-size: 1vw;
      max-width: 5vw;
    }
    .send-btn{
        background-color: white;
        border-radius: .5vw;
        font-weight: 600;
        cursor: pointer;
    }
</style>