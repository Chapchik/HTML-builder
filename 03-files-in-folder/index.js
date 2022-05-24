const fs = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

( async () => {
  try {
    const folder = await fs.readdir(pathToFolder, { withFileTypes: true });
    for (const file of folder) {
      if (file.isFile()) {
        const ext = path.extname(file.name);
        const stats = await fs.stat(path.join(pathToFolder, file.name));
        console.log(
          `${path.basename(file.name, ext)} - ${ext} - ${(stats.size / 1024).toFixed(3)}kb`
        );
      }
    }
  } catch (err) {
    console.log(err.message);
  }
})();