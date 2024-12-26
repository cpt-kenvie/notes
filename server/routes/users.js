const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/database');

// 获取用户信息
router.get('/profile/:username', auth, async (req, res) => {
  try {
    const username = req.params.username;
    
    const [users] = await pool.execute(
      'SELECT id, username, email, avatar_url, website, `desc`, age FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/profile/:username', auth, async (req, res) => {
  try {
    const username = req.params.username;
    const { email, website, desc, age } = req.body;
    
    // 验证是否是当前用户
    if (username !== req.user.username) {
      return res.status(403).json({ message: '无权修改其他用户的信息' });
    }
    
    await pool.execute(
      'UPDATE users SET email = ?, website = ?, `desc` = ?, age = ? WHERE username = ?',
      [email, website, desc, age, username]
    );

    res.json({ message: '个人信息已更新' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新头像
router.put('/profile/:username/avatar', auth, async (req, res) => {
  try {
    const username = req.params.username;
    const { avatar_url } = req.body;
    
    // 验证是否是当前用户
    if (username !== req.user.username) {
      return res.status(403).json({ message: '无权修改其他用户的头像' });
    }
    
    await pool.execute(
      'UPDATE users SET avatar_url = ? WHERE username = ?',
      [avatar_url, username]
    );

    res.json({ message: '头像已更新' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
