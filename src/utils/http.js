import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user.js'
import { useRouterStore } from '@/stores/modules/router.js'

const service = axios.create({
  timeout: 15000,
  baseURL: '/api'
})

let activeAxios = 0
let timer
const showLoading = () => {
  activeAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (activeAxios > 0) {
      //   emitter.emit('showLoading')
    }
  }, 400)
}

const closeLoading = () => {
  activeAxios--
  if (activeAxios <= 0) {
    clearTimeout(timer)
    // emitter.emit('closeLoading')
  }
}

service.interceptors.request.use(
  (config) => {
    if (!config.customLoading) {
      showLoading()
    }
    const userStore = useUserStore()
    config.headers = {
      token: userStore.token,
      ...config.headers
    }
    return config
  },
  (error) => {
    if (!error.config.customLoading) {
      closeLoading()
    }
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)

service.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    const routerStore = useRouterStore()
    if (!response.config.customLoading) {
      closeLoading()
    }
    if (response.data.code === 1 || response.data.success === true) {
      return response.data
    } else {
      ElMessage({
        showClose: true,
        message: response.data.msg || '接口请求异常',
        type: 'error'
      })
      if ([20001].includes(response.data.code)) {
        userStore.token = ''
        routerStore.platformId = ''
        localStorage.clear()
        router.push({ name: 'Login', replace: true })
      }
      return response.data.msg ? response.data : response
    }
  },
  (error) => {
    if (!error.config.customLoading) {
      closeLoading()
    }
    if (!error.response) {
      ElMessageBox.confirm(
        `
          <p>检测到请求错误</p>
          <p>${error}</p>
          `,
        '请求报错',
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '稍后重试',
          cancelButtonText: '取消'
        }
      )
      return
    }

    switch (error.response.status) {
      case 500:
        ElMessageBox.confirm(
          `
          <p>检测到接口错误${error}</p>
          <p>错误码<span style="color:red"> 500 </span>：此类错误内容常见于后台panic，请先查看后台日志，如果影响您正常使用可强制登出清理缓存</p>
          `,
          '接口报错',
          {
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '清理缓存',
            cancelButtonText: '取消'
          }
        ).then(() => {
          const userStore = useUserStore()
          userStore.token = ''
          localStorage.clear()
          router.push({ name: 'Login', replace: true })
        })
        break
      case 404:
        ElMessageBox.confirm(
          `
            <p>检测到接口错误${error}</p>
            <p>错误码<span style="color:red"> 404 </span>：此类错误多为接口未注册（或未重启）或者请求路径（方法）与api路径（方法）不符--如果为自动化代码请检查是否存在空格</p>
            `,
          '接口报错',
          {
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '我知道了',
            cancelButtonText: '取消'
          }
        )
        break
    }

    return error
  }
)

export default service
