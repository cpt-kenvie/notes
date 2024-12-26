const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 查询用户
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: '未找到该用户' });
    }

    const user = users[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 记录登录历史
    await pool.execute(
      'INSERT INTO login_history (user_id, ip_address, user_agent) VALUES (?, ?, ?)',
      [user.id, req.ip, req.headers['user-agent']]
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // 验证用户名是否已存在
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 验证邮箱是否已存在
    const [existingEmails] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingEmails.length > 0) {
      return res.status(400).json({ message: '邮箱已被使用' });
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建用户，添加 desc 字段的默认值
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, email, avatar_url, `desc`) VALUES (?, ?, ?, ?, ?)',
      [
        username, 
        hashedPassword, 
        email, 
        'https://robohash.org/kenvie',
        '这个人很懒，什么都没写~'  // desc 的默认值
      ]
    );

    // 生成 token
    const token = jwt.sign(
      { userId: result.insertId, username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: result.insertId,
        username,
        email,
        avatar_url: 'https://img.keai.cool/2024/07/1/668a957f2a02f.png',
        desc: '这个人很懒，什么都没写~'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router; 