<template>
  <div class="layout">
    <div class="topbar">
      <h1>LinkEditor</h1>
      <div class="info">
        <p>用户名：{{ userState.username }}</p>
        <el-tooltip
          effect="light"
          content="退出登录"
          placement="top"
        >
          <el-button @click="logout" :icon="Right" />
        </el-tooltip>
      </div>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useUserState } from '../../store/user'
import { useRouter } from 'vue-router'
import { Right } from '@element-plus/icons-vue'

const router = useRouter()
const userState = useUserState()

function logout() {
  userState.value.email = ''
  userState.value.username = ''
  userState.value.sessionToken = ''
  router.go(0)
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(../../assets/images/bg.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.topbar {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .info {
    display: flex;
    align-items: center;
    p {
      margin-right: 20px;
    }
  }
}
.container {
  width: 60%;
  // height: 60%;
  min-height: 540px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.178);
  background-color: white;
  overflow: hidden;
}
</style>