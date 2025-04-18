<template>
    <div class="back-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 42 42" style="margin-left: 10px;"
            @click="routerBack">
            <path fill="currentColor" fill-rule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z" />
        </svg>
        <div style="flex: 1;text-align: center;transform: translateX(-15px);z-index: -1;">
            <slot></slot>
        </div>
    </div>
    <div style="width: 100%;height: 44px;"></div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const routerBack = () => {
    router.go(-1);
}
</script>

<style scoped>
.back-header {
    background-color: #fff;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
}
</style>