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
          @click="handleSelectNote(note)"
        >
          <h3 class="note-title">{{ note.title }}</h3>
          <p class="note-preview">{{ note.content }}</p>
          <div class="note-meta">
            <span class="note-date">{{ formatDate(note.updated_at) }}</span>
          </div>
        </div>
      </div>
      
      <!-- 没有笔记时显示的内容 -->
      <div v-else class="empty-state">
        <p>还没有笔记，开始创建吧！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import request from '../utils/request'
import eventBus from '../utils/eventBus'

const router = useRouter()
const route = useRoute()
const notes = ref([])
const selectedNoteId = ref(null)

// 获取笔记列表
const fetchNotes = async () => {
  try {
    const response = await request('http://localhost:3000/api/notes')
    notes.value = response.notes
    // 如果在笔记页面，设置当前选中的笔记
    if (route.name === 'note') {
      selectedNoteId.value = parseInt(route.params.id)
    }
  } catch (error) {
    console.error('获取笔记列表失败:', error)
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
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
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
  -webkit-line-clamp: 2;
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