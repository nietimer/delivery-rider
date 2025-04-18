import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('order', () => {
    const orders = ref([
        {
            id: 1,
            status: 'ongoing',
            orderNo: 'ORD20230001',
            restaurant: '麦当劳(人民广场店)',
            customer: '张先生',
            address: '人民广场地铁站1号口',
            distance: '1.2km',
            time: '15:30',
            userTel: '1323456789',
            fee: '8.5'
        },
        {
            id: 3,
            status: 'completed',
            orderNo: 'ORD20230003',
            restaurant: '必胜客(淮海路店)',
            customer: '王先生',
            address: '淮海中路300号',
            distance: '2.1km',
            time: '14:15',
            userTel: '1323456789',
            fee: '9.0'
        },
        {
            id: 4,
            status: 'completed',
            orderNo: 'ORD20230003',
            restaurant: '必胜客(淮海路店)',
            customer: '王先生',
            address: '淮海中路300号',
            distance: '2.1km',
            time: '14:15',
            userTel: '1323456789',
            fee: '9.0'
        },
        {
            id: 5,
            status: 'completed',
            orderNo: 'ORD20230003',
            restaurant: '必胜客(淮海路店)',
            customer: '王先生',
            address: '淮海中路300号',
            distance: '2.1km',
            time: '14:15',
            userTel: '1323456789',
            fee: '9.0'
        },
        {
            id: 7,
            status: 'completed',
            orderNo: 'ORD20230003',
            restaurant: '必胜客(淮海路店)',
            customer: '王先生',
            address: '淮海中路300号',
            distance: '2.1km',
            time: '14:15',
            userTel: '1323456789',
            fee: '9.0'
        }
    ])

    const orderInfo = ref({
        orderNo: '20230418123456789',
        createTime: '2023-04-18 11:30:25',
        totalAmount: 68.50,
        remark: '请尽快送达，谢谢！'
    })

    const orderItems = ref([
        {
            name: '香辣鸡腿堡套餐',
            spec: '中杯可乐+薯条',
            price: 32.00,
            quantity: 1
        },
        {
            name: '新奥尔良烤鸡腿堡',
            spec: '单点',
            price: 18.50,
            quantity: 1
        },
        {
            name: '鸡米花',
            spec: '大份',
            price: 12.00,
            quantity: 1
        }
    ])

    // 配送状态
    const deliveryStatus = ref('配送中')
    // 配送信息
    const estimatedDeliveryTime = ref('今天 12:30-13:00')
    const deliveryAddress = ref('北京市海淀区中关村大街1号科技大厦A座8层808室')
    const contactInfo = ref({
        name: '张先生',
        phone: '13823451234'
    })

    function setOrderInfo(id) {
        console.log(id)
    }

    async function fetchMoreOrders() {
        orders.value.push({
            id: new Date().getTime(),
            status: 'completed',
            orderNo: 'ORD20230003',
            restaurant: '必胜客(淮海路店)',
            customer: '王先生',
            address: '淮海中路300号',
            distance: '2.1km',
            time: '14:15',
        })
        return true;
    }

    return {
        orders,
        orderInfo,
        orderItems,
        deliveryStatus,
        estimatedDeliveryTime,
        deliveryAddress,
        contactInfo,
        setOrderInfo,
        fetchMoreOrders
    };
});