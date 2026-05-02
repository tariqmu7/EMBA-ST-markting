import fs from 'fs';

const pagesData = [
  {
    theme: "blue", layout: "hero",
    title: "Danone Egypt: Strategic Market Presentation",
    subtitle: "Nourishing a Healthier Future for Every Egyptian Home",
    content: "Target Audience: Internal Stakeholders, Executive Board, and Strategic Partners\nPresenter: [Your Name/Title]\nDate: May 2026",
    icon: "Globe",
    media: "https://smartmedia.digital4danone.com//is/image/danonecs/w?wid=960&fmt=png-alpha&fit=wrap",
    details: ["Comprehensive Analysis: Introduction, Core Mission, Deep-Dive SWOT, Strategic Objectives, and 4Ps Marketing Mix"]
  },
  {
    theme: "light", layout: "stats",
    title: "Agenda & Strategic Roadmap",
    subtitle: "What to Expect",
    content: "This presentation is structured to provide a 360-degree view of Danone Egypt's market position and future trajectory:",
    icon: "MapPin",
    media: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    details: ["1. Introduction & Company Overview: Global legacy and local presence.", "2. Business Mission & Core Values: The driving forces behind our operations.", "3. Operational Footprint in Egypt: From farm to factory to fridge.", "4. Strategic Market Analysis (SWOT): Internal capabilities and external market dynamics.", "5. Corporate & Market Objectives: SMART goals for the upcoming fiscal periods.", "6. The Marketing Mix (4Ps): Detailed strategy across Product, Price, Place, and Promotion.", "7. Strategic Implementation Roadmap: A 3-year phased execution plan.", "8. Conclusion & Open Floor Q&A."]
  },
  {
    theme: "blue", layout: "split-right",
    title: "A Global Legacy of Health and Nutrition",
    subtitle: "Introduction to Danone Global",
    content: "Operating seamlessly across more than 120 international markets with a diverse workforce exceeding 100,000 employees. Over 100 years of expertise.",
    icon: "Globe",
    media: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Position: Multinational leader in health-focused nutrition, headquartered in Paris.", "Essential Dairy and Plant-Based (EDP): Largest segment focusing on gut health.", "Specialized Nutrition: Early life and medical nutrition.", "Waters: Premium bottled water brands promoting healthy hydration."]
  },
  {
    theme: "green", layout: "split-left",
    title: "Danone Egypt: Localizing a Global Vision",
    subtitle: "The Strategic Journey",
    content: "Dedicated to providing high-quality, scientifically backed healthy dairy products tailored to the dietary needs of Egyptian families.",
    icon: "Briefcase",
    media: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Entry: Officially established in the Egyptian market in 2006.", "Corporate Hub: Headquartered in Cairo, serving North African operations.", "Economic Contribution: Employs an robust local workforce of over 1,500 professionals."]
  },
  {
    theme: "light", layout: "stats",
    title: "Our Core Philosophy: The Dual Project",
    subtitle: "The Dual Economic and Social Project",
    content: "Formulated by former CEO Antoine Riboud, Danone operates on the conviction that corporate business success and social/environmental progress are inextricably linked.",
    icon: "Heart",
    media: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop",
    details: ["The Economic Pillar: Delivering sustainable growth, securing market leadership, maintaining robust supply chains.", "The Social Pillar: Improving public health, empowering local communities, championing employee welfare, preserving environment."]
  },
  {
    theme: "blue", layout: "split-right",
    title: "Mission Statement",
    subtitle: '"Bringing Health Through Food to as Many People as Possible"',
    content: "Core Business Mission focusing on nutritional superiority, universal accessibility, and an innovation pipeline.",
    icon: "Target",
    media: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1920&auto=format&fit=crop",
    details: ["Nutritional Superiority: Focus on R&D to ensure every product offers tangible health benefits.", "Universal Accessibility: Making healthy food accessible across diverse socio-economic tiers.", "Innovation Pipeline: Investment in probiotic research, functional foods, and fortification."]
  },
  {
    theme: "green", layout: "split-left",
    title: "Vision Alignment: One Planet. One Health.",
    subtitle: "Global Vision",
    content: "A corporate call to action recognizing that human health and the health of our environment are deeply interdependent.",
    icon: "Leaf",
    media: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920&auto=format&fit=crop",
    details: ["Interconnected Ecosystems: You cannot have healthy people on a sick planet.", "Dietary Transformation: Promotes a shift towards healthier, sustainable eating habits.", "Operational Integration: Vision acts as primary filter for all corporate decisions."]
  },
  {
    theme: "light", layout: "split-right",
    title: "Manufacturing Excellence: The Obour Facility",
    subtitle: "Operational Footprint",
    content: "Situated in Obour City, a major industrial hub facilitating efficient nationwide distribution.",
    icon: "Factory",
    media: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1920&auto=format&fit=crop",
    details: ["Advanced Infrastructure: 9 state-of-the-art production lines scaling rapidly to demand.", "Stringent Quality Assurance: Holds FSSC 22000 and ISO certifications.", "Resource Optimization: Engineered for sustainability, wastewater treatment, and energy efficiency."]
  },
  {
    theme: "blue", layout: "split-left",
    title: "Securing the Source: The Nubariya Dairy Farm",
    subtitle: "Operational Footprint",
    content: "By controlling the primary raw material source, Danone Egypt buffers itself against market shortages.",
    icon: "CloudRain",
    media: "https://smartmedia.digital4danone.com//is/image/danonecs/D-136?wid=480&fmt=png-alpha&fit=wrap",
    details: ["Scale & Capacity: 2nd largest private dairy farm in Egypt.", "Herd Management: Over 6,000 high-yielding Holstein cows for predictable supply.", "Precision Agriculture: Data-driven farming, automated milking, advanced veterinary monitoring."]
  },
  {
    theme: "green", layout: "split-right",
    title: "Setting the Benchmark: B-Corp Certification",
    subtitle: "Sustainability & Corporate Leadership",
    content: "Danone Egypt is exceptionally proud to be a certified B-Corporation, balancing profit and purpose.",
    icon: "Award",
    media: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop",
    details: ["Elite Recognition: Joining a global movement of companies using business as a force for good.", "Rigorous Standards: Passing comprehensive audits verifying social/environmental performance.", "Industry Pioneer: First FMCG company of its scale in Egypt to achieve this."]
  },
  {
    theme: "red", layout: "hero",
    title: "Macro-Environmental Market Context",
    subtitle: "The Egyptian Dairy Market Context",
    content: "Operating in a market with over 110 million people, featuring a youth-heavy demographic.",
    icon: "Activity",
    media: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop",
    details: ["Demographic Dividend: Youth-heavy driving high-volume demand for staple foods.", "Evolving Consumer Behavior: Shifts accelerating awareness regarding preventative health.", "Economic Realities: Highly price-sensitive market requiring agile pricing strategies."]
  },
  {
    theme: "blue", layout: "stats",
    title: "Core Internal Competencies & Strengths",
    subtitle: "SWOT Analysis - STRENGTHS (Internal)",
    content: "Distinct advantages that anchor its market leadership position.",
    icon: "CheckCircle",
    media: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop",
    stats: [
      { label: "Equity", value: "High" },
      { label: "Supply Chain", value: "Integrated" },
      { label: "R&D", value: "Access" }
    ],
    details: ["Brand Equity: Immense global brand recognition synonymous with quality and health.", "Integrated Supply Chain: Nubariya farm provides unparalleled control over milk quality.", "Market Leadership: Undisputed dominance in functional and digestive health dairy (Activia).", "R&D Muscle: Rapid deployment from global research centers."]
  },
  {
    theme: "red", layout: "stats",
    title: "Areas for Internal Improvement & Vulnerabilities",
    subtitle: "SWOT Analysis - WEAKNESSES (Internal)",
    content: "Internal vulnerabilities that require mitigation to prevent market share erosion.",
    icon: "AlertTriangle",
    media: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1920&auto=format&fit=crop",
    stats: [
      { label: "Logistics", value: "Overhead" },
      { label: "FX", value: "Exposure" },
      { label: "3rd-Party", value: "Reliance" }
    ],
    details: ["Heavy Logistics Overhead: Maintaining cold chain is capital-intensive.", "Third-Party Reliance: Limited total control over the 'last mile' distribution.", "FX Exposure: Vulnerability due to importing specific raw materials and machinery.", "Premium Perception: Barrier for penetration into ultra-low-income segments."]
  },
  {
    theme: "green", layout: "stats",
    title: "External Avenues for Strategic Growth",
    subtitle: "SWOT Analysis - OPPORTUNITIES (External)",
    content: "External factors and market dynamics offering avenues for significant expansion.",
    icon: "TrendingUp",
    media: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    details: ["Category Expansion: Rising interest introduces premium lines and specialized protein products.", "Geographic Penetration: Massive untapped potential in rural governorates and Upper Egypt.", "Consumption Occasions: Shifting to 'on-the-go' healthy snacking.", "Digital Commerce: Rapid growth of grocery delivery apps offers new distribution channels."]
  },
  {
    theme: "red", layout: "split-right",
    title: "External Risks and Market Threats",
    subtitle: "SWOT Analysis - THREATS (External)",
    content: "Macro and competitive risks that pose a danger to sustained profitability.",
    icon: "ShieldAlert",
    media: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop",
    details: ["Fierce Local Competition: Rivalry from entrenched local giants dominating traditional trade.", "Macroeconomic Volatility: Sustained inflation eroding consumer disposable income.", "Supply Chain Shocks: Global logistical disruptions affecting critical imports.", "Fleet Maintenance Risks: FX shortages threaten regular service of refrigerated fleets."]
  },
  {
    theme: "light", layout: "split-left",
    title: "Strategic Market Positioning",
    subtitle: "Competitive Landscape & Positioning",
    content: "Danone deliberately positions itself not merely as a traditional 'dairy processor,' but as an advanced 'health and nutrition' company.",
    icon: "Crosshair",
    media: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1920&auto=format&fit=crop",
    details: ["The Differentiator: Advanced health and nutrition positioning.", "Value over Volume: Emphasizing functional benefits (e.g., probiotics) over price wars.", "Trust & Safety: Leveraging B-Corp status and stringent quality controls as the safest choice."]
  },
  {
    theme: "blue", layout: "stats",
    title: "Commercial & Financial Objectives (2026-2028)",
    subtitle: "Market Objectives: Commercial Growth",
    content: "Focused targets for market share, distribution, and revenue diversification.",
    icon: "TrendingUp",
    media: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Share Capture: Target 3.5% increase in spoonable yogurt category over 24 months.", "Distribution Expansion: Broaden retail footprint from 100k to 125k POS.", "Revenue Diversification: Double-digit YoY volume growth in Specialized Nutrition.", "Profitability Margin: Maintain EBITDA margins through strict cost-optimization."]
  },
  {
    theme: "green", layout: "split-right",
    title: "Product Development & Health Objectives",
    subtitle: "Market Objectives: Innovation & Public Health",
    content: "Commitments toward nutritional improvement, localized innovation, and community health.",
    icon: "Beaker",
    media: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop",
    details: ["Nutritional Improvement: Re-formulating to achieve 15% reduction in added sugars by Q4 2027.", "Localized Innovation: Minimum two new functional innovations tailored to Egyptian palate annually.", "Community Education: Educate 1.5M mothers on first 1,000 days of early childhood nutrition."]
  },
  {
    theme: "light", layout: "split-left",
    title: "Environmental, Social, and Governance (ESG) Targets",
    subtitle: "Market Objectives: ESG & Sustainability",
    content: "Specific goals for sustainability and circular economy commitments.",
    icon: "Leaf",
    media: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop",
    details: ["Circular Economy Packaging: 100% recyclable, reusable, or compostable packaging by 2030.", "Decarbonization: Reduce Obour factory's Scope 1 and Scope 2 carbon footprint by 20%.", "Waste Management: Achieve 'Zero Food Waste to Landfill' from all primary sites."]
  },
  {
    theme: "blue", layout: "stats",
    title: "Integrated Marketing Mix Strategy",
    subtitle: "The Marketing Plan Overview (The 4Ps)",
    content: "A cohesive, interconnected strategy designed to maximize market penetration while protecting brand equity.",
    icon: "PieChart",
    media: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop",
    details: ["Product: Delivering scientifically backed, tailored nutritional solutions.", "Price: Dual strategy focusing on premium health-value margins and broad accessibility.", "Place: Omnichannel network overcoming logistical challenges.", "Promotion: Educational, digitally-led communication to build loyalty."]
  },
  {
    theme: "light", layout: "split-right",
    title: "Product Strategy: Essential Dairy Line",
    subtitle: "Marketing Mix - PRODUCT (Core Portfolio)",
    content: "Focusing on household staples, flagship probiotics, and indulgence categories.",
    icon: "Box",
    media: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop",
    details: ["Danone Plain Yogurt: Foundational household staple for consumption and culinary use.", "Activia: Flagship, high-margin probiotic brand targeting digestive wellness and gut health.", "Danette: Premium dairy desserts offering a superior, creamy alternative.", "DanUp & Mix: Drinkable yogurts for on-the-go energy and satiety."]
  },
  {
    theme: "green", layout: "split-left",
    title: "Product Strategy: Specialized & Accessible Nutrition",
    subtitle: "Marketing Mix - PRODUCT (Targeted Nutrition)",
    content: "Tailored nutritional approaches for specific life stages and demographic groups.",
    icon: "PlusCircle",
    media: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1920&auto=format&fit=crop",
    details: ["Specialized Nutrition: Premium infant formulas (Bebelac & Aptamil) marketed ethically.", "Dango Line: Fortified, affordable snacks combatting nutritional deficiencies like anemia.", "Plant-Based Exploration: Introducing Alpro for lactose-intolerant and vegan demographics."]
  },
  {
    theme: "blue", layout: "split-right",
    title: "Pricing Strategy: Value vs. Volume",
    subtitle: "Marketing Mix - PRICE (Value & Margin Strategy)",
    content: "Balancing premium positioning with competitive mass market realities.",
    icon: "Coins",
    media: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1920&auto=format&fit=crop",
    details: ["Value-Based Pricing: Applied strictly to functional/specialized brands mapping to clinical benefits.", "Competitive Parity Pricing: Applied to plain yogurt lines to prevent market share erosion.", "Dynamic Architecture: Advanced revenue growth management to manage promotional discounts."]
  },
  {
    theme: "light", layout: "split-left",
    title: "Pricing Strategy: Reaching the Base of the Pyramid",
    subtitle: "Marketing Mix - PRICE (Accessibility Strategy)",
    content: "Tactics designed to ensure availability despite economic constraints.",
    icon: "Users",
    media: "https://images.unsplash.com/photo-1518605368461-1e1252220a06?q=80&w=1920&auto=format&fit=crop",
    details: ["Combating 'Shrinkflation': Designing smaller SKUs hitting psychological coin-price points.", "Nutritional Accessibility: Low margins on 'Dango' ensuring protein/vitamins remain viable.", "Bulk Formats for HORECA: Cost-effective formats tailored to secure steady B2B revenue."]
  },
  {
    theme: "red", layout: "split-right",
    title: "Distribution Infrastructure & Overcoming Hurdles",
    subtitle: "Marketing Mix - PLACE (Distribution & Logistics Strategy)",
    content: "Operating in a vast, hot geography demanding meticulous logistical planning.",
    icon: "Truck",
    media: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=1920&auto=format&fit=crop",
    details: ["The Logistics Challenge: Maintaining strict 2°C-6°C cold chain across Egypt's geography.", "Network Structure: 31 primary Distribution Centers across the republic.", "Strategic Mitigation: Advanced routing software and specialized maintenance protocols.", "Innovation (Al-Omda Project): Empowering rural women with specialized cooling tricycles."]
  },
  {
    theme: "blue", layout: "split-left",
    title: "Logistical Battleground: Danone vs. Juhayna",
    subtitle: "Marketing Mix - PLACE (Fleet & Logistics Competitor Comparison)",
    content: "Contrasting supply-chain strategies against formidable entrenched rivals.",
    icon: "Briefcase",
    media: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1920&auto=format&fit=crop",
    details: ["Fleet Ownership Model: Hybrid model heavily reliant on 3rd-party vs. wholly-owned.", "The Control Advantage: Absolute control over traditional grocers creates an entry barrier.", "Product Shelf-Life Factor: Fresh dairy requiring cold-chain vs. long-life UHT ambient distribution."]
  },
  {
    theme: "green", layout: "stats",
    title: "Promotional Strategy: Digital-First & Educational",
    subtitle: "Marketing Mix - PROMOTION (Communication & Engagement)",
    content: "A multi-channel promotional approach blending digital reach with targeted physical activations.",
    icon: "Heart",
    media: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1920&auto=format&fit=crop",
    details: ["Digital Transformation: Targeting social media (TikTok, Meta, YouTube) for Gen Z and millennial moms.", "Influencer Ecosystem: Building Key Opinion Leaders—nutritionists, pediatricians, lifestyle.", "Experiential Marketing: Visibility in BTL activations with extensive in-store sampling.", "Data-Driven CRM: Building direct relationships through loyalty programs and parenting apps."]
  },
  {
    theme: "light", layout: "split-right",
    title: "Promotional Strategy: Integrating CSR and Brand Value",
    subtitle: "Marketing Mix - PROMOTION (Purpose-Driven CSR)",
    content: "Integrating social responsibility deeply into corporate brand identity.",
    icon: "Handshake",
    media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop",
    details: ["Egyptian Food Bank Alliance: Product donations and campaigns to eradicate hunger/waste.", "Health Awareness Caravans: Mobile clinics offering free nutritional assessments to communities.", "Academic Partnerships: Sponsoring research on Egyptian dietary habits to reinforce authority."]
  },
  {
    theme: "blue", layout: "hero",
    title: "Executive 3-Year Implementation Roadmap",
    subtitle: "Strategic Roadmap (3-Year Implementation Plan)",
    content: "A phased execution plan transforming strategy into tangible outcomes.",
    icon: "MapPin",
    media: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop",
    details: ["Year 1 (Foundation): Overhaul fleet strategy, launch reduced-sugar portfolio, scale Al-Omda.", "Year 2 (Digital & Green): Quick-commerce push, plant-based pilot, biodegradable packaging.", "Year 3 (Dominance & ESG): 20% carbon reduction, #1 in functional/medical, 100% circular packaging."]
  },
  {
    theme: "green", layout: "stats",
    title: "Conclusion: A Sustainable Future",
    subtitle: "Conclusion & Next Steps",
    content: "Final summarizing thoughts on market dominance, strategic vision, and action planning.",
    icon: "CheckCircle",
    media: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    details: ["Summary: Danone Egypt is uniquely positioned to dominate the intersection of health, dairy, and sustainability.", "Commitment: Fiercely committed to the Dual Project driving profitable growth and public health.", "Strategic Imperative: Executing 4Ps with precision, maintaining logistical agility, educating consumers.", "Next Steps: Thank You. Q&A Session. Contact Information: www.danone.eg"]
  }
];

