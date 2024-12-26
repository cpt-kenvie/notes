<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const emit = defineEmits(['login-success'])

const username = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  if (!username.value || !password.value) {
    toast.error('请输入账号和密码')
    return
  }

  isLoading.value = true
  
  // 模拟登录请求
  setTimeout(() => {
    if (username.value === 'Kenvie' && password.value === 'S7865324.') {
      toast.success('登录成功')
      emit('login-success')
      localStorage.setItem('isLoggedIn', 'true')
    } else {
      toast.error('账号或密码错误')
    }
    isLoading.value = false
  }, 800)
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="https://img.keai.cool/2024/07/1/668a957f2a02f.png" alt="Logo" class="logo">
        <h1>欢迎回来</h1>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="账号"
            :disabled="isLoading"
          >
        </div>
        
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            :disabled="isLoading"
          >
        </div>
        
        <button 
          type="submit"
          class="login-btn"
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  height: 48px;
  margin-bottom: 1rem;
  filter: brightness(0.9);
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  position: relative;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f9fafb;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: white;
}

input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

.login-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .login-card {
    padding: 1.5rem;
  }
  
  .logo {
    height: 40px;
  }
  
  h1 {
    font-size: 1.25rem;
  }
  
  input {
    font-size: 0.875rem;
  }
  
  .login-btn {
    font-size: 0.875rem;
  }
}
</style> 