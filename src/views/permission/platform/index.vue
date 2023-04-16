<template>
  <div>
    <div class="search-bar">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item label="资源名称">
          <el-input v-model="searchInfo.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" :disabled="loading" @click="onSearch"
            >查询</el-button
          >
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="table-actions">
        <el-button type="primary" icon="plus">新增</el-button>
      </div>
      <el-table v-loading="loading" :data="list">
        <el-table-column align="left" label="ID" min-width="60" prop="id" />
        <el-table-column align="left" label="名称" min-width="60" prop="name" />
        <el-table-column align="left" label="编码" min-width="60" prop="code" />
      </el-table>
      <div class="table-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="onPageChange"
          @size-change="onPageSizeChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import apis from '@/apis/modules/platform'
import { useTableList } from '@/hooks/useTableList'

const {
  page,
  pageSize,
  total,
  loading,
  list,
  searchInfo,
  onSearch,
  onReset,
  onPageChange,
  onPageSizeChange
} = useTableList(apis)

async function init() {}
init()
</script>
