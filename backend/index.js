const express = require('express');
const path = require('path')
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

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
      const newDeviceId = results.insertId; // GET 插入的deivce ID
      const newDevice = { id: newDeviceId, owner, date, name, model, count, project, location };

      // 更新 total 表中的 currentcount
      const updateQuery = `
        UPDATE total
        SET currentcount = (
          SELECT IFNULL(SUM(count), 0)
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
          res.json(newDevice); // 返回包含設備ID的設備物件
        }
      });
    }
  });
});

// Delete a device
app.delete('/api/devices/:id', (req, res) => {
  const deviceId = req.params.id;

  // 在delete 項目之前,先存取device的info
  db.query('SELECT * FROM devices WHERE id = ?', [deviceId], (error, results) => {
    if (error) {
      console.error('Error fetching device:', error);
      res.status(500).send('Error fetching device');
    } else if (results.length === 0) {
      res.status(404).send('Device not found');
    } else {
      const device = results[0];

      // delete device紀錄
      db.query('DELETE FROM devices WHERE id = ?', [deviceId], (deleteError, deleteResults) => {
        if (deleteError) {
          console.error('Error deleting device:', deleteError);
          res.status(500).send('Error deleting device');
        } else {
          // 更新 total 表中的 currentcount
          const updateQuery = `
            UPDATE total
            SET currentcount = (
              SELECT IFNULL(SUM(count), 0)
              FROM devices
              WHERE name = ? AND model = ?
            )
            WHERE name = ? AND model = ?
          `;
          const updateValues = [device.name, device.model, device.name, device.model];

          db.query(updateQuery, updateValues, (updateError, updateResults) => {
            if (updateError) {
              console.error('Error updating currentcount:', updateError);
              res.status(500).send('Error updating currentcount');
            } else {
              res.status(204).send(); // No content response
            }
          });
        }
      });
    }
  });
});

// Search devices
app.get('/api/search', (req, res) => {
  const { owner, date, name, model, project, location } = req.query;
  let query = 'SELECT * FROM devices WHERE 1=1';
  const values = [];

  if (owner) {
    query += ' AND owner = ?';
    values.push(owner);
  }
  if (date) {
    query += ' AND date = ?';
    values.push(date);
  }
  if (name) {
    query += ' AND name = ?';
    values.push(name);
  }
  if (model) {
    query += ' AND model = ?';
    values.push(model);
  }
  if (project) {
    query += ' AND project = ?';
    values.push(project);
  }
  if (location) {
    query += ' AND location = ?';
    values.push(location);
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

// Get all totals
app.get('/api/totals', (req, res) => {
  db.query('SELECT * FROM total', (error, results) => {
    if (error) {
      console.error('Error fetching totals:', error);
      res.status(500).send('Error fetching totals');
    } else {
      res.json(results);
    }
  });
});

// 返回前端的 index.html 文件
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const port = 3000;
const host = '0.0.0.0';  // ??監聽所有網路街口??

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});

