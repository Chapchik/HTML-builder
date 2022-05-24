const fs = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

async function showFiles() {
  const folder = await fs.readdir(pathToFolder, { withFileTypes: true });
  for (let item of folder) {
    if (item.isFile()) {
      const ext = path.extname(item.name);
      const name = path.basename(item.name, ext);
      const stats = await fs.stat(path.join(pathToFolder, item.name));
      const size = (stats.size / 1024).toFixed(3);
      console.log(`${name} - ${ext} - ${size}KB`);
    }
  }
}
showFiles();
