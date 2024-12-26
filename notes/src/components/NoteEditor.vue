<script setup>
import { ref, watch } from 'vue'
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mermaid from '@bytemd/plugin-mermaid'
import breaks from '@bytemd/plugin-breaks'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/github.css'
import { useToast } from 'vue-toastification'
const toast = useToast()
// 中文本地化配置
const locale = {
  write: '编辑',
  preview: '预览',
  writeMode: '编辑模式',
  previewMode: '预览模式',
  edit: '编辑',
  save: '保存',
  undo: '撤销',
  redo: '重做',
  bold: '加粗',
  italic: '斜体',
  strikethrough: '删除线',
  quote: '引用',
  link: '链接',
  image: '图片',
  code: '代码',
  codeBlock: '代码块',
  list: '列表',
  orderedList: '有序列表',
  unorderedList: '无序列表',
  task: '任务',
  taskList: '任务列表',
  heading: '标题',
  line: '分割线',
  table: '插入表格',
  copied: '已复制',
  copy: '复制',
  uploadImage: '上传图片',
  uploadingImage: '正在上传图片...',
  uploadImageFailed: '图片上传失败',
  uploadingImageFailed: '图片上传失败',
  modeChange: '切换模式',
  codeBlockMode: '代码块语言',
  bulletList: '无序列表',
  numberedList: '有序列表',
  checklist: '清单',
  checked: '已完成',
  unchecked: '未完成',
  tableInsert: '插入表格',
  tableDelete: '删除表格',
  tableAddRowBefore: '在上方插入行',
  tableAddRowAfter: '在下方插入行',
  tableDeleteRow: '删除当前行',
  tableAddColBefore: '在左侧插入列',
  tableAddColAfter: '在右侧插入列',
  tableDeleteCol: '删除当前列',
  listCheck: '任务列表',
  listUncheck: '取消任务',
  listBullet: '无序列表',
  listNumber: '有序列表'
}

// 配置插件
const plugins = [
  gfm(), // GitHub Flavored Markdown
  highlight(), // 代码高亮
  math(), // 数学公式
  mermaid(), // 图表
  breaks(), // 软换行
]

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save'])

const content = ref('')
const title = ref('')

// 监听笔记变化，更新编辑器内容
watch(() => props.note, (newNote) => {
  content.value = newNote.content || ''
  title.value = newNote.title || ''
}, { immediate: true, deep: true })

// 编辑器内容变化处理
const handleChange = (v) => {
  content.value = v
}

// 保存笔记
const saveNote = () => {
  if (!title.value.trim()) {
    // messageToast.value?.show('请输入笔记标题', 'warning')
    toast.error('请输入笔记标题')
    return
  }
  
  if (!content.value.trim()) {
    // messageToast.value?.show('请输入笔记内容', 'warning')
    toast.error('请输入笔记内容')
    return
  }

  emit('save', {
    title: title.value,
    content: content.value
  })
}

const handleImageUpload = async (files) => {
  try {
    // ... 上传代码
    messageToast.value?.show('图片上传成功', 'success')
    toast.success('请输入笔记内容')
  } catch (error) {
    messageToast.value?.show('图片上传失败', 'error')
  }
}
</script>

<template>
  <div class="editor">
    <div class="editor-header">
      <input
        v-model="title"
        class="title-input"
        placeholder="笔记标题"
      />
      <div class="toolbar">
        <button 
          class="tool-btn"
          @click="saveNote"
        >
          保存
        </button>
      </div>
    </div>
    
    <div class="editor-content">
      <Editor
        :value="content"
        :plugins="plugins"
        :locale="locale"
        @change="handleChange"
      />
    </div>
  </div>
  <MessageToast ref="messageToast" />
</template>

<style>
/* ByteMD 编辑器自定义样式 */
.bytemd {
  height: calc(100vh - var(--header-height) - var(--footer-height) - 140px) !important;
  border: none !important;
  background: transparent !important;
}

.bytemd-toolbar {
  background-color: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 6px !important;
  margin-bottom: 1rem !important;
}

.bytemd-editor {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 6px !important;
}

.bytemd-preview {
  background: #fff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 6px !important;
}

.CodeMirror {
  font-family: var(--font-mono) !important;
  font-size: 14px !important;
}

.markdown-body {
  font-size: 14px !important;
  line-height: 1.8 !important;
}

.markdown-body p {
  margin: 1.2em 0 !important;
}

.markdown-body ul,
.markdown-body ol {
  line-height: 1.8 !important;
  margin: 1.2em 0 !important;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 1.5em !important;
  margin-bottom: 1em !important;
  line-height: 1.4 !important;
}

.markdown-body pre {
  margin: 1.2em 0 !important;
}

.markdown-body code {
  font-family: var(--font-mono) !important;
}
</style>

<style scoped>
.editor {
  flex: 1;
  padding: 2rem;
  padding-top: calc(var(--header-height) + 2rem);
  padding-bottom: calc(var(--footer-height) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  transition: all 0.3s ease;
  margin: 0 auto;
}

/* 当侧边栏打开时 */
:deep(.sidebar:not(.sidebar-closed)) ~ .editor {
  width: calc(100% - var(--sidebar-width));
  margin-left: var(--sidebar-width);
}

/* 当侧边栏关闭时 */
:deep(.sidebar.sidebar-closed) ~ .editor {
  width: 100%;
  margin-left: 0;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.title-input {
  font-size: 1.5rem;
  padding: 0.75rem;
  border: 2px solid transparent;
  border-radius: 6px;
  background-color: #fff;
  flex: 1;
  transition: all 0.3s ease;
}

.title-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.toolbar {
  display: flex;
  gap: 0.5rem;
}

.tool-btn {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background-color: #f8fafc;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .editor {
    padding: 1rem;
    padding-top: calc(var(--header-height) + 1rem);
  }
  
  :deep(.sidebar:not(.sidebar-closed)) ~ .editor {
    width: calc(100% - 40px);
    margin-left: 40px;
  }
  
  :deep(.sidebar.sidebar-closed) ~ .editor {
    width: 100%;
    margin-left: 0;
  }
  
  .editor-header {
    flex-direction: column;
  }
  
  .toolbar {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 