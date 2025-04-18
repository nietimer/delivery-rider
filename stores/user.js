import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userId = ref('');
    const userName = ref('张三');
    const userTel = ref('18787654574');
    const userMoney = ref(0);
    const completeOrder = ref(1);
    const ongoingOrder = ref(1);

    function setUserInfo(data) {
        userName.value = data.userName;
        userTel.value = data.userTel;
    }
    return {
        userId,
        userName,
        userTel,
        userMoney,
        completeOrder,
        ongoingOrder,
        setUserInfo
    };
});