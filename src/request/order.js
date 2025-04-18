import http from './index'

export async function getOrderList(riderId, status, page) {
    try {
        const data = await http.get('/api/rider/get_rider_oderList', {
            rider_id: riderId,
            status,
            page,
        })
        if (data.code === 200) {
            return data
        }
    } catch (err) {
        console.log(err)
    }
}

// 完成订单
export async function orderConfirm(orderId) {
    try {
        const data = await http.post('/api/rider/order_confirm', {
            order_id: orderId
        })
        if (data.code === 200) {
            return data
        }
    } catch (err) {
        console.log(err)
    }
}
