<script setup>
import { ref } from 'vue'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// 配置 toast
const toastOptions = {
  position: 'top-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}

createApp({}).use(Toast, toastOptions)
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 引入 JetBrains Mono 字体 */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

/* 全局样式 */
:root {
  --primary-color: #2563eb;
  --sidebar-width: 280px;
  --header-height: 60px;
  --footer-height: 50px;
  --font-mono: 'JetBrains Mono', monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #334155;
  background-color: #f8fafc;
}

/* 代码块使用 JetBrains Mono */
code, pre {
  font-family: var(--font-mono);
}

/* Toast 自定义样式 */
.Vue-Toastification__toast {
  padding: 12px 16px !important;
  min-height: auto !important;
  border-radius: 6px !important;
}

.Vue-Toastification__toast--success {
  background-color: #10b981 !important;
}

.Vue-Toastification__toast--error {
  background-color: #ef4444 !important;
}
</style>
