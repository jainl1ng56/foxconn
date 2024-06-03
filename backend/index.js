const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // 確保這個模塊正確配置數據庫連接

app.use(cors());
app.use(express.json());

// Get all devices
app.get('/api/devices', (req, res) => {
  db.query('SELECT * FROM devices', (error, results) => {
    if (error) {
      console.error('Error fetching devices:', error);
      res.status(500).send('Error fetching devices');
    } else {
      res.json(results);
    }
  });
});

// Add a new device
app.post('/api/devices', (req, res) => {
  const { owner, date, name, model, count, status } = req.body;
  console.log('Received request to add new device:', { owner, date, name, model, count, status }); // 添加日誌
  const query = 'INSERT INTO devices (owner, date, name, model, count, status) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [owner, date, name, model, count, status];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding device:', error); // 更詳細的錯誤日誌
      res.status(500).send('Error adding device');
    } else {
      const newDeviceId = results.insertId; // 獲取插入的設備ID
      const newDevice = { id: newDeviceId, owner, date, name, model, count, status };
      console.log('New device added:', newDevice); // 添加日誌
      res.json(newDevice); // 返回包含設備ID的設備對象
    }
  });
});

// Delete a device
app.delete('/api/devices/:id', (req, res) => {
  const deviceId = req.params.id;
  db.query('DELETE FROM devices WHERE id = ?', [deviceId], (error, results) => {
    if (error) {
      console.error('Error deleting device:', error);
      res.status(500).send('Error deleting device');
    } else {
      res.status(204).send(); // No content response
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
