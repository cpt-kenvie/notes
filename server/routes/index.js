const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// 公开路由
router.get('/public', (req, res) => {
  res.json({ message: '这是公开接口' });
});

// 受保护的路由
router.get('/protected', auth, (req, res) => {
  res.json({ 
    message: '这是受保护的接口',
    user: req.user 
  });
});

module.exports = router;
