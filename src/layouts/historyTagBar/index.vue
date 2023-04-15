<template>
  <div class="history-tag-bar">
    <el-tabs
      :closable="!(tags.length === 1)"
      type="card"
      @contextmenu.prevent="onOpenMenu"
      @tab-click="onTabChange"
      @tab-remove="onTabRemove"
    >
      <el-tab-pane
        v-for="item in tags"
        :key="getFmtString(item)"
        :label="item.meta.title"
        :name="getFmtString(item)"
        :tab="item"
        class="history-tab"
      >
        <template #label>
          <span
            :tab="item"
            :style="{
              color: activeValue === getFmtString(item) ? 'var(--el-color-primary)' : '#333'
            }"
            ><i
              class="dot"
              :style="{
                backgroundColor:
                  activeValue === getFmtString(item) ? 'var(--el-color-primary)' : '#ddd'
              }"
            />
            {{ item.meta?.title }}</span
          >
        </template>
      </el-tab-pane>
    </el-tabs>

    <ul v-show="showContextMenu" :style="contentMenuPositionStyle" class="contextmenu">
      <li @click="onCloseAll">关闭所有</li>
      <li @click="onCloseLeft">关闭左侧</li>
      <li @click="onCloseRight">关闭右侧</li>
      <li @click="onCloseOther">关闭其他</li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmitter } from '@/hooks/useEmitter'
const route = useRoute()
const router = useRouter()
const emitter = useEmitter()
const defaultRouter = ref('dashboard')

const tags = ref([])
const tagMap = ref({})
const activeValue = ref('')
const contentMenuPosition = ref([0, 0])
const showContextMenu = ref(false)

const contentMenuPositionStyle = computed(() => ({
  left: contentMenuPosition.value[0] + 'px',
  top: contentMenuPosition.value[1] + 'px'
}))

const getFmtString = (item) => {
  return item.name + JSON.stringify(item.query) + JSON.stringify(item.params)
}

const isSame = (route1, route2) => {
  if (route1.name !== route2.name) {
    return false
  }
  if (
    Object.keys(route1.query).length !== Object.keys(route2.query).length ||
    Object.keys(route1.params).length !== Object.keys(route2.params).length
  ) {
    return false
  }
  for (const key in route1.query) {
    if (route1.query[key] !== route2.query[key]) {
      return false
    }
  }
  for (const key in route1.params) {
    if (route1.params[key] !== route2.params[key]) {
      return false
    }
  }
  return true
}
const setTab = (route) => {
  if (!tags.value.some((item) => isSame(item, route))) {
    const obj = {}
    obj.name = route.name
    obj.meta = { ...route.meta }
    delete obj.meta.matched
    obj.query = route.query
    obj.params = route.params
    tags.value.push(obj)
  }
  window.sessionStorage.setItem('activeValue', getFmtString(route))
}

const onTabChange = (pane) => {
  const name = pane?.props?.name
  if (!name) return
  const tab = tagMap.value[name]
  router.push({
    name: tab.name,
    query: tab.query,
    params: tab.params
  })
}

const onTabRemove = (name) => {
  const index = tags.value.findIndex((item) => getFmtString(item) === name)
  if (getFmtString(route) === name) {
    if (tags.value.length === 1) {
      router.push({ name: defaultRouter.value })
    } else {
      if (index < tags.value.length - 1) {
        router.push({
          name: tags.value[index + 1].name,
          query: tags.value[index + 1].query,
          params: tags.value[index + 1].params
        })
      } else {
        router.push({
          name: tags.value[index - 1].name,
          query: tags.value[index - 1].query,
          params: tags.value[index - 1].params
        })
      }
    }
  }
  tags.value.splice(index, 1)
}

const onCloseAll = () => {
  tags.value = []
  router.push({ name: defaultRouter.value })
  showContextMenu.value = false
  sessionStorage.removeItem('tags')
}

const onCloseLeft = () => {}

const onCloseRight = () => {}

const onCloseOther = () => {}

const onOpenMenu = (e) => {
  if (tags.value.length === 1 && route.name === defaultRouter.value) {
    return false
  }
  const name = e.srcElement.offsetParent.id || e.srcElement.id
  if (name) {
    showContextMenu.value = true
    contentMenuPosition.value = [e.clientX, e.clientY + 10]
  }
}

watch(
  () => route,
  (to) => {
    if (to.name === 'Login') {
      return
    }
    if (!tags.value.length) {
      tags.value = JSON.parse(sessionStorage.getItem('historys')) || [
        {
          name: route.name,
          meta: { ...route.meta },
          query: route.query,
          params: route.params
        }
      ]
    }
    tags.value = tags.value.filter((item) => !item.meta.hideInTab)
    setTab(to)
    sessionStorage.setItem('tags', JSON.stringify(tags.value))
    activeValue.value = window.sessionStorage.getItem('activeValue')
  },
  { deep: true, immediate: true }
)

watch(
  () => tags.value,
  () => {
    sessionStorage.setItem('tags', JSON.stringify(tags.value))
    tagMap.value = {}
    tags.value.forEach((item) => {
      tagMap.value[getFmtString(item)] = item
    })
    emitter.emit('setKeepAlive', tags.value)
  },
  {
    deep: true
  }
)

watch(
  () => showContextMenu.value,
  () => {
    if (showContextMenu.value) {
      document.body.addEventListener('click', () => {
        showContextMenu.value = false
      })
    } else {
      document.body.removeEventListener('click', () => {
        showContextMenu.value = false
      })
    }
  }
)
</script>
<style lang="scss" scoped>
.history-tag-bar {
  background: #fff;
  padding: 0 6px;
  border-top: 1px solid #f4f4f4;
  padding: 0;
  :deep(.el-tabs__header) {
    margin: 0px 0 0 0;
    .el-tabs__item {
      height: 40px;
      border: none;
      border-left: 1px solid #f4f4f4;
      border-right: 1px solid #f4f4f4;
      + .el-tabs__item {
        border-left: 0px solid #f4f4f4;
      }
      .el-icon-close {
        color: initial !important;
      }
      .dot {
        content: '';
        width: 9px;
        height: 9px;
        margin-right: 8px;
        display: inline-block;
        border-radius: 50%;
        transition: background-color 0.2s;
      }
    }
    .el-tabs__item.is-active {
      background-color: rgba(64, 158, 255, 0.08);
    }
    .el-tabs__nav {
      border: none;
    }
  }
}

.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
  li {
    margin: 0;
    padding: 7px 16px;
    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}
</style>
