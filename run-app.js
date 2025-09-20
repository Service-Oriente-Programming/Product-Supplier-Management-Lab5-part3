const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Lab 5 Part 3 - Product Supplier Management with Authentication');
console.log('================================================================');

// Start the application
const app = spawn('node', ['app.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

app.on('close', (code) => {
  console.log(`\n📊 Application exited with code ${code}`);
});

app.on('error', (err) => {
  console.error('❌ Failed to start application:', err);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down application...');
  app.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down application...');
  app.kill('SIGTERM');
  process.exit(0);
});
