import router from '@/router'
import Nprogress from 'nprogress'
import { useUserStore } from '@/stores/modules/user'
import { useRouterStore } from '@/stores/modules/router'

const whiteList = ['Login']

router.beforeEach(async (to, from) => {
  Nprogress.start()
  const userStore = useUserStore()
  const routerStore = useRouterStore()
  document.title = to.meta.title || '菜鸟的春天'
  const token = userStore.token
  const platformId = routerStore.platformId
  // 页面在白名单中
  if (whiteList.indexOf(to.name) > -1) {
    if (token && platformId) {
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await userStore.getUserInfo()
        await routerStore.setAsyncRouter()
      }
      return { name: 'Dashboard' }
    } else {
      return true
    }
  } else {
    if (token && platformId) {
      if (!to.matched.length || !routerStore.asyncRouterFlag) {
        await userStore.getUserInfo()
        await routerStore.setAsyncRouter()
        return { ...to, replace: true }
      }
      if (to.matched.length) {
        return true
      } else {
        return { path: '/layout/404' }
      }
    } else {
      return {
        name: 'Login',
        query: {
          redirect: document.location.hash
        }
      }
    }
  }
})

router.afterEach(() => {
  // 路由加载完成后关闭进度条
  document.getElementsByClassName('main-cont main-right')[0]?.scrollTo(0, 0)
  Nprogress.done()
})

router.onError(() => {
  // 路由发生错误后销毁进度条
  Nprogress.remove()
})
