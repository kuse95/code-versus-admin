import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'
import { ref, watch } from 'vue'
import apis from '@/apis/index'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const token = ref(window.localStorage.getItem('token') || '')
  const userInfo = ref({
    id: '',
    username: '',
    phone: '',
    departmentId: '',
    validStatus: '',
    extInfo: ''
  })
  const platforms = ref([])

  const setToken = (value) => {
    token.value = value
  }

  const setUserInfo = (value) => {
    userInfo.value = value
  }

  const setPlatforms = (value) => {
    platforms.value = value
  }

  const getUserInfo = async () => {
    const { result } = await apis.account.infoOfCurrent()
    setUserInfo(result)
    return result
  }

  const getUserPlatforms = async () => {
    const { result } = await apis.platform.listOfCurrent()
    setPlatforms(result)
    return result
  }

  const login = async ({ username, password }) => {
    const loadingInstance = ref(null)
    try {
      loadingInstance.value = ElLoading.service({
        fullscreen: true,
        text: '登录中，请稍候...'
      })
      const { result } = await apis.auth.login(username, password)
      setToken(result.token)
      // 更新用户信息
      await getUserInfo()
      await getUserPlatforms()
    } catch (error) {
      console.log(error)
    } finally {
      loadingInstance.value.close()
    }
  }

  const logOut = async () => {
    token.value = ''
    sessionStorage.clear()
    localStorage.clear()
    router.push({ name: 'Login', replace: true })
    window.location.reload()
  }

  watch(
    () => token.value,
    () => {
      window.localStorage.setItem('token', token.value)
    }
  )

  return { token, userInfo, platforms, login, logOut, getUserInfo, getUserPlatforms }
})
