<template>
  <div class="login">
    <div class="container">
      <h1>LinkEditor</h1>

      <el-form
        :model="loginForm"
        label-position="top"
        :rules="rules"
        ref="formRef"
        @keyup.enter="onSubmit(formRef)"
      >

        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit(formRef)" :loading="loginLoading">登录</el-button>
        </el-form-item>

      </el-form>
      <p class="tips">*若忘记账号密码，请联系管理员</p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserState } from '../../store/user'

const { proxy } = getCurrentInstance()
const router = useRouter()
const userState = useUserState()

const formRef = ref()
const loginForm = reactive({
  username: '',
  password: ''
})
const rules = ref({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
const loginLoading = ref(false)

// async function checkRule(formEl) {
//   if (!formEl) return false
//   await formEl.validate((valid, fields) => {
//     if (!valid) {
//       return false
//     } else {
//       return true
//     }
//   })
// }

async function onSubmit(formEl) {

  if (!formEl) return false
  await formEl.validate((valid, fields) => {
    if (valid) {
      loginLoading.value = true

      // 登录
      proxy.$api.User.login(loginForm.username, loginForm.password)
      .then(response => {
        if (response.status === 200) {
          userState.value.email = response.data.email
          userState.value.username = response.data.username
          userState.value.sessionToken = response.data.sessionToken

          ElMessage({
            message: '登陆成功',
            type: 'success',
          })

          router.push({path: '/home', replace: true})

        } else {
          ElMessage.error(`登陆失败：${ response.response.data.error }`)
        }
      })
      .catch(error => {
        ElMessage.error(`登陆失败：${ error }`)
      })
      .finally(() => {
        loginLoading.value = false
      })
    }
  })
}

// proxy.$api.User.getLogin(response.data.objectId)
//         .then(res => {
//           console.log(res)
//         })
//         .catch(err => {
//           console.log(err)
//         })

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    width: 300px;
    margin-top: 100px;
    h1 {
      text-align: center;
    }
    .btn {
      width: 100%;
    }
    .tips {
      font-size: 12px;
      color: gray;
      opacity: .8;
    }
  }
}
</style>