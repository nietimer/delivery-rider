<template>
    <div class="delivery-card" :class="cardClass">
        <div class="card-header">
            <span class="order-no">订单号: {{ order.orderNo }}</span>
            <span class="status-badge">{{ statusText }}</span>
        </div>
        <div class="card-content" @click="toOrderDetails">
            <div class="restaurant-info">
                <h3>{{ order.restaurant }}</h3>
                <p>取餐时间: {{ order.time }}</p>
            </div>
            <div class="customer-info">
                <p>送至: {{ order.customer }} ({{ order.address }})</p>
                <p>距离: {{ order.distance }} | 配送费: ¥{{ order.fee }}</p>
            </div>
        </div>
        <div class="card-actions" v-if="showActions">
            <button class="action-btn complete" @click="$emit('complete', order.id)" v-if="order.status === 'ongoing'">
                完成
            </button>
            <a class="action-btn call" :href="`tel:${ order.userTel }`">
                联系客户
            </a>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    order: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['complete'])

const statusText = computed(() => {
    const statusMap = {
        'pending': '待接单',
        'ongoing': '配送中',
        'completed': '已完成'
    }
    return statusMap[props.order.status]
})

const cardClass = computed(() => `status-${props.order.status}`)

const showActions = computed(() => props.order.status !== 'completed')

const toOrderDetails = () => {
    router.push(`/orderDetails`)
}
</script>

<style scoped>
.delivery-card {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.order-no {
    color: #666;
    font-size: 14px;
}

.status-badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
}

.status-pending .status-badge {
    background-color: #ffecb3;
    color: #ff9800;
}

.status-ongoing .status-badge {
    background-color: #bbdefb;
    color: #2196f3;
}

.status-completed .status-badge {
    background-color: #c8e6c9;
    color: #4caf50;
}

.card-content h3 {
    margin-bottom: 5px;
    font-size: 16px;
}

.card-content p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
}

.card-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    gap: 10px;
}

.action-btn {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.complete {
    background-color: #4caf50;
    color: white;
}

.call {
    background-color: #f5f5f5;
    color: #333;
    text-align: center;
    text-decoration: none;
}
</style>