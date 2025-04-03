// Import the fs module
const fs = require('fs');

//fs.readFile()
fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading sample.txt:', err.message);
        return;
    }
    console.log('Content of sample.txt:\n', data);
});

//fs.writefile
fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
    if (err) {
        console.error('Error creating newfile.txt:', err.message);
        return;
    }
    console.log('newfile.txt has been created successfully.');
});

//fs.appendFile
fs.appendFile('sample.txt', '\nAppended content.', (err) => {
    if (err) {
        console.error('Error appending to sample.txt:', err.message);
        return;
    }
    console.log('Content has been appended to sample.txt.');
});

//fs.unlink
fs.unlink('newfile.txt', (err) => {
    if (err) {
        console.error('Error deleting newfile.txt:', err.message);
        return;
    }
    console.log('newfile.txt has been deleted successfully.');
});