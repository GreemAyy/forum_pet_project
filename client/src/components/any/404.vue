<template>
    <div class="flex-404">
        <div class="page-404">
        404.
        </div>
        <span>Страница не найдена!</span>
        <router-link 
        class="link-to-main"
        to="/home">
            Перейти на главную
        </router-link>
    </div>

</template>

<script setup lang="ts">

</script>

<style scoped>
.flex-404{
    display:flex;
    flex-direction:column;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%)
}
.link-to-main{
    text-align:center;
    display:block;
    font-size:30px;

}
span{
    text-align:center;
    display:block;
    font-size:30px;
}
.page-404{
    font-size:100px;
    text-align:center;
}
</style>