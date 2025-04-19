import { useUserStore } from '../stores/user'

export function setUserInfo(data) {
    const { setLoginUserInfo } = useUserStore()
    setLoginUserInfo({
        userId: data.id,
        userName: data.user_name,
        userTel: data.phone,
        userMoney: Number(data.balance),
        userCampusId: data.campus_id,
        userCampusName: data.campus_name,
        responsible: Number(data.responsible),
        workStatus: Number(data.status) == 1 ? true : false
    })
}