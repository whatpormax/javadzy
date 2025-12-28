# 学生管理系统
- 基于 Spring Boot + Vue 3 前后端分离架构开发的学生信息管理系统，聚焦院校学生基本信息与专业信息管理，提供完整的 CRUD 功能，支持分页查询、多条件筛选、数据格式校验等核心特性。

## 技术栈
| 分类 | 技术名称 | 版本/说明 |
|------|----------|-----------|
| 后端 | Java | 25 |
| 后端 | Spring Boot | 3.5.9（核心框架） |
| 后端 | MyBatis | 3.0.5（ORM 工具） |
| 后端 | MySQL | 8.0+（数据库） |
| 后端 | PageHelper | 1.4.7（分页插件） |
| 后端 | Lombok | 简化代码 |

| 分类 | 技术名称 | 版本/说明 |
|------|----------|-----------|
| 前端 | Vue | 3.2.38（核心框架，Composition API） |
| 前端 | Vue Router | 4.1.5（路由） |
| 前端 | Element Plus | 2.4.4（UI 组件） |
| 前端 | Axios | 1.7.2（请求工具） |
| 前端 | Vite | 7.2.4（构建工具） |
## 项目结构
```plaintext
StuManaSys/
├── StudentsManagement/ # 后端工程
├── frontend/           # 前端工程
├── api-doc.md          # 接口文档
├── students.sql        # 数据库初始化脚本
└── students_sample.sql # 示例数据脚本
```
## 功能特性
### 学生管理
- 实现学生信息的新增、编辑、删除、详情查看功能；
- 前后端双重数据校验（如学号唯一性、年龄范围），保障数据合法；
- 支持单条 / 批量删除学生记录，删除前二次确认，防止误操作。
## 快速开始
### 环境要求
- 后端：JDK 25、Maven 3.8+、MySQL 8.x；
- 前端：Node.js 20.19.0+、npm 9.0+。
### 数据库配置
- 创建数据库 students（字符集 utf8mb4），执行 students.sql 初始化表结构；
- 修改后端 application.yml 配置数据库连接信息（用户名、密码、地址）。
## 启动步骤
- 后端：进入 StudentsManagement 目录，执行 mvn spring-boot:run，服务运行在 8080 端口；
- 前端：进入 frontend 目录，先执行 npm install 安装依赖，再执行 npm run dev，服务运行在 5173 端口。
## 文档说明
- 接口文档：api-doc.md，包含所有接口的请求方式、参数、统一响应格式（{code, msg, data}）；
- 技术文档：涵盖架构设计、数据库模型、前后端开发规范。
## 开发说明
### 后端开发
- 按 “实体类→Mapper 接口→Service 层→Controller 层” 流程开发，遵循 Lombok 注解、事务控制、统一响应格式等规范；
### 前端开发
- 基于 Vue 3 Composition API 开发，组件化拆分通用模块，通过 Axios 拦截器处理请求 / 响应，使用 Element Plus 快速搭建交互界面。
已生成代码
