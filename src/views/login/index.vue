<template>
  <div class="login-page">
    <div class="login_panel">
      <div class="login_panel_form">
        <div class="login_panel_form_title">
          <!-- <img class="login_panel_form_title_logo" :src="$GIN_VUE_ADMIN.appLogo" alt /> -->
          <p class="login_panel_form_title_p">菜鸟的春天</p>
        </div>
        <el-form
          ref="loginForm"
          :model="loginFormData"
          :rules="rules"
          :validate-on-rule-change="false"
          @keyup.enter="submitForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginFormData.username"
              size="large"
              placeholder="请输入用户名"
              suffix-icon="user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              show-password
              size="large"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="submitForm">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_panel_right" />
    </div>
    <platform-picker-dialog v-model="showPlatformPicker"/>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user.js'
import { ElMessage } from 'element-plus'
import PlatformPickerDialog from "@/components/platform-picker-dialog/index.vue"

const userStore = useUserStore()

const showPlatformPicker = ref(false)
const loginForm = ref(null)
const loginFormData = reactive({
  username: '1',
  password: '123456'
})

const checkUsername = (rule, value, callback) => {
  if (value.length < 1) {
    return callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }]
})

function submitForm() {
  loginForm.value.validate(async (v) => {
    if (v) {
      await userStore.login(loginFormData)
      if(userStore.platforms.length !== 1){
        showPlatformPicker.value = true
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true
      })
      return false
    }
  })
}
</script>
<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
