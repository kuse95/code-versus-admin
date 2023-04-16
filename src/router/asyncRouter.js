import Layout from '@/layouts/index.vue'
const pageModules = import.meta.glob('../views/**/*.vue')

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../', '')
    return k === component
  })
  const matchKey = matchKeys[0]
  return dynamicViewsModules[matchKey]
}

let routeCount = 0
export function replaceRouteComponent(asyncRoutes) {
  routeCount = 0
  asyncRoutes?.forEach((element) => {
    if (element.component) {
      element.component = dynamicImport(pageModules, element.component)
    } else if (element.children?.length) {
      element.component = Layout
    } else {
      delete element['component']
    }
    if (!element?.name) {
      element.name = `route-${routeCount}`
    }
    if (element.children?.length) {
      replaceRouteComponent(element.children)
    }
    routeCount++
  })
}
