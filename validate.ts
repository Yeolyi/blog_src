import { readFile, readdir, lstat, access, constants } from 'fs/promises';
import * as path from 'path';

const currentPath = process.cwd();
getPostPaths(currentPath);

async function getPostPaths(currentPath: string) {
  const pathContent = await readdir(currentPath);
  const currentPathContentNames = pathContent.filter((x) => x !== 'legacy');

  currentPathContentNames.forEach(async (currentPathContentName) => {
    const contentPath = path.join(currentPath, currentPathContentName);
    const stat = await lstat(contentPath);
    if (stat.isDirectory()) {
      getPostPaths(contentPath);
    }
  });

  if (currentPathContentNames.includes('index.md')) {
    const indexPath = path.join(currentPath, 'index.md');
    isFileValid(indexPath);
  }
}

async function isFileValid(filePath: string) {
  const regex = /!@([^@!]+)@!/g;
  const fileContent = await (await readFile(filePath)).toString();
  const matches = fileContent.matchAll(regex);

  for (const match of matches) {
    const relativeCodeFilePath = match[1];
    const codeFilePath = path.join(filePath, '../', relativeCodeFilePath);
    try {
      await access(codeFilePath, constants.F_OK);
    } catch {
      console.log(codeFilePath, '가 없음');
      process.exit(1);
    }
  }
}
