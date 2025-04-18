<template>
    <img src="../assets/img/login-header.png" alt="logo" class="login-logo"></img>
    <div class="login-container">
        <div class="login-header">
            <h1>骑手登录</h1>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
                <label for="phone">用户名</label>
                <input type="tel" id="phone" v-model="form.userName" placeholder="请输入用户名" required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="form.password" placeholder="请输入密码" required autocomplete>
            </div>
            <button type="submit" class="login-btn">登录</button>
        </form>
        <!-- <div class="login-footer">
            <p>还没有账号？<a href="#">立即注册</a></p>
        </div> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../request/login'
import { useUserStore } from '../../stores/user'
import { useOrderStore } from '../../stores/order'

const { setLoginUserInfo } = useUserStore()
const { setOrderNumber } = useOrderStore()
const router = useRouter()
const form = ref({
    userName: '',
    password: ''
})

const handleLogin = async () => {
    if (form.value.userName && form.value.password) {
        const data = await login(form.value.userName, form.value.password)
        if (data) {
            localStorage.setItem('riderToken', JSON.stringify(data))
            setLoginUserInfo({
                userId: data.id,
                userName: data.user_name,
                userTel: data.phone,
                userMoney: Number(data.balance),
                userCampusId: data.campus_id,
                userCampusName: data.campus_name,
            })
            setOrderNumber(Number(data.responsible), 0)
            router.push('/delivery')
        }
    }
}
</script>

<style scoped>
.login-logo {
    width: 100%;
}

.login-container {
    padding: 20px;
    max-width: 400px;
    margin: 40px auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h1 {
    color: #ff6b00;
    font-size: 24px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #ff6b00;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

.login-btn:hover {
    background-color: #e05d00;
}

.login-footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
}

.login-footer a {
    color: #ff6b00;
    text-decoration: none;
}
</style>