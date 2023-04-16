<template>
  <div class="" @click="onClick">
    <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
      <el-icon>
        <ICustomFullscreenShrink v-if="isFullscreen" />
        <ICustomFullscreenExpand v-else />
      </el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import screenFull from 'screenfull'
import { ref, onMounted, onUnmounted } from 'vue'
const isFullscreen = ref(false)

onMounted(() => {
  if (screenFull.isEnabled) {
    screenFull.on('change', changeFullShow)
  }
})

onUnmounted(() => {
  screenFull.off('change')
})

const onClick = () => {
  if (screenFull.isEnabled) {
    screenFull.toggle()
  }
}

const changeFullShow = () => {
  isFullscreen.value = screenFull.isFullscreen
}
</script>
