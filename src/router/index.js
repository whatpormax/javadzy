import { createRouter, createWebHistory } from 'vue-router'
import StudentManage from '../views/StudentManage.vue'
import MajorManage from '../views/MajorManage.vue'

const routes = [
  {
    path: '/',
    redirect: '/students'
  },
  {
    path: '/students',
    name: 'StudentManage',
    component: StudentManage
  },
  {
    path: '/majors',
    name: 'MajorManage',
    component: MajorManage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
