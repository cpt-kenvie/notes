<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'
import ConfirmDialog from './ConfirmDialog.vue'

const toast = useToast()
const isOpen = ref(false)
const confirmDialog = ref(null)
const emit = defineEmits(['logout'])

const user = ref({
  name: 'Kenvie',
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=7097341&s=100',
  email: 'kenvie@example.com',
  bio: '热爱生活，热爱编程'
})

const handleLogout = async () => {
  const confirmed = await confirmDialog.value.show({
    title: '退出登录',
    message: '确定要退出当前账号吗？\n退出后需要重新登录',
    confirmText: '退出',
    cancelText: '取消',
    type: 'warning'
  })
  
  if (confirmed) {
    localStorage.removeItem('isLoggedIn')
    emit('logout')
    toast.success('已退出登录')
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.user-dropdown')
  if (dropdown && !dropdown.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="user-dropdown">
    <ConfirmDialog ref="confirmDialog" />
    <div 
      class="user-trigger"
      @click.stop="isOpen = !isOpen"
    >
      <img :src="user.avatar" :alt="user.name" class="avatar" />
      <span class="username">{{ user.name }}</span>
    </div>
    
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" class="dropdown-menu">
        <div class="menu-header">
          <img :src="user.avatar" :alt="user.name" class="menu-avatar" />
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-email">{{ user.email }}</div>
          </div>
        </div>
        
        <div class="menu-divider"></div>
        
        <router-link to="/profile" class="menu-item" @click="closeDropdown">
          <i class="fas fa-user"></i>
          个人信息
        </router-link>
        
        <router-link to="/settings" class="menu-item" @click="closeDropdown">
          <i class="fas fa-cog"></i>
          系统设置
        </router-link>
        
        <div class="menu-divider"></div>
        
        <button class="menu-item text-red" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          退出登录
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.user-dropdown {
  position: relative;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-trigger:hover {
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
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 50;
}

.menu-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f8fafc;
}

.menu-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.5rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
}

.menu-item:hover {
  background-color: #f8fafc;
  color: var(--primary-color);
}

.menu-item i {
  font-size: 1rem;
  opacity: 0.7;
}

.text-red {
  color: #ef4444 !important;
}

.text-red:hover {
  background-color: #fef2f2 !important;
  color: #dc2626 !important;
}

@media (max-width: 640px) {
  .username {
    display: none;
  }
  
  .dropdown-menu {
    width: 250px;
  }
}
</style> 