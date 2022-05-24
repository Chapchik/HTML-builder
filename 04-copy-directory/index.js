const fs = require('fs/promises');
const path = require('path');
const pathToMainFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

(async function () {
  await fs.rm(pathToCopyFolder, { recursive: true, force: true });
  copyDirectory(pathToMainFolder, pathToCopyFolder);
})();

async function copyDirectory(src, dest) {
  await fs.mkdir(dest);
  const files = await fs.readdir(src, { withFileTypes: true });

  for (let file of files) {
    const pathToMainFile = path.join(src, file.name);
    const pathToCopyFile = path.join(dest, file.name);
    if (file.isFile()) {
      await fs.copyFile(pathToMainFile, pathToCopyFile);
    } else {
      await copyDirectory(pathToMainFile, pathToCopyFile);
    }
  }
}
