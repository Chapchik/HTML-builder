const fs = require('fs/promises');
const path = require('path');
const pathToStyles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');

( async () => {
  try {
    const stylesFiles = await fs.readdir(pathToStyles, { withFileTypes: true });
    const styles = [];
    for (const styleFile of stylesFiles) {
      if (styleFile.isFile() && path.extname(styleFile.name) === '.css') {
        const style = await fs.readFile(path.join(pathToStyles, styleFile.name), 'utf-8');
        styles.push(style);
      }
    }
    await fs.writeFile(pathToBundle, styles.join('\n'));
  } catch (err) {
    console.log(err.message);
  }
})();