import http from './index'

// 修改工作状态
export async function changeUserWorkStatus(riderId, status) {
    try {
        const data = await http.post('/api/rider/updata_rider_status', {
            rider_id: riderId,
            status: status ? 1 : 0,
        })
        if (data.code === 200) {
            ElMessage({
                message: "已切换",
                type: 'success',
                duration: 4000
            })
            return true
        }
    } catch (err) {
        console.log(err)
    }
    return false
}