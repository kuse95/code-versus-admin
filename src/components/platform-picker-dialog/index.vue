<template>
  <el-dialog v-bind="$attrs" class="platform-picker-dialog" fullscreen center align-center close-icon="CircleClose">
    <div class="platform-picker-content">
      <h1 class="platform-picker-title">进入平台</h1>
      <p class="platform-picker-desc">选择所需平台进入相应工作台</p>
      <el-divider />
      <ul class="platform-picker-list">
        <li class="platform-picker-item" v-for="platform in userStore.platforms" :key="platform.id" @click="onSelected(platform)">
          <span class="platform-picker-item-img">
            <span class="platform-picker-item-default-icon">
              {{ platform.name[0] }}
            </span>
          </span>
          <div class="platform-picker-item-content">
            <span class="platform-picker-item-content-name">
              <span class="platform-picker-item-content-text">{{ platform.name }}</span>
            </span>
            <span class="platform-picker-item-content-description"></span>
          </div>
          <span class="platform-picker-item-extra">
            <el-icon color="#8c8c8c" size="16"><ArrowRight /></el-icon>
          </span>
        </li>
        <li class="platform-picker-item platform-picker-item-create">
          <span class="platform-picker-item-img">
            <el-icon class="platform-picker-item-icon" color="#8c8c8c" size="20"><Plus /></el-icon>
          </span>
          <div class="platform-picker-item-content">
            <span class="platform-picker-item-content-name"> 创建新的平台 </span>
            <span class="platform-picker-item-content-description">
              可用于区分不同业务管理后台
            </span>
          </div>
          <span class="platform-picker-item-extra"></span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script setup>
import { defineEmits } from "vue"
import { useUserStore } from '@/stores/modules/user'
import { useRouterStore } from '@/stores/modules/router'
import { UPDATE_MODEL_EVENT } from "element-plus"
import router from "@/router"
const userStore = useUserStore()
const routerStore = useRouterStore()
const emit = defineEmits([UPDATE_MODEL_EVENT])


const onSelected = async (platform) => {
    await routerStore.setPlatform(platform)
    await router.replace({ name: 'dashboard' })
    emit(UPDATE_MODEL_EVENT, false)
}
</script>
<style lang="scss">
.platform-picker-dialog{
    --el-message-close-size: 26px
}
</style>
<style lang="scss" scoped>

.platform-picker-content {
  width: 492px;
  margin: 0 auto;
}
.platform-picker-title{
    line-height: 50px;
    font-size: 36px;
    color: #262626;
    font-weight: 400;
}
.platform-picker-desc{
    line-height: 24px;
    height: 24px;
    font-size: 18px;
    color: #8c8c8c;
    margin-bottom: 20px;
}
.platform-picker-list {
  list-style: none;
  padding-left: 0;
  .platform-picker-item {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 10px 0;
    cursor: pointer;
    &-img {
      width: 36px;
      height: 36px;
      flex: 0 0 auto;
      margin-right: 16px;
      border-radius: 4px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    &-icon {
      margin: 50% 0 0 50%;
      transform: translate(-50%, -50%);
    }
    &-default-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 1 1 auto;
      font-size: 14px;
      overflow: hidden;
      &-name {
        width: 100%;
        display: inline-flex;
        align-items: center;
      }
      &-text {
        flex: 0 1 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &-extra {
      margin-left: 8px;
    }
    &:hover {
        // background-color: var(--el-bg-color-page);
        .platform-picker-item-content-name{
        color: var(--el-color-primary);
    }
    }
  }
  .platform-picker-item-create {
    .platform-picker-item-img {
      background-color: #f0f0f0;
    }
    .platform-picker-item-content-name {
      line-height: 20px;
      color: #8c8c8c;
      margin-bottom: 4px;
    }
    .platform-picker-item-content-description {
      color: #bfbfbf;
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
