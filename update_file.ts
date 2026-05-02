import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace('const pagesData = [', 'const rawPagesData = [');
content = content.replace('const themeStyles = {', `const pagesData = rawPagesData.map((page, index) => ({ ...page, id: index + 1 }));\n\nconst themeStyles = {`);

content = content.replace(/id:\s*\d+,\n\s*/g, '');

const roadmapItem = `{
    theme: "light",
    layout: "stats",
    title: "Presentation Roadmap",
    subtitle: "What to Expect",
    content: "A structured journey through Danone's market dynamics, operations, and strategic vision.",
    icon: MapPin, 
    media: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop",
    details: [
      "1. Identity & Corporate Mission",
      "2. Revenue Streams & Divisions",
      "3. Operations & Value Chain",
      "4. SWOT & Market Pressures",
      "5. Competitive Ecosystem",
      "6. Strategic Pillars (4Ps)"
    ]
  },
  {`;

content = content.replace('details: ["Unparalleled global R&D infrastructure scaling solutions.","Vertical integration via Nubariya farm to the Obour plant.","Commanding mass market volumes across all consumer segments.","Continuous expansion despite local economic fluctuations."]\n  },\n  {',
'details: ["Unparalleled global R&D infrastructure scaling solutions.","Vertical integration via Nubariya farm to the Obour plant.","Commanding mass market volumes across all consumer segments.","Continuous expansion despite local economic fluctuations."]\n  },\n  ' + roadmapItem);

content = content.replace(/of 30/g, 'of {pagesData.length}');
content = content.replace(/{activeId} \/ 30/g, '{activeId} / {pagesData.length}');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully');
