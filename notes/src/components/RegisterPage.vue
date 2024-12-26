<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  // 表单验证
  if (!username.value || !password.value || !email.value) {
    toast.error('请填写完整信息')
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.error('两次密码输入不一致')
    return;
  }

  if (password.value.length < 6) {
    toast.error('密码长度至少6位')
    return;
  }

  isLoading.value = true;
  
  try {
    const response = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        email: email.value
      })
    });

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', response.user.username);
    
    toast.success('注册成功')
    
    setTimeout(() => {
      router.push('/');
    }, 500);
  } catch (error) {
    toast.error('注册失败')
  } finally {
    isLoading.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="register-container">
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

    <div class="register-card">
      <div class="register-header">
        <img src="https://img.keai.cool/2024/07/1/668a957f2a02f.png" alt="Logo" class="logo">
        <h1>创建账号</h1>
      </div>
      
      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="用户名"
            :disabled="isLoading"
          >
        </div>
        
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="邮箱"
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
        
        <div class="form-group">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="确认密码"
            :disabled="isLoading"
          >
        </div>
        
        <button 
          type="submit"
          class="register-btn"
          :disabled="isLoading"
        >
          {{ isLoading ? '注册中...' : '注册' }}
        </button>
        
        <div class="login-link">
          已有账号？
          <a href="#" @click.prevent="goToLogin">去登录</a>
        </div>
      </form>
    </div>
  </div>
  <MessageToast ref="messageToast" />
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  padding: 1rem;
}

.register-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  height: 48px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.register-form {
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

.register-btn {
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

.register-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
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
  .register-card {
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
  
  .register-btn {
    font-size: 0.875rem;
  }
  
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