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

// 现金提现
export async function withdraw(riderId, money) {
    try {
        const data = await http.post('/api/rider/with_drawal', {
            rider_id: riderId,
            amount: money,
        })
        if (data.code === 200) {
            ElMessage({
                message: "提现成功",
                type: 'success',
                duration: 4000
            })
            return true
        }
    } catch (err) {
        console.log(err)
    }
}

// 获取用户信息
export async function getUserInfo(riderId) {
    try {
        const data = await http.get('/api/rider/user_info', {
            rider_id: riderId
        })
        if (data.code === 200) {
            return data.data
        }
    } catch (err) {
        console.log(err)
    }
}

// 修改用户信息
export async function editUserInfo(userId, data) {
    try {
        const _data = await http.post('/api/rider/edit_user_info', {
            rider_id: userId,
            ...data
        })
        if (_data.code === 200) {
            ElMessage({
                message: "修改成功",
                type: 'success',
                duration: 4000
            })
            return true
        }
    } catch (err) {
        console.log(err)
    }
}
