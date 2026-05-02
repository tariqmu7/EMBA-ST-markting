const fs = require('fs');

const file = fs.readFileSync('src/App.tsx', 'utf8');

const keywords = [
  'corporate,business', 'nature,sustainability', 'ecology,green', 'dairy,economy',
  'yogurt,milk', 'science,nutrition', 'factory,infrastructure', 'logistics,global',
  'finance,inflation', 'warehouse,truck', 'competition,supermarket', 'growth,strategy',
  'agriculture,farm', 'solar,energy', 'laboratory,strength', 'shipping,cold',
  'export,ship', 'chess,threat', 'market,battle', 'dairy,production',
  'cheese,grocery', 'healthy,food', 'fitness,protein', 'shopping,cart',
  'distribution,truck', 'partnership,handshake', 'crowd,cheering', 'football,stadium',
  'egypt,cairo', 'conference,audience'
];

let i = 0;
const newFile = file.replace(/https:\/\/images\.unsplash\.com\/photo-[^"]+/g, (match) => {
  const kw = keywords[i % keywords.length];
  i++;
  return `https://images.unsplash.com/random/1920x1080/?${kw}`;
});

fs.writeFileSync('src/App.tsx', newFile);
console.log('Replaced URLs successfully.');
