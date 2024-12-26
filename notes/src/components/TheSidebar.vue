<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>我的笔记</h2>
      <button class="new-note-btn" @click="handleNewNote">
        <span>新建笔记</span>
      </button>
    </div>
    
    <div class="notes-list">
      <!-- 使用 v-if 确保 notes 存在再渲染 -->
      <div v-if="notes && notes.length > 0" class="notes-grid">
        <div 
          v-for="note in notes" 
          :key="note.id"
          class="note-item"
          :class="{ active: selectedNoteId === note.id }"
        >
          <div class="note-content" @click="handleSelectNote(note)">
            <h3 class="note-title">{{ note.title }}</h3>
            <p class="note-preview">{{ note.content }}</p>
            <div class="note-meta">
              <span class="note-date">{{ formatDate(note.updated_at) }}</span>
            </div>
          </div>
          <button 
            class="delete-btn"
            @click.stop="handleDeleteNote(note)"
            title="删除笔记"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 没有笔记时显示的内容 -->
      <div v-else class="empty-state">
        <p>还没有笔记，开始创建吧！</p>
      </div>
    </div>
  </div>
  <ConfirmDialog ref="confirmDialog" />
  <MessageToast ref="messageToast" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import request from '../utils/request'
import eventBus from '../utils/eventBus'
import { useToast } from 'vue-toastification'
import ConfirmDialog from './ConfirmDialog.vue'

const router = useRouter()
const route = useRoute()
const notes = ref([])
const selectedNoteId = ref(null)
const toast = useToast()
const confirmDialog = ref(null)

// 获取笔记列表
const fetchNotes = async () => {
  try {
    const response = await request('/api/notes')
    notes.value = response.notes
    // 如果在笔记页面，设置当前选中的笔记
    if (route.name === 'note') {
      selectedNoteId.value = parseInt(route.params.id)
    }
  } catch (error) {
    console.error('获取笔记列表失败:', error)
    toast.error('获取笔记列表失败')
  }
}

// 监听笔记更新事件
const refreshNotes = () => {
  fetchNotes()
}

onMounted(() => {
  fetchNotes()
  // 监听笔记更新事件
  eventBus.on('notes-updated', refreshNotes)
})

onUnmounted(() => {
  // 清理事件监听
  eventBus.off('notes-updated', refreshNotes)
})

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 选择笔记
const handleSelectNote = (note) => {
  selectedNoteId.value = note.id
  router.push(`/notes/${note.id}`)
}

// 新建笔记
const handleNewNote = () => {
  router.push('/notes/new')
}

// 删除笔记
const handleDeleteNote = async (note) => {
  const confirmed = await confirmDialog.value?.show({
    title: '删除笔记',
    message: '确定要删除这篇笔记吗？此操作不可恢复。',
    confirmText: '删除',
    cancelText: '取消',
    type: 'danger'
  })

  if (!confirmed) return

  try {
    await request(`/api/notes/${note.id}`, {
      method: 'DELETE'
    })
    
    toast.success('笔记已删除')
    
    // 如果当前正在查看被删除的笔记，返回首页
    if (route.params.id === note.id.toString()) {
      router.push('/')
    }
    
    // 刷新笔记列表
    fetchNotes()
  } catch (error) {
    toast.error('删除失败')
  }
}
</script>

<style scoped>
.sidebar {
  width: 300px;
  border-right: 1px solid #e5e7eb;
  background-color: #f9fafb;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.new-note-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.new-note-btn:hover {
  background-color: #1d4ed8;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.notes-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.note-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.note-item.active {
  border-color: var(--primary-color);
  background-color: #eff6ff;
}

.note-content {
  flex: 1;
  min-width: 0;
  cursor: pointer;
}

.delete-btn {
  opacity: 0;
  padding: 0.5rem;
  margin: -0.5rem;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 6px;
  align-self: flex-start;
}

.delete-btn:hover {
  background-color: #fee2e2;
}

.note-item:hover .delete-btn {
  opacity: 1;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* 在移动设备上始终显示删除按钮 */
@media (max-width: 640px) {
  .delete-btn {
    opacity: 1;
  }
}

.note-title {
  font-size: 1rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.note-preview {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.note-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

/* 滚动条样式 */
.notes-list::-webkit-scrollbar {
  width: 6px;
}

.notes-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notes-list::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.notes-list::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style> 