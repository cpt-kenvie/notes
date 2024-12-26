<template>
  <div class="layout">
    <TheHeader />
    <div class="main-container">
      <TheSidebar />
      <div class="content">
        <h1>欢迎回来</h1>
        <!-- 这里可以放置主页内容 -->
      </div>
    </div>
    <TheFooter />
  </div>
  <MessageToast ref="messageToast" />
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheSidebar from '../components/TheSidebar.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()


const handleError = (error) => {
  toast.error(error.message || '操作失败')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  display: flex;
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
}

.content {
  flex: 1;
  padding: 2rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
}
</style> 