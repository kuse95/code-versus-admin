<template>
  <div>
    <div class="search-bar">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item label="资源名称">
          <el-input v-model="searchInfo.name" />
        </el-form-item>
        <el-form-item label="资源编码">
          <el-input v-model="searchInfo.code" />
        </el-form-item>
        <el-form-item label="所属平台">
          <el-select v-model="searchInfo.platformId">
            <el-option label="全部" :value="''" />
            <el-option
              v-for="item in platforms"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
        <el-button type="primary" icon="plus" @click="onCreate(0)">新增一级菜单</el-button>
      </div>
      <el-table v-loading="loading" :data="tree" row-key="id">
        <el-table-column align="left" label="ID" min-width="100" prop="id" />
        <el-table-column align="left" label="展示名称" min-width="120" prop="name" />
        <el-table-column align="left" label="所属平台" min-width="120" prop="platformId" />
        <el-table-column align="left" label="图标" min-width="140" prop="iconClass">
          <template #default="scope">
            <span v-if="!scope.row.iconClass">未设置</span>
            <span v-else class="menu-icon">
              <el-icon><component :is="scope.row.iconClass" /></el-icon>
              <span>{{ scope.row.iconClass }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="路由名称" min-width="120" prop="code" />
        <el-table-column align="left" label="路由地址" min-width="200" prop="router" />
        <el-table-column align="left" label="排序" min-width="60" prop="sortNum" />
        <el-table-column align="left" label="资源地址" min-width="260" prop="url" />
        <el-table-column align="left" label="资源描述" min-width="180" prop="resourceDesc" />
        <el-table-column align="center" fixed="right" label="操作" width="260">
          <template #default="{ row }">
            <el-button type="primary" link icon="plus" @click="onCreate(row.id)"
              >添加子菜单</el-button
            >
            <el-button type="primary" link icon="edit" @click="onEdit(row.id)">编辑</el-button>
            <el-button
              v-if="Number(row.validStatus) === 1"
              type="warning"
              link
              icon="turn-off"
              @click="onInvalid(row.id)"
              >禁用</el-button
            >
            <el-button v-else type="primary" link icon="open" @click="onValid(row.id)"
              >启用</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle" v-model="showEdit" :before-close="onDialogClose">
      <el-form ref="editForm" :model="editInfo" :rules="rules" :inline="true" label-width="85px">
        <el-form-item label="所属平台" prop="platformId">
          <el-select v-model="editInfo.platformId" clearable>
            <el-option
              v-for="item in platforms"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型" prop="resourceType">
          <el-select v-model="editInfo.resourceType" clearable></el-select>
        </el-form-item>
        <el-form-item label="展示名称" prop="name">
          <el-input v-model="editInfo.name" clearable />
        </el-form-item>
        <el-form-item label="路由地址" prop="router">
          <el-input v-model="editInfo.router" clearable />
        </el-form-item>
        <el-form-item label="路由名称" prop="code">
          <el-input v-model="editInfo.code" clearable />
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="editInfo.url" clearable />
        </el-form-item>
        <el-form-item label="图标" prop="iconClass">
          <el-select v-model="editInfo.iconClass" clearable>
            <template #prefix>
              <el-icon color="#000"><component :is="editInfo.iconClass" /></el-icon>
            </template>
            <el-option v-for="item in icons" :key="item" :value="item">
              <span class="icon-option">
                <el-icon><component :is="item" /></el-icon>
                <span>{{ item }}</span>
              </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input-number v-model="editInfo.sortNum" />
        </el-form-item>
        <el-form-item label="资源描述" prop="resourceDesc" style="width: 80%;">
          <el-input type="textarea" v-model="editInfo.resourceDesc" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onEnter">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import apis from '@/apis/modules/resource'
import platformApi from '@/apis/modules/platform'
import { useTableList } from '@/hooks/useTableList'
import { buildTree } from '@/utils/format'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const platforms = ref([])
const dialogTitle = ref('添加菜单')
const showEdit = ref(false)
const editInfo = ref({
  name: '',
  url: '',
  code: '',
  router: '',
  pid: 0,
  iconClass: '',
  resourceType: '',
  platformId: ''
})
const editForm = ref(null)
const rules = ref({
  name: [],
  url: [],
  code: [],
  router: [],
  iconClass: [],
  resourceType: [],
  platformId: []
})

const icons = computed(() => Object.keys(ElementPlusIconsVue))
const { searchInfo, loading, list, onSearch, onReset, onValid, onInvalid } = useTableList(apis, {
  pageSize: 999
})

const tree = computed(() => buildTree(list.value || []))

function onCreate(id) {
  dialogTitle.value = '添加菜单'
  showEdit.value = true
  editInfo.value.pid = id || 0
}

async function onEdit(id) {
  const { result } = await apis.info(id)
  dialogTitle.value = '编辑菜单'
  editInfo.value = result
  showEdit.value = true
}

function closeEditDialog() {
  editForm.value.resetFields()
  editInfo.value = {}
  showEdit.value = false
}

function onDialogClose() {
  closeEditDialog()
}

function onCancel() {
  closeEditDialog()
}

function onEnter() {
  editForm.value.validate(async (valid) => {
    if (valid) {
      editInfo.value?.id ? await apis.update(editInfo.value) : await apis.create(editInfo.value)
      ElMessage({
        type: 'success',
        message: editInfo.value?.id ? '编辑成功' : '添加成功!'
      })
      closeEditDialog()
      onSearch()
    }
  })
}

async function init() {
  const res = await platformApi.listOfCurrent()
  platforms.value = res?.result || []
}
init()
</script>
<style lang="scss" scoped>
.menu-icon {
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 8px;
  }
}
.icon-option {
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 8px;
  }
}
</style>
