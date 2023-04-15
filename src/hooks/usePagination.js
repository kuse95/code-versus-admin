import { ref } from 'vue'

export function usePagination(request, options) {
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const list = ref([])
  const loading = ref(false)
  // 获取列表数据
  async function getDataList() {
    if (!request) return null
    loading.value = true
    try {
      const { result } = await request(page.value, pageSize.value)
      total.value = result?.total || 0
      list.value = result?.list || []
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  }
  // 页码变化
  function onPageChange(value) {
    page.value = value
    getDataList()
  }
  // 单页展示数据数变化
  function onPageSizeChange(value) {
    pageSize.value = value
    getDataList()
  }

  if (options?.immediate) {
    getDataList()
  }
  if (options?.pageSize) {
    pageSize.value = options.pageSize
  }

  return {
    page,
    pageSize,
    total,
    list,
    loading,
    getDataList,
    onPageChange,
    onPageSizeChange
  }
}
