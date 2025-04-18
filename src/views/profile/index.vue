<template>
    <div class="profile-container">
        <div class="profile-header">
            <div class="avatar">
                <img src="../../assets/img/default-avatar.webp" alt="骑手头像">
            </div>
            <div class="info">
                <h2>骑手: {{ userName }}</h2>
                <p>地址: {{ userCampusName }}</p>
                <p>电话: {{ userTel }}</p>
            </div>
        </div>

        <div class="stats-section">
            <div class="stat-card">
                <div class="stat-value">{{ completeOrder }}</div>
                <div class="stat-label">累计配送</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">¥{{ userMoney }}</div>
                <div class="stat-label">收入</div>
            </div>
        </div>

        <div class="menu-section">
            <div class="menu-item">
                <span>工作状态</span>
                <el-switch v-model="workStatus" @change="changeWorkStatus"/>
            </div>
            <div class="menu-item" @click="navigateTo('/profile/info')">
                <span>我的信息</span>
                <i>›</i>
            </div>
            <div class="menu-item" @click="navigateTo('/profile/withdrawal')">
                <span>金额提现</span>
                <i>›</i>
            </div>
            <div class="menu-item" @click="handleLogout">
                <span>退出登录</span>
                <i>›</i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { changeUserWorkStatus } from '../../request/user'
import { useUserStore } from '../../../stores/user'
import { useOrderStore } from '../../../stores/order'

const { userId, userName, userTel, userMoney, userCampusName, workStatus } = storeToRefs(useUserStore())
const { completeOrder } = storeToRefs(useOrderStore())

const router = useRouter()

const navigateTo = (path) => {
    router.push(path)
}

const handleLogout = () => {
    localStorage.removeItem('riderToken')
    router.push('/login')
}

const changeWorkStatus =  async () => {
    const res = await changeUserWorkStatus(userId.value, workStatus.value)
    if(!res){
        workStatus.value = !workStatus.value
    }
}
</script>

<style scoped>
.profile-container {
    padding: 15px;
    padding-bottom: 70px;
}

.profile-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info h2 {
    margin-bottom: 8px;
    color: #333;
    font-size: 20px;
}

.info p {
    margin: 4px 0;
    color: #666;
    font-size: 14px;
}

.stats-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 10px;
}

.stat-card {
    flex: 1;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-value {
    font-size: 20px;
    font-weight: bold;
    color: #ff6b00;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 14px;
    color: #666;
}

.menu-section {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.menu-item:last-child {
    border-bottom: none;
}

.menu-item span {
    font-size: 16px;
    color: #333;
}

.menu-item i {
    color: #999;
    font-size: 18px;
    font-style: normal;
}
</style>