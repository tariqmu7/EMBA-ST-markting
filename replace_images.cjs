const fs = require('fs');

const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop", // business
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop", // sustainability
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop", // ecology
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop", // finance
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1920&auto=format&fit=crop", // yogurt
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop", // science
  "https://images.unsplash.com/photo-1565514020179-026b92b84eb6?q=80&w=1920&auto=format&fit=crop", // factory
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop", // production
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1920&auto=format&fit=crop", // cows
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop", // market down
  "https://images.unsplash.com/photo-1580519542036-ed47f3e4ba43?q=80&w=1920&auto=format&fit=crop", // inflation
  "https://images.unsplash.com/photo-1586528116311-ad8ed7c663e0?q=80&w=1920&auto=format&fit=crop", // truck
  "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1920&auto=format&fit=crop", // supermarket
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop", // chart
  "https://images.unsplash.com/photo-1580227916960-9154f2482326?q=80&w=1920&auto=format&fit=crop", // local agriculture
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop", // recycling
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop", // strength
  "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1920&auto=format&fit=crop", // weakness
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop", // opportunity
  "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop", // treat
  "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1920&auto=format&fit=crop", // strategy
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto=format&fit=crop", // leader
  "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1920&auto=format&fit=crop", // aisle
  "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop", // milk
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop", // fitness
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop", // shopping
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop", // delivery
  "https://images.unsplash.com/photo-1592982537447-6f2da6cce30f?q=80&w=1920&auto=format&fit=crop", // farmers
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1920&auto=format&fit=crop", // community
  "https://images.unsplash.com/photo-1518605368461-1e1252220a06?q=80&w=1920&auto=format&fit=crop"  // football
];

let content = fs.readFileSync('src/App.tsx', 'utf8');
let imageIndex = 0;
content = content.replace(/media: "https:\/\/loremflickr\.com\/.*?"/g, () => {
   return `media: "${images[imageIndex++]}"`;
});

fs.writeFileSync('src/App.tsx', content);
