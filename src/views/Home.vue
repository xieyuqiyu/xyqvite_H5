<script setup lang="ts">
import { ref } from 'vue'
import { login,getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'  // 引入Message组件
import dateUtils from '@/utils/date'  // 引入日期工具
import auth from '@/utils/auth' // 引入认证工具
import device from '@/utils/device' // 引入设备工具
import logger from '@/utils/logger' // 引入日志工具



// 定义登录函数
const toLogin = async () => {

  try {
    const res = await login({
      username: 'admin',
      password: 'admin'
    })
    ElMessage.success(res.data.message || '登录成功')  // 显示成功信息
  } catch (error: any) {
    // 捕获错误并显示错误信息
    const errorMessage = error.response?.data?.message || '登录失败，请重试'
    ElMessage.error(errorMessage)
  }

}
// 获取用户信息
const getUser = async () => {
  try {
    const res = await getUserInfo()
    ElMessage.success(`用户信息：${JSON.stringify(res.data)}`)
  } catch (error: any) {
    ElMessage.error(error.response?.data?.message || '获取用户信息失败')
  }
}

// 展示日期功能
const showDateFunctions = () => {
  const now = new Date()
  const formattedDate = dateUtils.format(now)
  ElMessage.success(`当前时间：${formattedDate}`)
  const pastDate = new Date(now.getTime() - 3600 * 1000)
  const relativeTime = dateUtils.fromNow(pastDate)
  ElMessage.info(`相对时间：${relativeTime}`)
}

// 自定义格式日期
const showCustomDateFormat = () => {
  const now = new Date()
  const customFormat = dateUtils.format(now, 'YYYY年MM月DD日 HH时mm分ss秒')
  ElMessage.success(`自定义格式：${customFormat}`)
}

// 展示认证功能
const showAuthFunctions = () => {
  auth.token.set('mock-token-123456')
  auth.user.set({ username: 'admin', permissions: ['read', 'write'] })
  ElMessage.success(`当前登录状态：${auth.isLoggedIn()}`)
  ElMessage.info(`用户权限检查：${auth.user.hasPermission('write') ? '有写权限' : '无写权限'}`)
  auth.logout()
  ElMessage.warning(`登出后登录状态：${auth.isLoggedIn()}`)
}

// 检查权限
const checkPermission = () => {
  const hasReadPermission = auth.user.hasPermission('read')
  const hasWritePermission = auth.user.hasPermission('write')
  ElMessage.info(`读取权限：${hasReadPermission ? '有' : '无'}, 写入权限：${hasWritePermission ? '有' : '无'}`)
}



// 展示设备类型
const showDeviceType = () => {
  const deviceType = device.getDeviceType()
  ElMessage.success(`当前设备类型：${deviceType}`)
}

// 检测iOS
const checkIOS = () => {
  const isIOS = device.isIOS()
  ElMessage.info(`是否是iOS设备：${isIOS ? '是' : '否'}`)
}

// 检测Android
const checkAndroid = () => {
  const isAndroid = device.isAndroid()
  ElMessage.info(`是否是Android设备：${isAndroid ? '是' : '否'}`)
}

// 检测微信
const checkWeChat = () => {
  const isWeChat = device.isWeChat()
  ElMessage.info(`是否是微信环境：${isWeChat ? '是' : '否'}`)
}

// 检测支付宝
const checkAlipay = () => {
  const isAlipay = device.isAlipay()
  ElMessage.info(`是否是支付宝环境：${isAlipay ? '是' : '否'}`)
}

// 获取网络类型
const showNetworkType = () => {
  const networkType = device.getNetworkType()
  ElMessage.success(`当前网络类型：${networkType}`)
}


// 展示日志功能
const showLogFunctions = () => {
  // 测试不同级别的日志
  logger.debug('这是一个调试信息', { tag: '测试' });
  logger.info('这是一个普通信息', { tag: '测试', data: { value: 123 } });
  logger.warn('这是一个警告信息', { tag: '测试' });
  logger.error('这是一个错误信息', { tag: '测试', data: { errorCode: 500 } });
  
  // 测试错误对象
  try {
    throw new Error('这是一个测试错误');
  } catch (e) {
    logger.error(e);
  }
  
  // 获取本地存储的日志
  const logs = logger.getLocalLogs();
  console.log('本地存储的日志:', logs);
  
  // 清除本地日志
  logger.clearLocalLogs();
  ElMessage.success('日志功能测试完成');
}

</script>

<template>
  <div class="container">
    <h1>Hello Vite!</h1>
    <h2>Vite + Vue 3 + TypeScript + VitePress</h2>

    <div class="grid">
      <!-- API 功能框 -->
      <el-card class="function-box">
        <template #header>
          <span>API 功能</span>
        </template>
        <el-button type="primary" size="small" @click="toLogin">调用登录测试</el-button>
        <el-button type="info" size="small" @click="getUser" style="margin-left: 10px;">
          获取用户信息
        </el-button>
      </el-card>

      <!-- 日期功能框 -->
      <el-card class="function-box">
        <template #header>
          <span>日期功能</span>
        </template>
        <el-button type="success" size="small" @click="showDateFunctions">
          展示日期功能
        </el-button>
        <el-button type="warning" size="small" @click="showCustomDateFormat" style="margin-left: 10px;">
          自定义格式日期
        </el-button>
      </el-card>

      <!-- 权限功能框 -->
      <el-card class="function-box">
        <template #header>
          <span>权限功能</span>
        </template>
        <el-button type="warning" size="small" @click="showAuthFunctions">
          展示认证功能
        </el-button>
        <el-button type="danger" size="small" @click="checkPermission" style="margin-left: 10px;">
          检查权限
        </el-button>
      </el-card>

      <!-- 设备功能框 -->
      <el-card class="function-box">
        <template #header>
          <span>设备功能</span>
        </template>
        <el-button type="info" size="small" @click="showDeviceType">
          获取设备类型
        </el-button>
        <el-button type="warning" size="small" @click="checkIOS" style="margin-left: 10px;">
          检测iOS
        </el-button>
        <el-button type="warning" size="small" @click="checkAndroid" style="margin-left: 10px;">
          检测Android
        </el-button>
        <el-button type="success" size="small" @click="checkWeChat" style="margin-left: 10px;">
          检测微信
        </el-button>
        <el-button type="success" size="small" @click="checkAlipay" style="margin-left: 10px;">
          检测支付宝
        </el-button>
        <el-button type="primary" size="small" @click="showNetworkType" style="margin-left: 10px;">
          获取网络类型
        </el-button>
      </el-card>

      <!-- 日志功能框 -->
      <el-card class="function-box">
        <template #header>
          <span>日志功能</span>
        </template>
        <el-button type="primary" size="small" @click="showLogFunctions">
          展示日志功能
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.function-box {
  height: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
  
  .function-box {
    max-width: 100%;
  }
}
</style>