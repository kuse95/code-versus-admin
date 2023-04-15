<template>
  <el-dropdown>
    <div class="basic-info">
      <el-avatar :size="30" :src="defaultAvatar" />
      <span style="margin-left: 5px">{{ userStore.userInfo.username }}</span>
      <el-icon style="margin-left: 5px"><ArrowDown /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-group">
        <!-- <el-dropdown-item>
          <span style="font-weight: 600">
            当前角色：{{ userStore.userInfo.authority.authorityName }}
          </span>
        </el-dropdown-item> -->
        <el-dropdown-item icon="reading-lamp" @click="userStore.logOut">登 出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useUserStore } from '@/stores/modules/user.js'
import defaultAvatar from '@/assets/tx/tx-male-1.png'

const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.el-dropdown {
  cursor: pointer;
  .basic-info {
    display: flex;
    align-items: center;
  }
}
</style>
