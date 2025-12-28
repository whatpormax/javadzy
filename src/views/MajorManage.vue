<template>
  <div class="major-manage-container">
    <!-- 页面标题 -->
    <h2>专业管理</h2>
    
    <!-- 搜索和新增区域 -->
    <div class="search-add-area">
      <div class="search-group">
        <el-input
          v-model="searchName"
          placeholder="请输入专业名称"
          class="search-input"
          clearable
        ></el-input>
        <el-button @click="searchMajors" type="primary" class="search-button">
          查询
        </el-button>
        <el-button @click="resetSearch">重置</el-button>
      </div>
      <el-button type="primary" @click="openAddDialog" class="add-button">
        <i class="el-icon-plus"></i> 新增专业
      </el-button>
    </div>
    
    <!-- 专业列表表格 -->
    <div class="table-wrapper">
      <el-table :data="majors" stripe border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="专业名称" min-width="200" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openEditDialog(row)">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="danger" size="small" @click="deleteMajor(row.id)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="专业名称" required>
          <el-input v-model="form.name" placeholder="请输入专业名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMajor">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

// 专业列表数据
const majors = ref([])
// 搜索关键词
const searchName = ref('')
// 新增/编辑弹窗可见性
const dialogVisible = ref(false)
// 弹窗标题
const dialogTitle = ref('新增专业')
// 表单数据
const form = ref({
  name: ''
})
// 当前编辑的专业ID
const currentId = ref(null)
// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 初始化加载专业列表
onMounted(() => {
  getMajors()
})

// 获取专业列表
const getMajors = async () => {
  try {
    const response = await axios.get('/majors', {
      params: {
        name: searchName.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value
      }
    })
    if (response.data.code === 200) {
      majors.value = response.data.data.list || response.data.data
      total.value = response.data.data.total || response.data.data.length
    } else {
      ElMessage.error(response.data.msg || '获取专业列表失败')
    }
  } catch (error) {
    ElMessage.error('获取专业列表失败：' + error.message)
  }
}

// 搜索专业
const searchMajors = () => {
  currentPage.value = 1
  getMajors()
}

// 重置搜索
const resetSearch = () => {
  searchName.value = ''
  currentPage.value = 1
  getMajors()
}

// 打开新增弹窗
const openAddDialog = () => {
  dialogTitle.value = '新增专业'
  currentId.value = null
  form.value = {
    name: ''
  }
  dialogVisible.value = true
}

// 打开编辑弹窗
const openEditDialog = (major) => {
  dialogTitle.value = '编辑专业'
  currentId.value = major.id
  form.value = {
    name: major.name
  }
  dialogVisible.value = true
}

// 保存专业信息（新增或编辑）
const saveMajor = async () => {
  try {
    let response
    if (currentId.value) {
      // 编辑专业
      response = await axios.put(`/majors/${currentId.value}`, form.value)
    } else {
      // 新增专业
      response = await axios.post('/majors', form.value)
    }
    
    if (response.data.code === 200) {
      ElMessage.success(currentId.value ? '编辑专业成功' : '新增专业成功')
      dialogVisible.value = false
      getMajors()
    } else {
      ElMessage.error(response.data.msg || (currentId.value ? '编辑专业失败' : '新增专业失败'))
    }
  } catch (error) {
    ElMessage.error((currentId.value ? '编辑专业失败' : '新增专业失败') + '：' + error.message)
  }
}

// 删除专业
const deleteMajor = async (id) => {
  try {
    const response = await axios.delete(`/majors/${id}`)
    if (response.data.code === 200) {
      ElMessage.success('删除专业成功')
      getMajors()
    } else {
      ElMessage.error(response.data.msg || '删除专业失败')
    }
  } catch (error) {
    ElMessage.error('删除专业失败：' + error.message)
  }
}

// 分页变化处理
const handlePageChange = (page) => {
  currentPage.value = page
  getMajors()
}

// 页大小变化处理
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  getMajors()
}
</script>

<style scoped>
.major-manage-container {
  padding: 20px;
  background-color: #f0f2f5;
}

.search-add-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  width: 250px;
}

.search-button {
  margin-left: 10px;
}

.add-button {
  font-size: 14px;
}

.table-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 确保表格占满容器宽度 */
:deep(.el-table) {
  width: 100% !important;
  min-width: 600px;
}

/* 调整表格行高，提高可读性 */
:deep(.el-table__row) {
  height: 50px;
}
</style>
