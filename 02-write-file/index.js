const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');
const rl = readline.createInterface(stdin, stdout);
const ws = fs.createWriteStream(path.join(__dirname, 'output.txt'), 'utf-8');

console.log('Hello! Write something...');
rl.on('line', (input) => {
  if (input.toString() === 'exit') rl.close();
  ws.write(`${input}\n`);
});

rl.on('SIGINT', () => rl.close());
rl.on('close', () => {
  console.log('Thanks!');
  process.exit();
});