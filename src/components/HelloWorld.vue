<script setup>
import { ref, provide } from 'vue'
import { useToast } from 'vue-toastification'
import TheHeader from './TheHeader.vue'
import TheSidebar from './TheSidebar.vue'
import NoteEditor from './NoteEditor.vue'
import TheFooter from './TheFooter.vue'

const toast = useToast()
const currentNote = ref(null)
const notes = ref([])

provide('notes', notes)

const loadNotes = () => {
  const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
  notes.value = savedNotes.sort((a, b) => 
    new Date(b.updatedAt) - new Date(a.updatedAt)
  )
}

loadNotes()

const handleNoteSelect = (note) => {
  currentNote.value = note
}

const handleNewNote = () => {
  const newNote = {
    id: Date.now(),
    title: '新笔记',
    content: '',
    updatedAt: new Date().toISOString().split('T')[0]
  }
  
  const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
  savedNotes.push(newNote)
  localStorage.setItem('notes', JSON.stringify(savedNotes))
  
  notes.value = [newNote, ...notes.value]
  currentNote.value = newNote
  toast.success("新笔记已创建")
}

const handleDeleteNote = (note) => {
  const filteredNotes = notes.value.filter(n => n.id !== note.id)
  notes.value = filteredNotes
  localStorage.setItem('notes', JSON.stringify(filteredNotes))
  
  if (currentNote.value?.id === note.id) {
    currentNote.value = null
  }
}

const isSidebarOpen = ref(true)

const handleSidebarToggle = (isOpen) => {
  isSidebarOpen.value = isOpen
}
</script>

<template>
  <div class="layout">
    <TheHeader />
    <div class="main-content">
      <TheSidebar 
        :notes="notes"
        @select-note="handleNoteSelect"
        @new-note="handleNewNote"
        @delete-note="handleDeleteNote"
        @toggle-sidebar="handleSidebarToggle"
      />
      <NoteEditor 
        v-if="currentNote"
        :note="currentNote"
        :is-sidebar-open="isSidebarOpen"
        @update:note="loadNotes"
      />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}
</style>
