const fs = require('fs');

// Append data to an existing file

const content = '\nAppended text'
fs.appendFile('newfile.txt', content , (err) => {
  if (err) {
    console.error('Error appending to file:', err);
  } else {
    console.log('Data appended successfully!');
  }
});
