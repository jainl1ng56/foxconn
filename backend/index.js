const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'warehouse'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// 获取所有设备
app.get('/api/devices', (req, res) => {
    connection.query('SELECT * FROM devices', (err, results) => {
        if (err) {
            console.error('Error fetching devices:', err);
            res.status(500).send('Error fetching devices');
            return;
        }
        res.json(results);
    });
});

// 添加新设备
app.post('/api/devices', (req, res) => {
    const { owner, date, name, model, count, project, location } = req.body;
    const query = 'INSERT INTO devices (owner, date, name, model, count, project, location) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [owner, date, name, model, count, project, location], (err, results) => {
        if (err) {
            console.error('Error adding device:', err);
            res.status(500).send('Error adding device');
            return;
        }
        res.json({ id: results.insertId, owner, date, name, model, count, project, location });
    });
});

// 删除设备
app.delete('/api/devices/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM devices WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting device:', err);
            res.status(500).send('Error deleting device');
            return;
        }
        res.sendStatus(204);
    });
});

// 查询设备
app.get('/api/search', (req, res) => {
    let query = 'SELECT * FROM devices WHERE 1=1';
    const params = [];
    for (const [key, value] of Object.entries(req.query)) {
        query += ` AND ${key} = ?`;
        params.push(value);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error searching devices:', err);
            res.status(500).send('Error searching devices');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
