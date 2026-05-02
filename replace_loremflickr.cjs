const fs = require('fs');

const file = fs.readFileSync('src/App.tsx', 'utf8');

const newFile = file.replace(/https:\/\/images\.unsplash\.com\/random\/1920x1080\/\?([^"]+)/g, (match, p1) => {
  return `https://loremflickr.com/1920/1080/${p1}`;
});

fs.writeFileSync('src/App.tsx', newFile);
console.log('Replaced URLs with loremflickr successfully.');
