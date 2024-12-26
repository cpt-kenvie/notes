<script setup>
import UserDropdown from './UserDropdown.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  router.push('/login')
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="logo" @click="goHome">
      <img src="https://img.keai.cool/2024/07/1/668a957f2a02f.png" alt="Logo" />
    </div>
    <UserDropdown @logout="handleLogout" />
  </header>
</template>

<style scoped>
.header {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.8;
}

.logo img {
  height: 32px;
  transition: transform 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
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
}

@media (max-width: 640px) {
  .header {
    padding: 0 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .username {
    display: none;
  }
}
</style> 