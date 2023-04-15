<template>
  <el-container class="layout">
    <el-aside>
      <Aside />
    </el-aside>
    <el-main>
      <div class="top-bar" :style="{ width: `calc(100% - ${isCollapse ? '54px' : '220px'})` }">
        <el-header>
          <el-row class="pd-0">
            <el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1" style="z-index: 100">
              <div class="menu" @click="totalCollapse">
                <el-icon><DArrowRight v-if="isCollapse" /><DArrowLeft v-else /></el-icon>
              </div>
            </el-col>
            <el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14" :pull="1">
              <el-breadcrumb class="breadcrumb">
                <el-breadcrumb-item
                  v-for="item in route.matched.slice(1, route.matched.length)"
                  :key="item.path"
                  >{{ item.meta.title }}</el-breadcrumb-item
                >
              </el-breadcrumb>
            </el-col>
            <el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9">
              <div class="right-box">
                <Dropdown />
              </div>
            </el-col>
          </el-row>
        </el-header>
        <historyTagBar />
      </div>
      <router-view
        v-if="reloadFlag"
        v-slot="{ Component }"
        v-loading="loadingFlag"
        element-loading-text="正在加载中"
        class="admin-box"
      >
        <div>
          <transition mode="out-in" name="el-fade-in-linear">
            <!-- <keep-alive :include="routerStore.keepAliveRouters"> -->
            <component :is="Component" />
            <!-- </keep-alive> -->
          </transition>
        </div>
      </router-view>
    </el-main>
  </el-container>
</template>
<script setup>
import Aside from './aside/index.vue'
import Dropdown from "./dropdown/index.vue"
import historyTagBar from "./historyTagBar/index.vue"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useEmitter } from '@/hooks/useEmitter.js'

const route = useRoute()
const emitter = useEmitter()

const isCollapse = ref(false)
const reloadFlag = ref(true)
const loadingFlag = ref(false)

onMounted(() => {
  emitter.emit('collapse', isCollapse.value)
})

const totalCollapse = () => {
  isCollapse.value = !isCollapse.value
  emitter.emit('collapse', isCollapse.value)
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  .el-aside {
    width: auto !important;
  }

  .el-main {
    background-color: #f0f2f5;
    padding: 0;
  }
}
.top-bar {
  position: fixed;
  top: 0;
  box-sizing: border-box;
  z-index: 999;
}
.el-header {
  padding: 0 16px;
  height: 60px;
  background: #fff;
}
.admin-box {
  min-height: calc(100vh - 200px);
  padding: 12px 16px;
  margin: 100px 2px 20px;
}
.menu {
  cursor: pointer;
  font-size: 20px;
  color: #000000;
  margin-top: 20px;
}
.breadcrumb {
  height: 60px;
  line-height: 60px;
  display: inline-block;
  padding: 0;
  margin-left: 46px;
  font-size: 16px;
}
.right-box {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
