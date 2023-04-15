import { defineStore } from 'pinia'
import { ref } from 'vue'
import apis from '@/apis/index'
import router, { replaceRouteComponent } from '@/router'

export const useRouterStore = defineStore('router', () => {
  const platformId = ref(window.localStorage.getItem('platformId') || null)
  const asyncRoutes = ref([])
  const asyncRouterFlag = ref(0)

  const setPlatform = async (platform) => {
    platformId.value = platform.id
    window.localStorage.setItem('platformId', platform.id)
    await setAsyncRouter()
  }

  const parseResource = (resource) => {
    return (resource || [])
      .map((item) => {
        let component = item.treeInfo?.url
        if (component && !/\.vue$/.test(component)) {
          component += `${component[component.length] === '/' ? '' : '/'}index.vue`
        }
        let route = {
          name: item.treeInfo?.code,
          path: item.treeInfo?.router,
          meta: {
            title: item?.name,
            icon: item.treeInfo?.iconClass
          },
          component: Number(item.treeInfo?.resourceType) !== 3 ? component : null
        }
        if (Array.isArray(item.children) && item.children.length) {
          route.children = parseResource(item.children)
        }
        return route
      })
      .filter((item) => !!item)
  }

  const setAsyncRouter = async () => {
    asyncRouterFlag.value++
    const { result } = await apis.resource.treeOfPlatform(platformId.value)
    let resource = [].concat(
      {
        path: '/',
        children: [
          {
            name: 'Dashboard',
            treeInfo: {
              code: 'dashboard',
              router: '/dashboard',
              name: 'Dashboard',
              url: 'views/dashboard/index.vue',
              iconClass: 'Odometer'
            }
          }
        ]
      },
      result
    )
    const routes = parseResource(resource)
    replaceRouteComponent(routes)
    asyncRoutes.value = routes
    routes.forEach((route) => {
      router.addRoute(route)
    })
  }
  return {
    platformId,
    asyncRoutes,
    asyncRouterFlag,
    setPlatform,
    setAsyncRouter
  }
})
