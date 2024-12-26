<template>
  <div class="layout">
    <TheHeader />
    <div class="profile-container">
      <div class="profile-header">
        <h1>个人信息</h1>
        <button 
          v-if="!isEditing"
          class="edit-btn"
          @click="startEdit"
        >
          编辑资料
        </button>
      </div>
      
      <div class="profile-content">
        <div class="avatar-section">
          <img :src="userInfo.avatar_url" :alt="userInfo.username" class="profile-avatar" />
          <div v-if="isEditing" class="avatar-upload">
            <input
              type="file"
              accept="image/*"
              class="file-input"
              @change="handleAvatarChange"
              id="avatar-upload"
            >
            <label for="avatar-upload" class="upload-btn">更换头像</label>
          </div>
        </div>
        
        <div class="info-section">
          <div class="form-group">
            <label>用户名</label>
            <div class="info-text">{{ userInfo.username }}</div>
          </div>
          
          <div class="form-group">
            <label>邮箱</label>
            <input
              v-if="isEditing"
              v-model="editedInfo.email"
              type="email"
              placeholder="请输入邮箱"
            >
            <div v-else class="info-text">{{ userInfo.email }}</div>
          </div>
          
          <div class="form-group">
            <label>年龄</label>
            <input
              v-if="isEditing"
              v-model.number="editedInfo.age"
              type="number"
              min="1"
              max="120"
              placeholder="请输入年龄"
            >
            <div v-else class="info-text">{{ userInfo.age }} 岁</div>
          </div>
          
          <div class="form-group">
            <label>个人网站</label>
            <input
              v-if="isEditing"
              v-model="editedInfo.website"
              type="url"
              placeholder="请输入网址"
            >
            <div v-else class="info-text">
              <a :href="userInfo.website" target="_blank" class="website-link">
                {{ userInfo.website }}
              </a>
            </div>
          </div>
          
          <div class="form-group">
            <label>个人简介</label>
            <textarea
              v-if="isEditing"
              v-model="editedInfo.bio"
              rows="3"
              placeholder="介绍一下自己吧"
            ></textarea>
            <div v-else class="info-text">{{ userInfo.bio }}</div>
          </div>
          
          <div v-if="isEditing" class="action-buttons">
            <button class="cancel-btn" @click="handleCancel">取消</button>
            <button class="save-btn" @click="handleSave">保存</button>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import request from '../utils/request'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

const toast = useToast()
const isEditing = ref(false)
const userInfo = ref({})
const editedInfo = ref({})

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const username = localStorage.getItem('username') || '';  // 从本地存储获取用户名
    const response = await request(`http://localhost:3000/api/users/profile/${username}`);
    userInfo.value = response.user;
  } catch (error) {
    toast.error('获取用户信息失败');
  }
};

// 开始编辑
const startEdit = () => {
  editedInfo.value = { ...userInfo.value }
  isEditing.value = true
}

// 取消编辑
const handleCancel = () => {
  isEditing.value = false
  editedInfo.value = { ...userInfo.value }
}

// 保存修改
const handleSave = async () => {
  try {
    const username = userInfo.value.username;
    await request(`http://localhost:3000/api/users/profile/${username}`, {
      method: 'PUT',
      body: JSON.stringify({
        email: editedInfo.value.email,
        website: editedInfo.value.website,
        desc: editedInfo.value.desc,
        age: editedInfo.value.age
      })
    });
    
    userInfo.value = { ...editedInfo.value };
    isEditing.value = false;
    toast.success('个人信息已更新');
  } catch (error) {
    toast.error('更新失败');
  }
};

// 更新头像
const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    toast.error('请选择图片文件')
    return
  }
  
  if (file.size > 2 * 1024 * 1024) {
    toast.error('图片大小不能超过2MB')
    return
  }
  
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const avatar_url = e.target.result;
      const username = userInfo.value.username;
      
      await request(`http://localhost:3000/api/users/profile/${username}/avatar`, {
        method: 'PUT',
        body: JSON.stringify({ avatar_url })
      });
      
      userInfo.value.avatar_url = avatar_url;
      toast.success('头像已更新');
    };
    reader.readAsDataURL(file);
  } catch (error) {
    toast.error('头像更新失败');
  }
};

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  width: 100vw;
  padding: 2rem;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: calc(var(--footer-height) + 2rem);
  flex: 1;
}

.profile-header {
  width: 90vh;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.edit-btn {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn:hover {
  background-color: #1d4ed8;
}

.profile-content {
  width: 90vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 5rem;
}

.avatar-section {
  text-align: center;
}

.profile-avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
}

.avatar-upload {
  margin-top: 1rem;
}

.upload-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  background-color: #e5e7eb;
}

.form-group {
  margin-bottom: 2rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.75rem;
}

input, textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #f9fafb;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.info-text {
  padding: 0.875rem 1rem;
  color: #1f2937;
  background-color: #f9fafb;
  border-radius: 8px;
  min-height: 42px;
  display: flex;
  align-items: center;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  margin-top: 3rem;
}

.cancel-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background-color: #e5e7eb;
}

.save-btn {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn:hover {
  background-color: #1d4ed8;
}

.website-link {
  color: var(--primary-color);
  text-decoration: none;
}

.website-link:hover {
  text-decoration: underline;
}

.file-input {
  display: none;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 1rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #4b5563;
}

.remove-tag {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 1rem;
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.remove-tag:hover {
  color: #ef4444;
}

.add-tag {
  display: flex;
  gap: 0.5rem;
}

.add-tag input {
  flex: 1;
}

.add-tag-btn {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-tag-btn:hover {
  background-color: #1d4ed8;
}

.tags-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-section {
  max-width: 100vh;
}

@media (max-width: 90vh) {
  .profile-header,
  .profile-content {
    width: 100%;
    padding: 0 1rem;
  }
  
  .profile-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style> 