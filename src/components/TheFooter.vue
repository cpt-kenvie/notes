<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Markdown笔记</p>
      <div class="footer-links">
        <a href="#" class="footer-link">关于我们</a>
        <a href="#" class="footer-link">使用帮助</a>
        <a href="#" class="footer-link">联系我们</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  height: var(--footer-height);
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .footer-links {
    gap: 1rem;
    font-size: 0.75rem;
  }
}
</style> 