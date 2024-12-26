const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/database');

// 获取用户的所有笔记
router.get('/', auth, async (req, res) => {
  try {
    const [notes] = await pool.execute(
      'SELECT * FROM notes WHERE user_id = ? AND is_deleted = FALSE ORDER BY updated_at DESC',
      [req.user.userId]
    );
    res.json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取单个笔记
router.get('/:id', auth, async (req, res) => {
  try {
    const [notes] = await pool.execute(
      'SELECT * FROM notes WHERE id = ? AND user_id = ? AND is_deleted = FALSE',
      [req.params.id, req.user.userId]
    );

    if (notes.length === 0) {
      return res.status(404).json({ message: '笔记不存在' });
    }

    res.json({ note: notes[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 创建笔记
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
      [req.user.userId, title, content]
    );

    const [newNote] = await pool.execute(
      'SELECT * FROM notes WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ note: newNote[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新笔记
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // 验证笔记所有权
    const [notes] = await pool.execute(
      'SELECT * FROM notes WHERE id = ? AND user_id = ? AND is_deleted = FALSE',
      [req.params.id, req.user.userId]
    );

    if (notes.length === 0) {
      return res.status(404).json({ message: '笔记不存在' });
    }

    // 保存历史版本
    await pool.execute(
      'INSERT INTO note_history (note_id, title, content) VALUES (?, ?, ?)',
      [req.params.id, notes[0].title, notes[0].content]
    );

    // 更新笔记
    await pool.execute(
      'UPDATE notes SET title = ?, content = ? WHERE id = ?',
      [title, content, req.params.id]
    );

    res.json({ message: '笔记已更新' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除笔记（软删除）
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'UPDATE notes SET is_deleted = TRUE WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '笔记不存在' });
    }

    res.json({ message: '笔记已删除' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取笔记历史版本
router.get('/:id/history', auth, async (req, res) => {
  try {
    // 验证笔记所有权
    const [notes] = await pool.execute(
      'SELECT * FROM notes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (notes.length === 0) {
      return res.status(404).json({ message: '笔记不存在' });
    }

    const [history] = await pool.execute(
      'SELECT * FROM note_history WHERE note_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );

    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router; 