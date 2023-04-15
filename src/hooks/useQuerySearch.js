import { ref } from 'vue'

export function useQuerySearch() {
  const searchInfo = ref({})
  // 重置查询条件
  function onReset() {
    searchInfo.value = {}
  }
  return { searchInfo, onReset }
}
