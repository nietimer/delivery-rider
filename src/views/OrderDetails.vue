<template>
    <BackHeader>订单详情</BackHeader>
    <div class="order-detail-container">

        <!-- 配送信息卡片 -->
        <div class="delivery-card">
            <div class="status-badge" :style="{ backgroundColor: statusColor }">
                {{ deliveryStatus }}
            </div>
            <div class="delivery-info">
                <div class="info-row">
                    <span class="label">预计送达</span>
                    <span class="value">{{ estimatedDeliveryTime }}</span>
                </div>
                <div class="info-row">
                    <span class="label">配送地址</span>
                    <span class="value">{{ deliveryAddress }}</span>
                </div>
                <div class="info-row">
                    <span class="label">联系人</span>
                    <span class="value">{{ contactInfo.name }} {{ contactInfo.phone }}</span>
                </div>
            </div>
        </div>

        <!-- 订单基本信息 -->
        <div class="order-info-card">
            <h3>订单信息</h3>
            <div class="info-row">
                <span class="label">订单编号</span>
                <span class="value">{{ orderInfo.orderNo }}</span>
            </div>
            <div class="info-row">
                <span class="label">下单时间</span>
                <span class="value">{{ orderInfo.createTime }}</span>
            </div>
            <div class="info-row">
                <span class="label">订单金额</span>
                <span class="value price">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
            </div>
        </div>

        <!-- 展开的详细信息 -->
        <div v-if="showMore" class="expanded-details">
            <!-- 商品列表 -->
            <div class="items-section">
                <h3>购买商品</h3>
                <div v-for="(item, index) in orderItems" :key="index" class="order-item">
                    <div class="item-info">
                        <div class="item-name">{{ item.name }}</div>
                        <div class="item-spec">{{ item.spec }}</div>
                    </div>
                    <div class="item-price">
                        <div>¥{{ item.price.toFixed(2) }}</div>
                        <div class="item-quantity">x{{ item.quantity }}</div>
                    </div>
                </div>
            </div>

            <!-- 备注信息 -->
            <div v-if="orderInfo.remark" class="remark-section">
                <h3>订单备注</h3>
                <div class="remark-content">{{ orderInfo.remark }}</div>
            </div>
        </div>

        <!-- 查看更多按钮 -->
        <div class="toggle-more" @click="toggleShowMore">
            <span>{{ showMore ? '收起详情' : '查看更多订单信息' }}</span>
            <svg :class="{ rotated: showMore }" viewBox="0 0 24 24" width="16" height="16">
                <path d="M7 10l5 5 5-5z" fill="#ff6b00" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BackHeader from '../components/BackHeader.vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../../stores/order'

const { orderInfo, orderItems, deliveryStatus, estimatedDeliveryTime, deliveryAddress, contactInfo } = storeToRefs(useOrderStore())
// 控制查看更多
const showMore = ref(false)
const toggleShowMore = () => {
    showMore.value = !showMore.value
}


const statusColor = computed(() => {
    switch (deliveryStatus.value) {
        case '配送中': return '#ff6b00'
        case '已完成': return '#07c160'
        case '已取消': return '#999'
        default: return '#ff6b00'
    }
})

</script>

<style scoped>
.order-detail-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 25px 15px 15px 15px;
    font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    background-color: #f8f8f8;
    min-height: calc(100vh - 44px);
}

.delivery-card,
.order-info-card {
    background: white;
    border-radius: 12px;
    padding: 18px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.delivery-card {
    position: relative;
    padding-top: 40px;
}

.status-badge {
    position: absolute;
    top: -15px;
    left: 20px;
    background-color: #ff6b00;
    color: white;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(255, 107, 0, 0.3);
}

h3 {
    margin: 0 0 15px 0;
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
}

.info-row:last-child {
    margin-bottom: 0;
}

.label {
    color: #999;
}

.value {
    color: #333;
    text-align: right;
    max-width: 70%;
}

.price {
    color: #ff6b00;
    font-weight: 600;
}

.toggle-more {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff6b00;
    font-size: 14px;
    padding: 12px 0;
    cursor: pointer;
}

.toggle-more svg {
    margin-left: 5px;
    transition: transform 0.3s;
}

.toggle-more .rotated {
    transform: rotate(180deg);
}

.expanded-details {
    background: white;
    border-radius: 12px;
    padding: 18px;
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.items-section {
    margin-bottom: 20px;
}

.order-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
    border-bottom: none;
}

.item-info {
    flex: 1;
}

.item-name {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
}

.item-spec {
    font-size: 12px;
    color: #999;
}

.item-price {
    text-align: right;
    font-size: 14px;
    color: #333;
}

.item-quantity {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
}

.remark-section {
    margin-top: 20px;
}

.remark-content {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}
</style>