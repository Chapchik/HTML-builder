const fs = require('fs/promises');
const path = require('path');
const pathToDist = path.join(__dirname, 'project-dist');
const pathToComponents = path.join(__dirname, 'components');
const pathToStyles = path.join(__dirname, 'styles');
const pathToAssets = path.join(__dirname, 'assets');
const pathToDistAssets = path.join(pathToDist, 'assets');

(async () => {
  try {
    await fs.rm(pathToDist, { force: true, recursive: true });
    await fs.mkdir(pathToDist);
    await mergeStyles();
    await createHtml();
    await copyDir(pathToAssets, pathToDistAssets);
  } catch (err) {
    console.log(err.message);
  }
})();

async function createHtml () {
  let html = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await fs.readdir(pathToComponents, { withFileTypes: true });
  for (const component of components) {
    const ext = path.extname(component.name);
    if (component.isFile() && ext === '.html') {
      const template = await fs.readFile(path.join(pathToComponents, component.name), 'utf-8');
      const templateName = path.basename(component.name, ext);
      html = html.replace(`{{${templateName}}}`, template);
    }
  }
  await fs.writeFile(path.join(pathToDist, 'index.html'), html);
}

async function mergeStyles () {
  const stylesFiles = await fs.readdir(pathToStyles, { withFileTypes: true });
  const styles = [];
  for (const styleFile of stylesFiles) {
    const ext = path.extname(styleFile.name);
    if (styleFile.isFile() && ext === '.css') {
      const style = await fs.readFile(path.join(pathToStyles, styleFile.name), 'utf-8');
      styles.push(style);
    }
  }
  await fs.writeFile(path.join(pathToDist, 'style.css'), styles.join('\n'));
}

async function copyDir(src, dest) {
  await fs.mkdir(dest);
  const files = await fs.readdir(src, { withFileTypes: true });
  for (const file of files) {
    const currPathToSrc = path.join(src, file.name);
    const currPathToDest = path.join(dest, file.name);
    if (file.isFile()) {
      await fs.copyFile(currPathToSrc, currPathToDest);
    } else {
      await copyDir(currPathToSrc, currPathToDest);
    }
  }
}