let content = fs.readFileSync('src/App.tsx', 'utf8');
const startIndex = content.indexOf('const rawPagesData = [');
const endIndex = content.indexOf('const pagesData = ', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find rawPagesData');
  process.exit(1);
}

// Rebuild rawPagesData code block
let newBlock = 'const rawPagesData = [\n';
pagesData.forEach((page, i) => {
  let p = `  {\n`;
  p += `    theme: "${page.theme}",\n`;
  p += `    layout: "${page.layout}",\n`;
  p += `    title: ${JSON.stringify(page.title)},\n`;
  p += `    subtitle: ${JSON.stringify(page.subtitle)},\n`;
  p += `    content: ${JSON.stringify(page.content)},\n`;
  if (page.stats) {
    p += `    stats: ${JSON.stringify(page.stats)},\n`;
  }
  p += `    icon: ${page.icon},\n`;
  p += `    media: "${page.media}",\n`;
  p += `    details: ${JSON.stringify(page.details)}\n`;
  p += `  }${i < pagesData.length - 1 ? ',' : ''}\n`;
  newBlock += p;
});
newBlock += '];\n\n';

content = content.slice(0, startIndex) + newBlock + content.slice(endIndex);
fs.writeFileSync('src/App.tsx', content);

console.log('App.tsx updated successfully');
