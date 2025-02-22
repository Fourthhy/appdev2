const fs = require('fs');

// Create or overwrite a file

const content = '\nThis is all about me';

fs.writeFile('newfile.txt', content , (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created and data written successfully!');
  }
});

// Append data to an existing file

const content2 = `
Appended text

another appended file
`
fs.appendFile('newfile.txt', content2 , (err) => {
  if (err) {
    console.error('Error appending to file:', err);
  } else {
    console.log('Data appended successfully!');
  }
});
