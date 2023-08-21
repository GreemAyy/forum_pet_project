<script lang="ts" setup>
    import Modal from "@/UI/Modal.vue";
    import { createPost } from "@/querys/channel.query";
    import {  reactive, ref } from "vue";
    import { useStore } from "vuex";
    const props = defineProps({ channel: String, id: String });
    defineEmits(["channel", "id"]);
    const store = useStore();
    const title = ref("");
    const text = ref("");
    const file = ref();
    const status=ref('')
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
       if(text.value.length>1)
         createPost({
         channelChild: props.channel,
         creatorID: props.id,
         title: title.value,
         body: text.value,
         media: filesOut,
       })
       .then((data) => {
         store.commit('bottomEvent',{open:true,data:'Пост создан!',status:'suc'})
         store.commit("addNewPost", data.id)
         status.value='Пост создан!'
       });
      else 
      store.commit('bottomEvent',{open:true,data:'Заголовок должен содержать хотябы 1 символ!',status:'bad'})
    };
</script>

<template>
  <Modal>
    <form method="post" class="post-form" enctype="multipart/form-data">
        <div class="post-status">
            {{status}}
        </div>
      <header>Написать пост</header>
      <div class="form">
        <div class="post-header">Заголовок</div>
        <input v-model="title" type="text" />
        <div class="post-header">Текст</div>
        <textarea v-model="text" cols="30" rows="10"></textarea>
        <div class="post-header">Файлы</div>
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
          type="file"
        />
        <div @click="create" class="send-btn">Создать</div>
      </div>
    </form>
  </Modal>
  <div @click="store.commit('modalEvents', true)" class="create-post">
    <div class="btn-create">Написать пост</div>
  </div>
</template>

<style scoped lang="scss">
.post-status{
    text-align: center;
    font-size: 1.5vw;
    color: rgb(153, 199, 61);
    font-weight: 600;
}
.file-out-block {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.file-out {
  position: relative;
  width: 25%;
  .another {
    width: 50%;
    word-break: break-all;
    overflow: hidden;
    font-size: 0.75vw;
    height: 150px;
    border: 1px solid black;
  }
  img {
    height: 150px;
    width: 100%;
  }
}
.close-file {
  position: absolute;
  right: 5%;
  top: 0%;
  color: white;
  padding: 0 0.2vw;
  border-radius: 0.1vw;
  background-color: rgb(68, 68, 68);
  cursor: pointer;
}
.send-btn {
  cursor: pointer;
  font-size: 1.75;
  text-align: center;
  font-weight: 600;
  padding: 0.25vw 1vw;
  background-color: rgb(36, 102, 255);
  color: white;
  margin: 1vw 0 0;
  border-radius: 0.5vw;
}
header {
  font-size: 1.75vw;
  text-align: center;
  font-weight: 500;
}
.post-header {
  font-weight: 600;
  margin: 0.25vw 0;
}
.post-form {
  font-size: 1.25vw;
  input {
    font-size: 1.25vw;
    width: 100%;
  }
  textarea {
    font-size: 1.25vw;
    width: 100%;
  }
}
.create-post {
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: 2vw;
  margin: 1vw 0;
}

.btn-create {
  background-color: rgb(66, 66, 255);
  padding: 0.1vw 1vw;
  font-weight: 600;
  color: white;
  border-radius: 2vw;
  cursor: pointer;
}
</style>
