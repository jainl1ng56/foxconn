// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

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
  const { owner, date, name, model, count, project, location } = req.body;
  const query = 'INSERT INTO devices (owner, date, name, model, count, project, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [owner, date, name, model, count, project, location];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding device:', error);
      res.status(500).send('Error adding device');
    } else {
      const newDeviceId = results.insertId; // 获取插入的设备ID
      const newDevice = { id: newDeviceId, owner, date, name, model, count, project, location };

      // 更新 total 表中的 currentcount
      const updateQuery = `
        UPDATE total
        SET currentcount = totalcount - (
          SELECT SUM(count)
          FROM devices
          WHERE name = ? AND model = ?
        )
        WHERE name = ? AND model = ?
      `;
      const updateValues = [name, model, name, model];

      db.query(updateQuery, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error('Error updating currentcount:', updateError);
          res.status(500).send('Error updating currentcount');
        } else {
          res.json(newDevice); // 返回包含设备ID的设备对象
        }
      });
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

// Search devices
app.get('/api/search', (req, res) => {
  const { owner, date, name, model, project, location } = req.query;
  let query = 'SELECT * FROM devices WHERE 1=1';
  const values = [];

  if (owner) {
    query += ' AND owner LIKE ?';
    values.push(`%${owner}%`);
  }
  if (date) {
    query += ' AND date = ?';
    values.push(date);
  }
  if (name) {
    query += ' AND name LIKE ?';
    values.push(`%${name}%`);
  }
  if (model) {
    query += ' AND model LIKE ?';
    values.push(`%${model}%`);
  }
  if (project) {
    query += ' AND project LIKE ?';
    values.push(`%${project}%`);
  }
  if (location) {
    query += ' AND location LIKE ?';
    values.push(`%${location}%`);
  }

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error searching devices:', error);
      res.status(500).send('Error searching devices');
    } else {
      res.json(results);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
