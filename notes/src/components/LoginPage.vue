<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const loadSavedCredentials = () => {
  const savedCredentials = localStorage.getItem('savedCredentials')
  if (savedCredentials) {
    const { username: savedUsername, password: savedPassword } = JSON.parse(savedCredentials)
    username.value = savedUsername
    password.value = savedPassword
    rememberMe.value = true
  }
}

loadSavedCredentials()

const handleLogin = async () => {
  if (!username.value || !password.value) {
    toast.error('请输入账号和密码')
    return;
  }

  isLoading.value = true;
  
  try {
    const response = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (rememberMe.value) {
      localStorage.setItem('savedCredentials', JSON.stringify({
        username: username.value,
        password: password.value
      }));
    } else {
      localStorage.removeItem('savedCredentials');
    }

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', response.user.username);
    
    toast.success('登录成功')
    setTimeout(() => {
      router.push('/');
    }, 500);
  } catch (error) {
    toast.error('登录失败')
  } finally {
    isLoading.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="login-container">
    <a 
      href="https://github.com/cpt-kenvie/notes" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="github-link"
    >
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
      </svg>
    </a>

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
        
        <div class="remember-me">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="rememberMe"
              :disabled="isLoading"
            >
            <span class="checkbox-text">记住密码</span>
          </label>
        </div>
        
        <button 
          type="submit"
          class="login-btn"
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="register-link">
        还没有账号？
        <a href="#" @click.prevent="goToRegister">去注册</a>
      </div>
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

.remember-me {
  margin: 0.75rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

/* 开关样式 */
.checkbox-label input[type="checkbox"] {
  appearance: none;
  width: 36px;
  height: 20px;
  background-color: #e5e7eb;
  border-radius: 20px;
  border: none;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

/* 开关滑块 */
.checkbox-label input[type="checkbox"]::before {
  content: '';
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  transition: all 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 选中状态 */
.checkbox-label input[type="checkbox"]:checked {
  background-color: var(--primary-color);
}

/* 选中状态的滑块位置 */
.checkbox-label input[type="checkbox"]:checked::before {
  left: calc(100% - 18px);
}

/* 悬停效果 */
.checkbox-label:hover input[type="checkbox"]:not(:checked) {
  background-color: #d1d5db;
}

.checkbox-label:hover input[type="checkbox"]:checked {
  background-color: #1d4ed8;
}

.checkbox-text {
  color: #4b5563;
  font-size: 0.875rem;
}

/* 禁用状态 */
.checkbox-label input[type="checkbox"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f3f4f6;
}

.checkbox-label input[type="checkbox"]:disabled + .checkbox-text {
  opacity: 0.5;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.register-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

.github-link {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  color: #64748b;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.github-link:hover {
  color: #171515;
  background-color: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 640px) {
  .github-link {
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.5rem;
  }
  
  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style> 