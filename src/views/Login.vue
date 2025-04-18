<template>
    <div class="login-container">
        <div class="login-header">
            <h1>骑手登录</h1>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
                <label for="phone">手机号</label>
                <input type="tel" id="phone" v-model="form.phone" placeholder="请输入手机号" required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="form.password" placeholder="请输入密码" required>
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

const router = useRouter()
const form = ref({
    phone: '',
    password: ''
})

const handleLogin = () => {
    if (form.value.phone && form.value.password) {
        localStorage.setItem('riderToken', 'mock-token')
        router.push('/delivery')
    }
}
</script>

<style scoped>
.login-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    height: 100vh;
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