const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'manager',
  password: '111111',
  database: 'warehouse'
});

module.exports = pool.promise(); // 使用 promise 方式