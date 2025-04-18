<template>
  <div id="app">
    <NavBar v-if="showNav" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useUserStore } from '../stores/user'

const { setLoginUserInfo } = useUserStore()
try {
  const data = JSON.parse(localStorage.getItem('riderToken'))
  if (data) {
    setLoginUserInfo({
      userId: data.id,
      userName: data.user_name,
      userTel: data.phone,
      userMoney: Number(data.balance),
      userCampusId: data.campus_id,
      userCampusName: data.campus_name,
      completeOrder: Number(data.responsible),
      ongoingOrder: 0
    })
  }
} catch (error) {
  localStorage.removeItem('riderToken')
  ElMessage({
    message: "登录已失效，请重新登录",
    type: 'warning',
    duration: 4000
  })
  console.log(error)
}
const showNavArray = ['/delivery', '/profile']
const route = useRoute()
const showNav = computed(() => showNavArray.includes(route.path))

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
}
</style>