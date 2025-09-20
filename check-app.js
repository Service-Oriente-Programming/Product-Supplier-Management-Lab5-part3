const http = require('http');

console.log('🔍 Checking if the application is running...');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`✅ Application is running!`);
  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`🌐 URL: http://localhost:3001`);
  console.log(`📱 Ready to use!`);
  
  if (res.statusCode === 200) {
    console.log('\n🎉 Lab 5 Part 3 is successfully running!');
    console.log('📝 Next steps:');
    console.log('   1. Open http://localhost:3001 in your browser');
    console.log('   2. Register a new account');
    console.log('   3. Start using the CRUD features');
  }
});

req.on('error', (e) => {
  console.log(`❌ Application is not running: ${e.message}`);
  console.log('💡 Try running: node app.js');
});

req.on('timeout', () => {
  console.log('⏰ Request timeout - application may be starting up');
});

req.end();
