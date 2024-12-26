<template>
  <div class="layout">
    <TheHeader />
    <div class="profile-container">
      <div class="profile-header">
        <h1>个人信息</h1>
        <button 
          v-if="!isEditing"
          class="edit-btn"
          @click="isEditing = true"
        >
          编辑资料
        </button>
      </div>
      
      <div class="profile-content">
        <div class="avatar-section">
          <img :src="user.avatar" :alt="user.name" class="profile-avatar" />
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
            <input
              v-if="isEditing"
              v-model="editedUser.name"
              type="text"
              placeholder="请输入用户名"
            >
            <div v-else class="info-text">{{ user.name }}</div>
          </div>
          
          <div class="form-group">
            <label>邮箱</label>
            <input
              v-if="isEditing"
              v-model="editedUser.email"
              type="email"
              placeholder="请输入邮箱"
            >
            <div v-else class="info-text">{{ user.email }}</div>
          </div>
          
          <div class="form-group">
            <label>年龄</label>
            <input
              v-if="isEditing"
              v-model.number="editedUser.age"
              type="number"
              min="1"
              max="120"
              placeholder="请输入年龄"
            >
            <div v-else class="info-text">{{ user.age }} 岁</div>
          </div>
          
          <div class="form-group">
            <label>个人网站</label>
            <input
              v-if="isEditing"
              v-model="editedUser.website"
              type="url"
              placeholder="请输入网址"
            >
            <div v-else class="info-text">
              <a :href="user.website" target="_blank" class="website-link">
                {{ user.website }}
              </a>
            </div>
          </div>
          
          <div class="form-group">
            <label>个人简介</label>
            <textarea
              v-if="isEditing"
              v-model="editedUser.bio"
              rows="3"
              placeholder="介绍一下自己吧"
            ></textarea>
            <div v-else class="info-text">{{ user.bio }}</div>
          </div>
          
          <div class="form-group">
            <label>个人标签</label>
            <div v-if="isEditing" class="tags-editor">
              <div class="tags-list">
                <span 
                  v-for="tag in editedUser.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                  <button 
                    class="remove-tag"
                    @click="handleRemoveTag(tag)"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="add-tag">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="添加标签"
                  @keyup.enter="handleAddTag"
                >
                <button 
                  class="add-tag-btn"
                  @click="handleAddTag"
                >
                  添加
                </button>
              </div>
            </div>
            <div v-else class="tags-list">
              <span 
                v-for="tag in user.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
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
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

const toast = useToast()

const user = ref({
  name: 'Kenvie',
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=7097341&s=100',
  email: 'kenvie@example.com',
  age: 25,
  website: 'https://keai.cool',
  bio: '热爱生活，热爱编程',
  tags: ['Vue.js', '前端开发', '设计', '摄影']
})

const isEditing = ref(false)
const editedUser = ref({ ...user.value })
const newTag = ref('')

const handleSave = () => {
  // 验证网址格式
  if (editedUser.value.website && !isValidUrl(editedUser.value.website)) {
    toast.error('请输入有效的网址')
    return
  }
  
  user.value = { ...editedUser.value }
  isEditing.value = false
  toast.success('个人信息已更新')
}

const handleCancel = () => {
  editedUser.value = { ...user.value }
  isEditing.value = false
}

const handleAddTag = () => {
  if (!newTag.value) return
  if (!editedUser.value.tags.includes(newTag.value)) {
    editedUser.value.tags.push(newTag.value)
  }
  newTag.value = ''
}

const handleRemoveTag = (tag) => {
  editedUser.value.tags = editedUser.value.tags.filter(t => t !== tag)
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 验证文件类型和大小
  if (!file.type.startsWith('image/')) {
    toast.error('请选择图片文件')
    return
  }
  
  if (file.size > 2 * 1024 * 1024) {
    toast.error('图片大小不能超过2MB')
    return
  }
  
  // 创建预览
  const reader = new FileReader()
  reader.onload = (e) => {
    editedUser.value.avatar = e.target.result
  }
  reader.readAsDataURL(file)
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}
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