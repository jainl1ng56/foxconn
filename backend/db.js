const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'manager',
  password: '111111',
  database: 'warehouse'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;