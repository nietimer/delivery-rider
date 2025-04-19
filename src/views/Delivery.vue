<template>
    <div class="delivery-container">
        <div class="header">
            <h1>今日派送</h1>
            <!-- <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">{{ completeOrder + ongoingOrder }}</span>
                    <span class="stat-label">总单数</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ completeOrder }}</span>
                    <span class="stat-label">已完成</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">{{ ongoingOrder }}</span>
                    <span class="stat-label">进行中</span>
                </div>
            </div> -->
        </div>

        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }"
                @click="() => { activeTab = tab.id; noMoreData = false; }">
                {{ tab.label }}
            </button>
        </div>

        <div class="delivery-list" ref="listContainer">
            <DeliveryCard v-for="order in filteredOrders" :key="order.id" :order="order"
                @complete="handleCompleteOrder" />

            <!-- 加载状态指示器 -->
            <div v-if="loading" class="loading-indicator">
                加载中<span class="loader"></span>
            </div>
            <div v-if="noMoreData" class="no-more-data">
                没有更多数据了
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DeliveryCard from '../components/DeliveryCard.vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../../stores/order'
import { orderConfirm } from '../request/order'

const orderStore = useOrderStore()
const { orders, completeOrder, ongoingOrder } = storeToRefs(orderStore)
const { fetchMoreOrders } = orderStore
const activeTab = ref('ongoing')
const tabs = ref([
    // { id: 'pending', label: '待接单' },
    { id: 'ongoing', label: '进行中' },
    { id: 'completed', label: '已完成' }
])

// 懒加载相关状态
const loading = ref(false)
const noMoreData = ref(false)
const listContainer = ref(null)

const filteredOrders = computed(() => {
    return orders.value.filter(order => order.status === activeTab.value)
})

const handleCompleteOrder = (orderId) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
        order.status = 'completed'
        orderConfirm(orderId).then(() => {
            ongoingOrder.value--
            completeOrder.value++
        })
    }
}

// 检查是否滚动到底部
const checkScroll = () => {
    if (loading.value || noMoreData.value) return
    const container = listContainer.value
    if (container.scrollHeight - container.scrollTop <= container.clientHeight + 50) {
        loadMoreData()
    }
}

// 加载更多数据
const loadMoreData = async () => {
    loading.value = true
    try {
        // 假设你的orderStore有一个fetchMoreOrders方法来获取更多数据
        const hasMore = await fetchMoreOrders(activeTab.value)
        noMoreData.value = !hasMore
    } catch (error) {
        console.error('加载数据失败:', error)
    } finally {
        loading.value = false
    }
}

// 添加滚动事件监听
onMounted(() => {
    listContainer.value.addEventListener('scroll', checkScroll)
    // 初始加载数据
    fetchMoreOrders("ongoing")
    fetchMoreOrders("completed")
})

// 移除滚动事件监听
onUnmounted(() => {
    if (listContainer.value) {
        listContainer.value.removeEventListener('scroll', checkScroll)
    }
})
</script>

<style scoped>
.delivery-container {
    padding: 15px;
    padding-bottom: 70px;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background-color: #ff6b00;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
}

.header h1 {
    font-size: 20px;
    margin-bottom: 15px;
}

.stats {
    display: flex;
    justify-content: space-between;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    display: block;
}

.stat-label {
    font-size: 14px;
}

.tabs {
    display: flex;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.tabs button {
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    font-size: 16px;
    cursor: pointer;
}

.tabs button.active {
    border-bottom-color: #ff6b00;
    color: #ff6b00;
    font-weight: bold;
}

.delivery-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.loading-indicator,
.no-more-data {
    text-align: center;
    padding: 10px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.loader {
    width: 12px;
    height: 12px;
    border: 2px solid #999;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>