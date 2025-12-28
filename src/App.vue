<script setup>
import { ref } from 'vue'
import StudentManage from './views/StudentManage.vue'

const activeIndex = ref('1')
</script>

<template>
  <el-container style="min-height: 100vh;">
    <el-aside width="200px" style="background-color: #545c64;">
      <div style="height: 60px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
        学生管理系统
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-house"></i>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <template #title>学生管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #fff; border-bottom: 1px solid #e0e0e0;">
        <div style="display: flex; justify-content: space-between; align-items: center; height: 100%;">
          <div style="font-size: 20px; font-weight: bold;">学生管理</div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <StudentManage />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

.el-header {
  height: 60px !important;
  line-height: 60px !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-main {
  padding: 20px;
}
</style>
