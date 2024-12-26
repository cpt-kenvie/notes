<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <a href="https://kenvie.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.keai.cool/2024/07/1/668a957f2a02f.png" alt="Logo" class="footer-logo">
        </a>
        <p class="copyright">&copy; 2024 Notes</p>
      </div>
      
      <div class="footer-right">
        <div class="footer-links">
          <a 
            href="https://github.com/cpt-kenvie/notes" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="footer-link"
          >
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
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
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
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

.footer-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-logo {
  height: 24px;
  filter: brightness(0.9);
}

.copyright {
  color: #64748b;
  font-size: 0.875rem;
}

.footer-right {
  display: flex;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
}

.footer-link:hover {
  color: #171515;
  background-color: #f1f5f9;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .footer-links {
    gap: 1.5rem;
  }
  
  .footer-link {
    font-size: 0.75rem;
  }
  
  .footer-link span {
    display: none;
  }
  
  .icon {
    width: 1rem;
    height: 1rem;
  }
  
  .footer-logo {
    height: 20px;
  }
  
  .copyright {
    font-size: 0.75rem;
  }
}
</style> 