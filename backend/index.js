const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

// Get all devices
app.get('/api/devices', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM devices');
    res.json(results);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).send('Error fetching devices');
  }
});

// Add a new device
app.post('/api/devices', async (req, res) => {
  const { owner, date, name, model, count, project, location } = req.body;
  const query = 'INSERT INTO devices (owner, date, name, model, count, project, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [owner, date, name, model, count, project, location];

  try {
    const [results] = await db.query(query, values);
    const newDeviceId = results.insertId; // 获取插入的设备ID
    const newDevice = { id: newDeviceId, owner, date, name, model, count, project, location };

    // 更新 total 表中的 receivedcount, HuYao, GDL 和 NaQing
    const updateQuery = `
      UPDATE total
      SET 
        receivedcount = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND model = ?
        ),
        HuYao = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'HuYao'
        ),
        GDL = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'GDL'
        ),
        NaQing = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND model = ?
        ) - (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'HuYao'
        ) - (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'GDL'
        )
      WHERE name = ? AND model = ?
    `;
    const updateValues = [name, model, name, name, name, name, model, name, name, name, model];

    await db.query(updateQuery, updateValues);
    res.json(newDevice); // 返回包含设备ID的设备对象
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).send('Error adding device');
  }
});

// Delete a device
app.delete('/api/devices/:id', async (req, res) => {
  const deviceId = req.params.id;

  try {
    const [results] = await db.query('SELECT * FROM devices WHERE id = ?', [deviceId]);
    if (results.length === 0) {
      res.status(404).send('Device not found');
      return;
    }
    const device = results[0];

    const deleteRecordQuery = 'INSERT INTO trash (owner, date, name, model, count, project, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const deleteRecordValues = [device.owner, device.date, device.name, device.model, device.count, device.project, device.location];

    await db.query(deleteRecordQuery, deleteRecordValues);

    await db.query('DELETE FROM devices WHERE id = ?', [deviceId]);

    // 更新 total 表中的 receivedcount, HuYao, GDL 和 NaQing
    const updateQuery = `
      UPDATE total
      SET 
        receivedcount = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND model = ?
        ),
        HuYao = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'HuYao'
        ),
        GDL = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'GDL'
        ),
        NaQing = (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND model = ?
        ) - (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'HuYao'
        ) - (
          SELECT IFNULL(SUM(count), 0)
          FROM devices
          WHERE name = ? AND location = 'GDL'
        )
      WHERE name = ? AND model = ?
    `;
    const updateValues = [device.name, device.model, device.name, device.name, device.name, device.name, device.model, device.name, device.name, device.name, device.model];

    await db.query(updateQuery, updateValues);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).send('Error deleting device');
  }
});

// Search devices
app.get('/api/search', async (req, res) => {
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

  try {
    const [results] = await db.query(query, values);
    res.json(results);
  } catch (error) {
    console.error('Error searching devices:', error);
    res.status(500).send('Error searching devices');
  }
});

// Update total table
app.post('/api/updateTotal', async (req, res) => {
  const updateQuery = `
    UPDATE total
    SET 
      receivedcount = (
        SELECT IFNULL(SUM(count), 0)
        FROM devices
        WHERE total.name = devices.name AND total.model = devices.model
      ),
      HuYao = (
        SELECT IFNULL(SUM(count), 0)
        FROM devices
        WHERE total.name = devices.name AND location = 'HuYao'
      ),
      GDL = (
        SELECT IFNULL(SUM(count), 0)
        FROM devices
        WHERE total.name = devices.name AND location = 'GDL'
      ),
      NaQing = receivedcount - HuYao - GDL
  `;

  try {
    await db.query(updateQuery);
    res.send('Total updated successfully');
  } catch (error) {
    console.error('Error updating total:', error);
    res.status(500).send('Error updating total');
  }
});

// Get total table
app.get('/api/totals', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM total');
    res.json(results);
  } catch (error) {
    console.error('Error fetching totals:', error);
    res.status(500).send('Error fetching totals');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});