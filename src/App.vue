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
import { useRouter } from 'vue-router'
import { setUserInfo } from '../utils/userUtils'
import { getUserInfo } from './request/user'

const router = useRouter()

async function init() {
  try {
    const data = JSON.parse(localStorage.getItem('riderToken'))
    if (data) {
      // setUserInfo(data)
      const userInfo = await getUserInfo(data.id)
      setUserInfo(userInfo)
    }
  } catch (error) {
    localStorage.removeItem('riderToken')
    ElMessage({
      message: "登录已失效，请重新登录",
      type: 'warning',
      duration: 4000
    })
    router.push('/login')
    console.log(error)
  }
}

init()
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