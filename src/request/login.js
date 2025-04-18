import http from './index'

export async function login(userName, password) {
    try {
        const { code, msg, rider_info } = await http.post('/api/rider/login', {
            user_name: userName,
            password: password
        })
        if (code === 200) {
            ElMessage({
                message: "登录成功",
                type: 'success',
                duration: 4000
            })
            return rider_info
        }
    } catch (err) {
        console.log(err)
    }
}