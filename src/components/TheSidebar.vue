<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import ConfirmDialog from './ConfirmDialog.vue'

const toast = useToast()
const isOpen = ref(true)
const confirmDialog = ref(null)

// 接收父组件传递的笔记列表
defineProps({
  notes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select-note', 'new-note', 'delete-note', 'toggle-sidebar'])

// 创建新笔记
const handleNewNote = () => {
  emit('new-note')
}

// 删除笔记确认
const handleDelete = async (event, note) => {
  event.stopPropagation()
  const confirmed = await confirmDialog.value.show({
    title: '删除笔记',
    message: `确定要删除笔记"${note.title}"吗？\n创建时间：${note.updatedAt}\n此操作不可恢复`,
    confirmText: '删除',
    cancelText: '取消',
    type: 'danger'
  })
  
  if (confirmed) {
    emit('delete-note', note)
    toast.success("笔记已删除")
  }
}

// 切换侧边栏并保存状态
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
  localStorage.setItem('sidebarOpen', isOpen.value)
  emit('toggle-sidebar', isOpen.value)
}

// 组件加载时恢复状态
onMounted(() => {
  const savedState = localStorage.getItem('sidebarOpen')
  if (savedState !== null) {
    isOpen.value = savedState === 'true'
  }
})
</script>

<template>
  <aside :class="['sidebar', { 'sidebar-closed': !isOpen }]">
    <ConfirmDialog ref="confirmDialog" />
    <button 
      class="toggle-btn" 
      @click="toggleSidebar"
      :title="isOpen ? '收起侧边栏' : '展开侧边栏'"
    >
      <span class="toggle-icon">{{ isOpen ? '' : '' }}</span>
    </button>
    <div class="sidebar-content">
      <button class="new-note-btn" @click="handleNewNote">
        <span class="plus-icon">+</span>
        <span class="btn-text">新建笔记</span>
      </button>
      <div class="notes-list">
        <div v-if="notes.length === 0" class="empty-state">
          暂无笔记，点击上方按钮创建
        </div>
        <div
          v-else
          v-for="note in notes"
          :key="note.id"
          class="note-item"
          @click="$emit('select-note', note)"
        >
          <div class="note-content">
            <div class="note-title">{{ note.title }}</div>
            <div class="note-date">{{ note.updatedAt }}</div>
          </div>
          <button 
            class="delete-btn"
            @click="handleDelete($event, note)"
            title="删除笔记"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: #fff;
  border-right: 1px solid #e2e8f0;
  height: 100%;
  position: fixed;
  left: 0;
  top: var(--header-height);
  bottom: var(--footer-height);
  transition: all 0.3s ease;
  z-index: 50;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.sidebar-closed {
  transform: translateX(calc(-1 * var(--sidebar-width)));
}

.toggle-btn {
  position: absolute;
  right: -32px;
  top: 10cap;
  transform: translateY(-50%);
  width: 32px;
  height: 44px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.toggle-btn:hover {
  background-color: #1d4ed8;
  width: 36px;
}

.toggle-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.sidebar-content {
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.new-note-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.new-note-btn:hover {
  background-color: #1d4ed8;
}

.plus-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
}

.note-item {
  padding: 0.75rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-item:hover {
  background-color: #f1f5f9;
  transform: translateX(4px);
}

.note-content {
  flex: 1;
  min-width: 0; /* 防止文字溢出 */
}

.note-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-date {
  font-size: 0.75rem;
  color: #64748b;
}

.delete-btn {
  opacity: 0;
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1.25rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.note-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background-color: #fee2e2;
}

@media (max-width: 768px) {
  .toggle-btn {
    display: flex;
    width: 28px;
    height: 48px;
    right: -28px;
  }
  
  .sidebar {
    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  }

  .sidebar-closed {
    transform: translateX(calc(-1 * var(--sidebar-width)));
  }
}

.empty-state {
  text-align: center;
  color: #64748b;
  padding: 2rem 1rem;
  font-size: 0.875rem;
}
</style> 