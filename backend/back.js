const mysqldump = require ('mysqldump')
const path = require ('path')
const fs = require('fs')

const dbconfig = {
    host: 'localhost',
    user: 'manager',
    password: '111111',
    database: 'warehouse'
};

// setup backup path
// const backupDir = path.join(__dirname, '../backup_db');
const backupDir = 'D:\\backup_db';
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const date = new Date();
const timestamp = date.toISOString().slice(0, 10); // Get current date
const backupPath = path.join(backupDir, `backup-${timestamp}.sql`);

// Excute DB backup
mysqldump({
    connection: dbconfig,
    dumpToFile: backupPath,
}).then(() => {
    console.log(`Backup completed at ${backupPath}`);
}).catch(err => {
    console.error('Error during backup:', err);
});

// Delete
const retentionDays = 7;
const now = Date.now();

fs.readdir(backupDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const filePath = path.join(backupDir, file);
        fs.stat(filePath, (err, stats) => {
            if (err) throw err;

            const fileTime = new Date(stats.mtime).getTime();
            if ((now - fileTime) > retentionDays * 24 * 60 * 60 * 1000) {
                fs.unlink(filePath, err => {
                    if (err) throw err;
                    console.log(`Deleted old backup: ${file}`);
                });
            }
        });
    });
});