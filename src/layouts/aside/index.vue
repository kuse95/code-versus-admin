<template>
  <div
    class="aside"
    :class="[isCollapse ? 'close' : 'open']"
    :style="{ background: theme.background }"
  >
    <div class="title">
      <img class="title-logo" src="" alt="Logo" />
      <div v-if="!isCollapse" class="title-text">菜鸟的春天</div>
    </div>
    <el-scrollbar style="height: calc(100vh - 60px)">
      <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="active"
          :background-color="theme.background"
          :active-text-color="theme.active"
          class="el-menu-vertical"
          unique-opened
          @select="selectMenuItem"
        >
          <template v-for="item in routeStore.asyncRoutes">
            <aside-component
              v-if="!item.hidden"
              :key="item.name"
              :is-collapse="isCollapse"
              :router-info="item"
              :theme="theme"
            />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script setup>
import AsideComponent from './asideComponent/index.vue'
import { ref, watch, onBeforeMount } from 'vue'
import { useRouterStore } from '@/stores/modules/router'
import { useRoute, useRouter } from 'vue-router'
import { useEmitter } from '@/hooks/useEmitter.js'
const routeStore = useRouterStore()

const route = useRoute()
const emitter = useEmitter()
const router = useRouter()

const theme = ref({
  background: '#191a23',
  activeBackground: 'var(--el-color-primary)',
  activeText: '#fff',
  normalText: '#fff',
  hoverBackground: 'rgba(64, 158, 255, 0.08)',
  hoverText: '#fff'
})
const isCollapse = ref(false)
const active = ref('')

onBeforeMount(() => {
  emitter.on('collapse', (item) => {
    isCollapse.value = item
  })
})

watch(
  () => route,
  () => {
    active.value = route.name
  },
  { deep: true, immediate: true }
)

const selectMenuItem = (index) => {
    router.push({ name: index })
}
</script>
<style lang="scss" scoped>
.aside {
   transition: width 0.2s;
  &.close {
    width: 54px;
  }
  &.open {
    width: 220px;
  }
  .el-menu--collapse {
    width: 100%;
    & > .el-menu-item {
      display: flex;
      justify-content: center;
    }
    li {
        ::v-deep(.el-tooltip),
      ::v-deep(.el-sub-menu__title) {
        padding: 0px 15px !important;
      }
    }
  }
  .title {
    min-height: 60px;
    line-height: 60px;
    text-align: center;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    &-logo {
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 50%;
      padding: 3px;
    }
    &-text {
      display: inline-block;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      padding-left: 10px;
    }
  }
  .el-menu {
    border: none;
  }
}
</style>
