<template>
  <div class="layout">
    <TheHeader />
    <div class="main-container">
      <TheSidebar />
      <NoteEditor 
        :note="currentNote"
        @save="handleSave"
      />
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '../utils/request'
import eventBus from '../utils/eventBus'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheSidebar from '../components/TheSidebar.vue'
import NoteEditor from '../components/NoteEditor.vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
const route = useRoute()
const router = useRouter()

const currentNote = ref({
  title: '',
  content: ''
})

// 获取笔记内容
const fetchNote = async () => {
  if (route.params.id === 'new') return
  
  try {
    const response = await request(`/api/notes/${route.params.id}`)
    currentNote.value = response.note
  } catch (error) {
    toast.error('获取笔记失败')
    router.push('/')
  }
}

// 保存笔记
const handleSave = async (note) => {
  try {
    if (route.params.id === 'new') {
      const response = await request('/api/notes', {
        method: 'POST',
        body: JSON.stringify(note)
      })
      toast.success('笔记已创建')
      eventBus.emit('notes-updated')
      // 更新路由到新创建的笔记
      router.replace(`/notes/${response.note.id}`)
    } else {
      await request(`/api/notes/${route.params.id}`, {
        method: 'PUT',
        body: JSON.stringify(note)
      })
      toast.success('笔记已保存')
      eventBus.emit('notes-updated')
    }
  } catch (error) {
    toast.error('保存失败')


  }
}

// 监听路由参数变化
watch(() => route.params.id, async (newId) => {
  if (newId && newId !== 'new') {
    await fetchNote()
  } else {
    currentNote.value = {
      title: '',
      content: ''
    }
  }
})

onMounted(() => {
  fetchNote()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  display: flex;
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
}
</style> 