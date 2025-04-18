<template>
    <BackHeader>个人信息</BackHeader>
    <div class="user-info-container">
        <h1>用户信息修改</h1>
        <div>
            <div>
                <label for="nickname">昵称</label>
                <input type="text" id="nickname" v-model="nickname" />
            </div>
            <div>
                <label for="phone">电话</label>
                <input type="tel" id="phone" v-model="phone" />
            </div>
            <button class="button save" @click="saveInfo">保存修改</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackHeader from '../../components/BackHeader.vue';
import { useUserStore } from '../../../stores/user';

const { userName, userTel } = useUserStore();
const router = useRouter();
// 假设这是从后端获取的初始用户信息
const initialNickname = userName;
const initialPhone = userTel;

const nickname = ref(initialNickname);
const phone = ref(initialPhone);


const saveInfo = () => {
    // 这里可以添加保存信息到后端的逻辑
    console.log('保存的昵称:', nickname.value);
    console.log('保存的电话:', phone.value);
    alert('信息保存成功');
    router.go(-1);
};

</script>

<style scoped>
.user-info-container {
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #ff6b00;
    font-size: 24px;
    margin-bottom: 20px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.button {
    background-color: #ff6b00;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 30px;
    width: 100%;
}

.save:hover {
    background-color: #e65c00;
}
</style>