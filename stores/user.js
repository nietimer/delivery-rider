import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userId = ref('');
    const userName = ref('');
    const userTel = ref('');
    const userMoney = ref(0);
    const userCampusId = ref('');
    const userCampusName = ref('');
    const responsible = ref(false);
    const workStatus = ref(false);

    function setUserInfo(data) {
        userName.value = data.userName;
        userTel.value = data.userTel;
    }

    function setLoginUserInfo(data){
        userId.value = data.userId ? data.userId : userId.value;
        userName.value = data.userName ? data.userName : userName.value;
        userTel.value = data.userTel ? data.userTel : userTel.value;
        userMoney.value = data.userMoney ? data.userMoney : userMoney.value;
        userCampusId.value = data.userCampusId ? data.userCampusId : userCampusId.value;
        userCampusName.value = data.userCampusName ? data.userCampusName : userCampusName.value;
        responsible.value = data.responsible ? data.responsible : responsible.value;
        workStatus.value = data.workStatus ? data.workStatus : workStatus.value;
    }
    return {
        userId,
        userName,
        userTel,
        userMoney,
        userCampusName,
        workStatus,
        responsible,
        setUserInfo,
        setLoginUserInfo
    };
});