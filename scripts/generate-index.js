import fs from 'fs';
import path from 'path';

const clientDir = path.join(process.cwd(), 'dist', 'client', 'assets');
const files = fs.readdirSync(clientDir);

const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

const html = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ''}
  </body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'dist', 'client', 'index.html'), html);
console.log('Successfully generated dist/client/index.html');
