<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const isOpen = ref(false)
const userInfo = ref({
  username: '',
  email: '',
  avatar_url: ''
})

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const username = localStorage.getItem('username')
    const response = await request(`/api/users/profile/${username}`)
    userInfo.value = response.user
  } catch (error) {
    console.error('获取用户信息失败:', error)
    toast.error('获取用户信息失败:')
  }
}

// 处理登出
const handleLogout = () => {
  toast.success('退出成功')
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')
  localStorage.removeItem('username')

  router.push('/login')
}

// 跳转到个人资料页
const goToProfile = () => {
  router.push('/profile')
  isOpen.value = false
}

// 添加点击外部关闭下拉菜单的处理
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  fetchUserInfo()
  // 添加点击事件监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 移除事件监听
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown">
    <div 
      class="user-info"
      @click.stop="isOpen = !isOpen"
    >
      <img 
        :src="userInfo.avatar_url || 'https://img.keai.cool/2024/07/1/668a957f2a02f.png'" 
        :alt="userInfo.username"
        class="avatar"
      />
      <span class="username">{{ userInfo.username }}</span>
    </div>
    
    <div 
      v-if="isOpen"
      class="dropdown-menu"
    >
      <div class="menu-header">
        <img 
          :src="userInfo.avatar_url || 'https://img.keai.cool/2024/07/1/668a957f2a02f.png'" 
          :alt="userInfo.username"
          class="menu-avatar"
        />
        <div class="user-details">
          <div class="menu-username">{{ userInfo.username }}</div>
          <div class="menu-email">{{ userInfo.email }}</div>
        </div>
      </div>
      
      <div class="menu-divider"></div>
      
      <button 
        class="menu-item"
        @click="goToProfile"
      >
        个人资料
      </button>
      
      <button 
        class="menu-item logout"
        @click="handleLogout"
      >
        退出登录
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-info:hover {
  background-color: #e2e8f0;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 240px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 50;
}

.menu-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f8fafc;
}

.menu-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.menu-username {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.menu-email {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
}

.menu-item {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #1f2937;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #f1f5f9;
}

.menu-item.logout {
  color: #ef4444;
}

.menu-item.logout:hover {
  background-color: #fef2f2;
}

@media (max-width: 640px) {
  .username {
    display: none;
  }
  
  .dropdown-menu {
    width: 200px;
  }
}
</style> 