const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const writableStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

const exit = () => {
  stdout.write('Goodbye!');
  process.exit();
};

stdout.write('Please, type something\n');
stdin.on('data', (chunk) => {
  let data = '';
  data += chunk;

  if (data.trim() === 'exit') {
    exit();
  } else {
    writableStream.write(data);
  }
});
process.on('SIGINT', () => {
  exit();
});
