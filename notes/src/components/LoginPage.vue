<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const emit = defineEmits(['login-success'])

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
    toast.error('请输入账号和密码');
    return;
  }

  isLoading.value = true;
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }

    if (rememberMe.value) {
      localStorage.setItem('savedCredentials', JSON.stringify({
        username: username.value,
        password: password.value
      }));
    } else {
      localStorage.removeItem('savedCredentials');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // 先设置登录状态
    localStorage.setItem('isLoggedIn', 'true');
    
    // 发出登录成功事件
    emit('login-success');
    
    // 显示提示
    toast.success('登录成功');
    
    // 确保在提示显示后再跳转
    setTimeout(() => {
      router.push('/');
    }, 500);

    // 在登录成功后保存用户名
    localStorage.setItem('username', data.user.username);

  } catch (error) {
    toast.error(error.message || '登录失败');
  } finally {
    isLoading.value = false;
  }
};
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
</style> 