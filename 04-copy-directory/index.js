const fs = require('fs/promises');
const path = require('path');
const pathToMainFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

( async () => {
  try {
    await fs.rm(pathToCopyFolder, { recursive: true, force: true });
    await CopyDir(pathToMainFolder, pathToCopyFolder);
    console.log('All is copied! :)');
  } catch (err) {
    console.log(err.message);
  }
})();

async function CopyDir(src, dest) {
  await fs.mkdir(dest);
  const files = await fs.readdir(src, { withFileTypes: true });
  for (const file of files) {
    const currPathToSrc = path.join(src, file.name);
    const currPathToDest = path.join(dest, file.name);
    if (file.isFile()) {
      await fs.copyFile(currPathToSrc, currPathToDest);
    } else {
      await CopyDir(currPathToSrc, currPathToDest);
    }
  }
}
