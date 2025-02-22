const os = require('os');

// Get system information
console.log('Platform:', os.platform()); // 'linux', 'darwin', 'win32'
console.log('CPU architecture:', os.arch());
console.log('Free memory:', os.freemem());
