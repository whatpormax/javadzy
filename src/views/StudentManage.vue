<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

// 学生列表数据
const students = ref([])
// 搜索关键词
const searchName = ref('')
// 新增/编辑弹窗可见性
const dialogVisible = ref(false)
// 弹窗标题
const dialogTitle = ref('新增学生')
// 表单数据
const form = ref({
  name: '',
  studentId: '',
  gender: '男',
  age: '',
  major: ''
})
// 当前编辑的学生ID
const currentId = ref(null)

// 初始化加载学生列表
onMounted(() => {
  getStudents()
})

// 获取学生列表
const getStudents = async () => {
  try {
    const response = await axios.get('/students', {
      params: { name: searchName.value }
    })
    if (response.data.code === 200) {
      // 确保数据格式正确，包含所有必要字段
      students.value = response.data.data.map(student => ({
        id: student.id || student.studentId,
        name: student.name || '',
        studentId: student.studentId || student.id || '',
        gender: student.gender || '',
        age: student.age || '',
        major: student.major || ''
      }))
    } else {
      ElMessage.error(response.data.msg || '获取学生列表失败')
    }
  } catch (error) {
    ElMessage.error('获取学生列表失败：' + error.message)
  }
}

// 搜索学生
const searchStudents = () => {
  getStudents()
}

// 重置搜索
const resetSearch = () => {
  searchName.value = ''
  getStudents()
}

// 打开新增弹窗
const openAddDialog = () => {
  dialogTitle.value = '新增学生'
  currentId.value = null
  form.value = {
    name: '',
    studentId: '',
    gender: '男',
    age: '',
    major: ''
  }
  dialogVisible.value = true
}

// 打开编辑弹窗
const openEditDialog = (student) => {
  dialogTitle.value = '编辑学生'
  currentId.value = student.id
  form.value = {
    name: student.name,
    studentId: student.studentId,
    gender: student.gender,
    age: student.age,
    major: student.major
  }
  dialogVisible.value = true
}

// 保存学生信息（新增或编辑）
const saveStudent = async () => {
  try {
    let response
    if (currentId.value) {
      // 编辑学生
      response = await axios.put(`/students/${currentId.value}`, form.value)
    } else {
      // 新增学生
      response = await axios.post('/students', form.value)
    }
    
    if (response.data.code === 200) {
      ElMessage.success(currentId.value ? '编辑学生成功' : '新增学生成功')
      dialogVisible.value = false
      getStudents()
    } else {
      ElMessage.error(response.data.msg || (currentId.value ? '编辑学生失败' : '新增学生失败'))
    }
  } catch (error) {
    ElMessage.error((currentId.value ? '编辑学生失败' : '新增学生失败') + '：' + error.message)
  }
}

// 删除学生
const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`/students/${id}`)
    if (response.data.code === 200) {
      ElMessage.success('删除学生成功')
      getStudents()
    } else {
      ElMessage.error(response.data.msg || '删除学生失败')
    }
  } catch (error) {
    ElMessage.error('删除学生失败：' + error.message)
  }
}
</script>

<template>
  <div class="student-manage-container">
    <!-- 搜索和新增区域 -->
    <div class="search-add-area">
      <div class="search-group">
        <el-input
          v-model="searchName"
          placeholder="请输入姓名"
          class="search-input"
          clearable
        >
          <template #append>
            <el-button @click="searchStudents" type="primary">
              <i class="el-icon-search"></i>
            </el-button>
          </template>
        </el-input>
        <el-button @click="resetSearch">重置</el-button>
      </div>
      <el-button type="primary" @click="openAddDialog" class="add-button">
        <i class="el-icon-plus"></i> 新增学生
      </el-button>
    </div>
    
    <!-- 学生列表表格 -->
    <div class="table-wrapper">
      <el-table :data="students" stripe border style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120" align="center" />
        <el-table-column prop="studentId" label="学号" width="180" align="center" />
        <el-table-column prop="gender" label="性别" width="100" align="center" />
        <el-table-column prop="age" label="年龄" width="100" align="center" />
        <el-table-column prop="major" label="专业" min-width="200" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openEditDialog(row)">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="danger" size="small" @click="deleteStudent(row.id)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="学号" required>
          <el-input v-model="form.studentId" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="性别" required>
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" required>
          <el-input v-model.number="form.age" placeholder="请输入年龄" type="number" min="1" max="100" />
        </el-form-item>
        <el-form-item label="专业" required>
          <el-input v-model="form.major" placeholder="请输入专业" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveStudent">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.student-manage-container {
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
  width: 300px;
}

.add-button {
  font-size: 14px;
}

.table-wrapper {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 确保表格占满容器宽度 */
:deep(.el-table) {
  width: 100% !important;
  min-width: 1000px;
}

/* 调整表格行高，提高可读性 */
:deep(.el-table__row) {
  height: 50px;
}
</style>