import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getOrderList } from '../src/request/order';

export const useOrderStore = defineStore('order', () => {
    let ongoingPage = 1;
    let completedPage = 1;
    const completeOrder = ref(0);
    const ongoingOrder = ref(0);

    function setOrderNumber(completed, ongoing) {
        completeOrder.value = completed;
        ongoingOrder.value = ongoing;
    }

    const orders = ref([
        // {
        //     id: 1,
        //     status: 'ongoing',
        //     orderNo: 'ORD20230001',
        //     restaurant: '麦当劳(人民广场店)',
        //     customer: '张先生',
        //     address: '人民广场地铁站1号口',
        //     distance: '1.2km',
        //     time: '15:30',
        //     userTel: '1323456789',
        //     fee: '8.5'
        // },
        // {
        //     id: 2,
        //     status: 'pending',
        //     orderNo: 'ORD20230002',
        //     restaurant: '麦当劳(人民广场店)',
        //     customer: '张先生',
        //     address: '人民广场地铁站1号口',
        //     distance: '1.2km',
        //     time: '15:30',
        //     userTel: '1323456789',
        //     fee: '8.5'
        // },
        // {
        //     id: 3,
        //     status: 'completed',
        //     orderNo: 'ORD20230003',
        //     restaurant: '必胜客(淮海路店)',
        //     customer: '王先生',
        //     address: '淮海中路300号',
        //     distance: '2.1km',
        //     time: '14:15',
        //     userTel: '1323456789',
        //     fee: '9.0'
        // }
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

    async function fetchMoreOrders(state) {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // for (let i = 0; i < 10; i++) {
        //     orders.value.push({
        //         id: new Date().getTime(),
        //         status: 'completed',
        //         orderNo: 'ORD20230003',
        //         restaurant: '必胜客(淮海路店)',
        //         customer: '王先生',
        //         address: '淮海中路300号',
        //         distance: '2.1km',
        //         time: '14:15',
        //     })
        // }
        // return true;

        const _state = state == "ongoing" ? 1 : 2;
        const page = state == "ongoing" ? ongoingPage : completedPage;
        try {
            const userInfo = JSON.parse(localStorage.getItem('riderToken'))
            const data = await getOrderList(userInfo.id, _state, page);
            setOrderNumber(data.rider_order_count - data.unsent_num, data.unsent_num)
            // console.log(data.rider_order)
            if (data.rider_order.length != 0) {
                if (state == "ongoing") {
                    ongoingPage += 1
                } else if (state == "completed") {
                    completedPage += 1
                }
                data.rider_order.forEach(item => {
                    orders.value.push({
                        id: item.id,
                        status: item.status == "1" ? 'ongoing' : 'completed',
                        orderNo: item.order_number,
                        restaurant: item.order.store_name,
                        customer: item.order.delivery_name,
                        address: item.order.delivery_address,
                        userTel: item.order.delivery_phone,
                        time: item.create_time,
                        fee: "1"
                    })
                });
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    function initOrders() {
        ongoingPage = 1;
        completedPage = 1;
        orders.value = [];
    }
    return {
        orders,
        orderInfo,
        orderItems,
        deliveryStatus,
        estimatedDeliveryTime,
        deliveryAddress,
        contactInfo,
        completeOrder,
        ongoingOrder,
        setOrderNumber,
        setOrderInfo,
        fetchMoreOrders,
        initOrders
    };
});