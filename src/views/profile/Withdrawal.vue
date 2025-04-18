<template>
    <BackHeader>金额提现</BackHeader>
    <div class="withdraw-container">
        <div class="balance-card">
            <h2>可用余额</h2>
            <div class="balance-amount">¥ {{ balance.toFixed(2) }}</div>
        </div>

        <div class="withdraw-form">
            <h3>提现金额</h3>
            <div class="input-group">
                <span class="currency-symbol">¥</span>
                <input v-model="withdrawAmount" type="number" placeholder="输入提现金额" :max="balance" min="0"
                    @input="validateAmount" />
            </div>
            <div class="hint">可提现余额 ¥{{ balance.toFixed(2) }}</div>

            <button class="withdraw-btn" :disabled="!isValidAmount || isProcessing" @click="handleWithdraw">
                <span v-if="!isProcessing">立即提现</span>
                <span v-else class="loading">处理中...</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackHeader from '../../components/BackHeader.vue'
import { useUserStore } from '../../../stores/user'

const { userMoney } = useUserStore()

// 用户余额数据
const balance = ref(userMoney)
const withdrawAmount = ref('')
const isProcessing = ref(false)

// 验证金额是否有效
const isValidAmount = computed(() => {
    const amount = parseFloat(withdrawAmount.value)
    return amount > 0 && amount <= balance.value
})

// 金额输入验证
const validateAmount = () => {
    const amount = parseFloat(withdrawAmount.value)
    if (amount > balance.value) {
        withdrawAmount.value = balance.value
    } else if (amount < 0) {
        withdrawAmount.value = ''
    }
}

// 提现操作
const handleWithdraw = async () => {
    if (!isValidAmount.value) return

    isProcessing.value = true
    try {
        // 这里模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500))
        balance.value -= parseFloat(withdrawAmount.value)
        withdrawAmount.value = ''
        alert('提现申请已提交，请等待处理')
    } finally {
        isProcessing.value = false
    }
}
</script>

<style scoped>
.withdraw-container {
    max-width: 450px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.balance-card {
    background: linear-gradient(135deg, #ff6b00, #ff8c00);
    color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(255, 107, 0, 0.2);
}

.balance-card h2 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 500;
}

.balance-amount {
    font-size: 32px;
    font-weight: 600;
}

.withdraw-form {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.withdraw-form h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
}

.input-group {
    display: flex;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 12px 15px;
    margin-bottom: 8px;
    transition: border-color 0.3s;
}

.input-group:focus-within {
    border-color: #ff6b00;
}

.currency-symbol {
    color: #ff6b00;
    font-weight: bold;
    margin-right: 8px;
    font-size: 18px;
}

input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
}

input::placeholder {
    color: #ccc;
}

.hint {
    font-size: 12px;
    color: #999;
    margin-bottom: 20px;
}

.withdraw-btn {
    width: 100%;
    background-color: #ff6b00;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.withdraw-btn:hover {
    background-color: #ff7b10;
    transform: translateY(-2px);
}

.withdraw-btn:disabled {
    background-color: #ffd8b8;
    cursor: not-allowed;
    transform: none;
}

.loading {
    display: inline-block;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>