import { usePagination } from '@/hooks/usePagination'
import { useQuerySearch } from './useQuerySearch'
import { ElMessage } from 'element-plus'

export function useTableList(apis, options) {
  if (!apis) {
    console.warn(`请传入接口请求相关方法`)
    return false
  }
  const queryResult = useQuerySearch()
  const request = (page, pageSize) => {
    if (!apis?.list) {
      return Promise.reject(new Error('未传入列表请求相关调用！'))
    }
    const query = { page, pageSize, ...(queryResult?.searchInfo.value || {}) }
    return apis?.list(query)
  }
  const paginationConfig = {
    immediate: true
  }
  if (options?.pageSize) {
    paginationConfig.pageSize = options.pageSize
  }
  const paginationResult = usePagination(request, paginationConfig)
  // 查询
  async function onSearch() {
    paginationResult.page.value = 1
    await paginationResult.getDataList()
  }
  // 启用
  async function onValid(id) {
    if (!apis?.valid) {
      console.error('未传入启用api相关调用！')
      return false
    }
    try {
      await apis?.valid(id)
      ElMessage.success('启用成功！')
      await paginationResult.getDataList()
    } catch (error) {
      ElMessage.error('启用失败！')
    }
  }
  // 禁用
  async function onInvalid(id) {
    if (!apis?.invalid) {
      console.error('未传入禁用api相关调用！')
      return false
    }
    try {
      await apis?.invalid(id)
      ElMessage.success('禁用成功！')
      await paginationResult.getDataList()
    } catch (error) {
      ElMessage.error('禁用失败！')
    }
  }

  return {
    ...queryResult,
    ...paginationResult,
    onSearch,
    onValid,
    onInvalid
  }
}
