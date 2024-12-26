<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
let resolvePromise = null

const props = defineProps({
  title: {
    type: String,
    default: '⚠️确认'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const show = () => {
  isVisible.value = true
  return new Promise(resolve => {
    resolvePromise = resolve
  })
}

const handleConfirm = () => {
  isVisible.value = false
  resolvePromise?.(true)
}

const handleCancel = () => {
  isVisible.value = false
  resolvePromise?.(false)
}

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isVisible" class="dialog-overlay">
        <div class="dialog-backdrop" @click="handleCancel"></div>
        <div class="dialog-container">
          <div class="dialog-content">
            <div class="dialog-header">
              <h3 class="dialog-title">{{ title }}</h3>
              <button class="close-btn" @click="handleCancel">×</button>
            </div>
            <div class="dialog-body">
              <div class="warning-icon">确认删除？</div>
              <p class="dialog-message" style="white-space: pre-line">{{ message }}</p>
            </div>
            <div class="dialog-actions">
              <button 
                class="dialog-btn dialog-btn-cancel" 
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button 
                class="dialog-btn dialog-btn-confirm" 
                @click="handleConfirm"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.dialog-container {
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: 1.5rem;
}

.dialog-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.dialog-message {
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.dialog-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.dialog-btn-cancel {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.dialog-btn-cancel:hover {
  background-color: #e5e7eb;
}

.dialog-btn-confirm {
  background-color: #ef4444;
  color: white;
  border: none;
}

.dialog-btn-confirm:hover {
  background-color: #dc2626;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  line-height: 1;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.dialog-body {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.warning-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.dialog-message {
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}
</style> 