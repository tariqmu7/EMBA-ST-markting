import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Globe, Leaf, Award, PieChart, Activity, PlusCircle, Factory, Building, 
  CloudRain, ShieldAlert, TrendingDown, Zap, Flame, Target, MapPin, Sun, 
  CheckCircle, AlertTriangle, TrendingUp, Crosshair, Briefcase, Crown, 
  Users, Beaker, Box, Coins, Truck, Handshake, Heart, Trophy, Rocket,
  Apple, Droplet, ShieldPlus, HeartPulse, Cookie, Milk, Sparkles, Carrot,
  Calendar, BarChart3, History, Map as MapIcon, ListChecks
} from 'lucide-react';
import { cn } from './lib/utils';
import { geoMercator, geoPath } from 'd3-geo';
import egyptGeoJSON from './lib/egypt.geojson.json';

const REFERENCES = [
  { n: 1,  title: "Danone — Wikipedia (founding history, Isaac Carasso 1919 Barcelona)", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Danone" },
  { n: 2,  title: "The history of Danone", publisher: "Danone Group (official)", url: "https://www.danone.com/group/about-us/our-history.html" },
  { n: 3,  title: "Strong FY 2024 results — Entering the next chapter of Renew with confidence", publisher: "Danone IR / GlobeNewswire", url: "https://www.globenewswire.com/news-release/2025/02/26/3032566/0/en/Danone-Strong-FY-2024-results-Entering-the-next-chapter-of-Renew-with-confidence.html" },
  { n: 4,  title: "Antoine de Saint-Affrique — CEO Danone", publisher: "LinkedIn", url: "https://fr.linkedin.com/in/antoine-de-saint-affrique" },
  { n: 5,  title: "Strong FY 2024 results — press release PDF", publisher: "Danone IR", url: "https://www.danone.com/content/dam/corp/global/danonecom/investors/en-all-publications/2025/pressreleases/prdanone260225.pdf" },
  { n: 6,  title: "Danone: 2025 — Another year of strong delivery", publisher: "GlobeNewswire / Danone", url: "https://www.globenewswire.com/news-release/2026/02/20/3241691/0/en/DANONE-2025-Another-year-of-strong-delivery.html" },
  { n: 7,  title: "Danone's volumes turn positive in 2024 — segment revenue split", publisher: "Food Business News", url: "https://www.foodbusinessnews.net/articles/27789-danones-volumes-turn-positive-in-2024" },
  { n: 8,  title: "Danone becomes the largest B Corp", publisher: "DairyReporter", url: "https://www.dairyreporter.com/Article/2025/11/25/danone-becomes-the-largest-b-corp/" },
  { n: 9,  title: "Danone achieves B Corp certification worldwide", publisher: "Danone Group", url: "https://www.danone.com/newsroom/press-releases/b-corp-full-certification.html" },
  { n: 10, title: "Danone set for €1bn hit with Russia dairy & plant-based exit", publisher: "Just-Food", url: "https://www.just-food.com/special-focus/ukraine-crisis/danone-exits-dairy-and-plant-based-russia-business/" },
  { n: 11, title: "Completion by Danone of the sale of its EDP business in Russia (May 2024)", publisher: "GlobeNewswire / Danone", url: "https://www.globenewswire.com/news-release/2024/05/17/2884377/0/en/DANONE-Completion-by-Danone-of-the-sale-of-its-EDP-business-in-Russia.html" },
  { n: 12, title: "#LeaveRussia: Danone Closed its Business in Russia", publisher: "Leave Russia Project", url: "https://leave-russia.org/danone" },
  { n: 13, title: "High-protein functional dairy drives EDP sales at Danone in Q1 2025", publisher: "DairyReporter", url: "https://www.dairyreporter.com/Article/2025/04/27/high-protein-functional-dairy-drives-edp-sales-at-danone-in-q1-2025/" },
  { n: 14, title: "Danone takes sustainability to the next level (One Planet One Health, 2030 commitments)", publisher: "Sustainability Magazine", url: "https://sustainabilitymag.com/company-reports/danone-takes-sustainability-next-level" },
  { n: 15, title: "Yogurt Market Size & Share Forecasts 2026–2035", publisher: "Global Market Insights", url: "https://www.gminsights.com/industry-analysis/yogurt-market" },
  { n: 16, title: "Danone Egypt — Brands page", publisher: "Danone Egypt (official)", url: "https://www.danone.eg/our-brands.html" },
  { n: 17, title: "Danone Egypt Expands in the Market with Investments Exceeding 1B EGP", publisher: "Egypt Today", url: "https://www.egypttoday.com/Article/3/110267/Danone-Egypt-Expands-in-the-Market-with-Investments-Exceeding-One" },
  { n: 18, title: "Danone Egypt — About Us (Obour plant + Nubariya farm)", publisher: "Danone Egypt (official)", url: "https://www.danone.eg/about-us-new.html" },
  { n: 19, title: "Activia Natural Yoghurt 6×100g — product listing", publisher: "Carrefour Egypt", url: "https://www.carrefouregypt.com/mafegy/en/probiotic-yoghurt/activia-natural-yoghurt100g-5-1/p/259416" },
  { n: 20, title: "Talabat partnership with Spinneys (Egypt q-commerce)", publisher: "Zawya / Talabat", url: "https://www.zawya.com/en/press-release/companies-news/talabat-announces-partnership-with-spinneys-jnpf99ox" },
  { n: 21, title: "How Egypt is redefining online shopping (Rabbit, Breadfast, Talabat Mart)", publisher: "Zawya", url: "https://www.zawya.com/en/economy/north-africa/how-egypt-is-redefining-online-shopping-geq8k83m" },
  { n: 22, title: "Danone Egypt — Certified B Corporation profile", publisher: "B Lab Global", url: "https://www.bcorporation.net/en-us/find-a-b-corp/company/danone-egypt/" },
  { n: 23, title: "Danone Egypt launches Gawda Project — cooled milk-collection trucks", publisher: "Zawya / Danone", url: "https://www.zawya.com/en/press-release/companies-news/danone-egypt-launches-gawda-project-cooling-milk-collection-trucks-to-preserve-quality-and-nutritional-value-ns4j4hag" },
  { n: 24, title: "Bel Egypt joins Danone Egypt's Omda initiative", publisher: "Zawya / Bel Egypt", url: "https://www.zawya.com/en/press-release/companies-news/bel-egypt-joins-danone-egypts-omda-initiative-to-extend-its-rural-footprint-and-drive-meaningful-community-impact-jke60nvn" },
  { n: 25, title: "Egypt Dairy Products & Eggs Market Size & Forecast 2034", publisher: "IMARC Group", url: "https://www.imarcgroup.com/egypt-dairy-products-eggs-market" },
  { n: 28, title: "Egypt: Bold moves (March 2024 EGP float, 600 bps rate hike, inflation)", publisher: "Franklin Templeton EM Insights", url: "https://www.franklinresources.com/articles/2024/emerging-markets/egypt-bold-moves" },
  { n: 29, title: "2023–2024 Egyptian financial crisis (devaluation, IMF package)", publisher: "Wikipedia (cross-referenced)", url: "https://en.wikipedia.org/wiki/2023%E2%80%932024_Egyptian_financial_crisis" },
  { n: 30, title: "The shock of the 3rd flotation and its impact on social justice", publisher: "EIPR", url: "https://eipr.org/en/press/2024/03/shock-3rd-flotation-and-its-impact-social-justice" },
  { n: 31, title: "Juhayna Food Industries — Investor Home", publisher: "Juhayna (official)", url: "https://www.juhayna.com/investor-home/" },
  { n: 32, title: "Juhayna 1H25 Earnings Release", publisher: "Juhayna IR", url: "https://www.juhayna.com/app/uploads/2025/11/1755209113_669_788386_1h25earningsreleaseenglish.pdf" },
  { n: 33, title: "Food company revenues soar as bellies rumble (Juhayna 9M24)", publisher: "Al Manassa", url: "https://manassa.news/en/stories/23782" },
  { n: 34, title: "PepsiCo / Almarai JV acquires Beyti (2009)", publisher: "PepsiCo press release", url: "https://www.pepsico.com/en/newsroom/press-releases/2009/pepsicoalmarai-joint-venture-international-dairy-and-juice-limited-acquires-egyptian-dairy-and-juice-company-beyti" },
  { n: 35, title: "Beyti — About Us (corporate history)", publisher: "Beyti (official)", url: "https://beyti-app.vercel.app/corporate/about-beyti" },
  { n: 36, title: "PepsiCo / Almarai JV acquires Beyti (additional coverage)", publisher: "Food Ingredients First", url: "https://www.foodingredientsfirst.com/news/pepsicoalmarai-joint-venture-international-dairy-and-juice-limited-acquires-beyti.html" },
  { n: 37, title: "Almarai — Wikipedia (corporate history, including the 2023 Beyti acquisition)", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Almarai" },
  { n: 38, title: "Almarai takes 100% share in PepsiCo JV International Dairy and Juice", publisher: "Just-Food", url: "https://www.just-food.com/news/saudi-arabia-almarai-takes-100-share-in-pepsico-jv-international-dairy-and-juice-limited/" },
  { n: 39, title: "Danone Indonesia denies affiliation with Israel", publisher: "Tempo (en.tempo.co)", url: "https://en.tempo.co/read/1942251/danone-indonesia-denies-affiliation-with-israel-we-support-palestinian-independence" },
  { n: 40, title: "Israel: brand boycotts and MENA sales-impact context", publisher: "The Conversation", url: "https://theconversation.com/israel-why-the-brand-boycotts-probably-wont-make-much-difference-217125" },
];

const rawPagesData = [
  {
    theme: "blue",
    layout: "hero",
    title: "Danone",
    subtitle: "One Planet · One Health",
    content: "Presented by: Ahmed Sabri · Ahmed Awad · Tarik",
    icon: Globe,
    media: "img/danone-w.png",
    details: ["The world's largest yogurt company — and, since November 2025, the world's largest B Corp food company. [3][8][9]","Our journey today: Global picture → Egypt → SWOT → STP → 4 Ps → 5 marketing problems."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "What We'll Cover",
    subtitle: "Strategic Roadmap",
    content: "Diagnosis-first, then solution — exactly as the lecture taught us. Each section reuses the doctor's vocabulary.",
    icon: ListChecks,
    media: "img/unsplash-1454165804606-c3d57bc86b40.jpg",
    details: ["1. Company — Founding · Group · Egypt","2. Vision · Mission — One Planet · One Health","3. Market in Egypt","4. SWOT — Strengths · Weaknesses · Opportunities · Threats","5. STP — Segmentation · Targeting · Positioning","6. Objectives — Marketing · Financial","7. The 4 Ps — Customer at the centre","8. 5 Problems — Diagnosis · Solution"]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "1919 · Barcelona · A Pharmacy Yogurt",
    subtitle: "Founding Story",
    content: "One of the world's oldest food brands — with an unusual origin. Yogurt was sold in pharmacies as medicine because Western Europe didn't know what yogurt was. That science-meets-health DNA still drives the company today. [1][2]",
    icon: Calendar,
    media: "img/unsplash-1539037116277-4db20889f2d4.jpg",
    details: ["Isaac Carasso — a Thessaloniki-born physician — moved to Barcelona inspired by Mechnikov's lactic-acid bacteria research at the Institut Pasteur. [1][2]","\"Danone\" was the family's pet-name for Carasso's son Daniel — like saying \"Little Dan\" or \"Dani\" in Catalan (Barcelona's language). He named the brand after his son. [1][2]","Note: Danette (a chocolate dessert pudding launched in 1971) is a separate product — not the meaning of the name Danone.","A century later: 120+ countries · world's largest B Corp food company. [8][9]"]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Danone Group · At a Glance",
    subtitle: "FY-2024 Actuals [3][5]",
    content: "+4.3% like-for-like growth, margin +39 bps, €3.0B free cash flow. Renew Danone is delivering. [3][5]",
    icon: BarChart3,
    media: "img/unsplash-1551288049-bebda4e38f71.jpg",
    stats: [{"label":"FY-2024 Revenue","value":"€27.4B"},{"label":"Global Yogurt Share","value":"18.5%"},{"label":"Employees Worldwide","value":"90K"},{"label":"Countries","value":"120+"}],
    details: ["Recurring operating margin 13.0% (+39 bps) [3][5]","Net income €2.02B · Free cash flow €3.0B [3][5]"]
  },
  {
    theme: "green",
    layout: "split-right",
    title: "Three Business Segments",
    subtitle: "FY-2024 Revenue Mix [3][7]",
    content: "EDP remains the largest segment but has slowed; Waters and Specialized Nutrition are now pulling the growth story.",
    icon: PieChart,
    media: "danone-products.png",
    details: ["Essential Dairy & Plant-Based — €13.46B (Activia, Actimel, Danio, Danette, Alpro, Silk, Oikos) [3][7]","Specialized Nutrition — €8.94B (Aptamil, Nutricia, Nutrilon, Neocate — highest margin) [3][7]","Waters — €4.98B (Evian, Volvic, Aqua, Bonafont) [3][7]"]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "Timeline · 1919 → Today",
    subtitle: "A century of nutrition and health",
    content: "Six milestones that shaped today's Danone — from a Barcelona pharmacy to the world's largest B Corp food company.",
    icon: History,
    media: "img/unsplash-1461360370896-922624d12aa1.jpg",
    details: ["1919 — Barcelona: Carasso sells yogurt in pharmacies as medicine [1][2]","1929 — Paris: first French Danone plant; international expansion begins [1][2]","1972 — Riboud's purpose: \"Bringing health through food to as many people as possible\" [14]","2006 — Egypt entry: Obour plant acquired, east of Cairo [16][17][18]","2007 — Numico (€12.3B): Aptamil + Nutricia join the portfolio [1]","2021 — Saint-Affrique becomes CEO → Renew Danone, world's largest B Corp 2025 [4][6][8]"]
  },
  {
    theme: "green",
    layout: "stats",
    title: "B Corp",
    subtitle: "November 2025 — The World's Largest [8][9]",
    content: "First major food multinational with global B Corp certification — a sustainable competitive advantage Juhayna cannot copy overnight. The lecture's \"societal marketing\" orientation made operational. [8][9]",
    icon: Award,
    media: "img/unsplash-1542601906990-b4d3fb778b09.jpg",
    stats: [{"label":"Legal entities certified","value":"200+"},{"label":"Countries covered","value":"60+"},{"label":"Of global B Corp workforce","value":"~9%"}],
    details: ["First global food multinational to achieve B Corp certification — only 5 months old. [8][9]"]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Vision · Mission · Values",
    subtitle: "Purpose Made Operational",
    content: "Mission (since 1972): \"Bringing health through food to as many people as possible.\" Operationalised through the One Planet · One Health framework launched in 2017. [14]",
    icon: Target,
    media: "img/unsplash-1542838132-92c53300491e.jpg",
    details: ["Vision: One Planet · One Health — human and planetary health are inseparable. [14]","Business definition: Danone is in the business of health and well-being through nutrition — not the business of producing dairy.","2030: cut carbon intensity 50% · 100% renewable electricity · 100% recyclable packaging. [14]","2050: net-zero across the full value chain, including agriculture. [14]","Method: methane reduction in dairy + regenerative agriculture with farmer partners. [14]"]
  },
  {
    theme: "red",
    layout: "hero",
    title: "Egypt",
    subtitle: "A USD 2.59 Billion Dairy Products & Eggs Market [25]",
    content: "We switch from the global story to Egypt — where 50 EGP buys 1 USD and 110 million consumers shape demand.",
    icon: MapPin,
    media: "img/unsplash-1539768942893-daf53e448371.jpg",
    details: ["USD 2.59B Dairy Products & Eggs market — structural growth headroom [25]","~50 EGP / USD after March 2024 devaluation [28][29]"]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Danone in Egypt · Since 2006",
    subtitle: "Plant · Farm · Exports · Portfolio",
    content: "Danone entered Egypt in 2006 by acquiring the Obour plant — Obour Industrial Zone, east of Cairo (NOT 6th of October City, as is sometimes incorrectly reported). [16][17]",
    icon: Factory,
    media: "img/danone-D-136.png",
    details: ["Plant — Obour: 40,000 m² · 8–9 lines · ~120,000 t/year [16][17][18]","Farm — Nubariya: ~154 feddan; powers the Gawda milk programme [16][17][18][23]","Exports +112% in 2023 — Libya, Mauritius, Kenya [17]","Portfolio: Activia, Danio, Danette, Danonino, HiPro, Aptamil, Bebelac [16][19]"]
  },
  {
    theme: "light",
    layout: "stats",
    title: "Egyptian Dairy Market",
    subtitle: "Structural growth headroom",
    content: "Each Egyptian drinks ~22 kg of milk per year — less than half of Europe's level. Plenty of room to grow.",
    icon: TrendingUp,
    media: "img/unsplash-1550583724-b2692b85b150.jpg",
    stats: [{"label":"Market size 2025","value":"$2.59B"},{"label":"Volume growth 2025","value":"2.3%"},{"label":"Dairy / person / year","value":"51.4 kg"},{"label":"Milk / person / year","value":"22.1 kg"}],
    details: ["Far below European and Gulf benchmarks → room to grow.","Regulator: National Food Safety Authority (NFSA, est. 2017)."]
  },
  {
    theme: "blue",
    layout: "split-right",
    customMedia: "egyptMap",
    title: "Footprint in Egypt",
    subtitle: "Operational anchors & distribution targets",
    content: "Danone's only two physical sites in Egypt are Obour (factory) and Nubariya (raw-milk farm). Everything else on the map is a city where Danone sells products — directly via modern trade today, or through cold-chain expansion next.",
    icon: MapIcon,
    media: "",
    details: ["Obour — the only factory: 40,000 m² · 8–9 lines · ~120,000 t/year [16][17][18]","Nubariya — the only farm: raw-milk supply for the factory [16][17][18]","Cairo & Alexandria — biggest cities Danone sells in today (modern trade, supermarkets, q-commerce) [20][21]","Mansoura, Tanta — cities Danone wants to reach next (cold-chain build-out) [23][24]","Assiut — Upper Egypt city where Danone is currently weakest [23][24]"]
  },
  {
    theme: "red",
    layout: "split-left",
    customMedia: "shareChart",
    title: "Competitive Landscape · Egypt",
    subtitle: "Approximate share of the Egyptian dairy & yogurt market",
    content: "Juhayna leads (~30%) — listed on the EGX, $293.5M revenue in 1H25 alone. Almarai is #2 (~22%). Danone Egypt sits at ~17% with a premium probiotic / functional position.",
    icon: Users,
    media: "",
    details: ["Juhayna — ~30% · EGX-listed · $293.5M revenue in 1H25 [31][32]","Almarai — ~22% · strong UHT & flavoured [37][38]","Danone Egypt — ~17% · premium probiotic + functional (Activia, Danio) [16][17]","Nestlé Egypt — ~11% · infant nutrition & water","Others (regional + neighbourhood baqala) — ~20%"]
  },
  {
    theme: "blue",
    layout: "hero",
    title: "Next: SWOT Analysis",
    subtitle: "Internal & External Environment",
    content: "Strengths · Weaknesses · Opportunities · Threats — the mandatory framework for any long-term strategic plan, exactly as the lecture taught us.",
    icon: Crosshair,
    media: "img/unsplash-1454165804606-c3d57bc86b40.jpg",
    details: ["Internal: Strengths · Weaknesses","External: Opportunities · Threats"]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Core Internal Competencies & Strengths",
    subtitle: "SWOT Analysis - STRENGTHS (Internal)",
    content: "Distinct advantages that anchor its market leadership position.",
    stats: [{"label":"Equity","value":"High"},{"label":"Supply Chain","value":"Integrated"},{"label":"R&D","value":"Access"}],
    icon: CheckCircle,
    media: "img/unsplash-1552664730-d307ca884978.jpg",
    details: ["Brand Equity: Immense global brand recognition synonymous with quality and health.","Integrated Supply Chain: Nubariya farm provides unparalleled control over milk quality.","Market Leadership: Undisputed dominance in functional and digestive health dairy (Activia).","R&D Muscle: Rapid deployment from global research centers."]
  },
  {
    theme: "red",
    layout: "stats",
    title: "Areas for Internal Improvement & Vulnerabilities",
    subtitle: "SWOT Analysis - WEAKNESSES (Internal)",
    content: "Internal vulnerabilities that require mitigation to prevent market share erosion.",
    stats: [{"label":"Logistics","value":"Overhead"},{"label":"FX","value":"Exposure"},{"label":"3rd-Party","value":"Reliance"}],
    icon: AlertTriangle,
    media: "img/unsplash-1505330622279-bf7d7fc918f4.jpg",
    details: ["Heavy Logistics Overhead: Maintaining cold chain is capital-intensive.","Third-Party Reliance: Limited total control over the 'last mile' distribution.","FX Exposure: Vulnerability due to importing specific raw materials and machinery.","Premium Perception: Barrier for penetration into ultra-low-income segments."]
  },
  {
    theme: "green",
    layout: "stats",
    title: "External Avenues for Strategic Growth",
    subtitle: "SWOT Analysis - OPPORTUNITIES (External)",
    content: "External factors and market dynamics offering avenues for significant expansion.",
    icon: TrendingUp,
    media: "img/unsplash-1486406146926-c627a92ad1ab.jpg",
    details: ["Category Expansion: Rising interest introduces premium lines and specialized protein products.","Geographic Penetration: Massive untapped potential in rural governorates and Upper Egypt.","Consumption Occasions: Shifting to 'on-the-go' healthy snacking.","Digital Commerce: Rapid growth of grocery delivery apps offers new distribution channels."]
  },
  {
    theme: "red",
    layout: "split-right",
    title: "External Risks and Market Threats",
    subtitle: "SWOT Analysis - THREATS (External)",
    content: "Macro and competitive risks that pose a danger to sustained profitability.",
    icon: ShieldAlert,
    media: "img/unsplash-1528819622765-d6bcf132f793.jpg",
    details: ["Fierce Local Competition: Rivalry from entrenched local giants dominating traditional trade.","Macroeconomic Volatility: Sustained inflation eroding consumer disposable income.","Supply Chain Shocks: Global logistical disruptions affecting critical imports.","Fleet Maintenance Risks: FX shortages threaten regular service of refrigerated fleets."]
  },
  {
    theme: "blue",
    layout: "hero",
    title: "STP",
    subtitle: "Segmentation · Targeting · Positioning",
    content: "One Egyptian dairy market, many distinct consumer groups — and one brand for each.",
    icon: Crosshair,
    media: "img/unsplash-1529390079861-591de354faf5.jpg",
    details: []
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Segmentation Bases",
    subtitle: "How we slice the Egyptian market",
    content: "Distinct segmentation bases — Geographic, Demographic, Psychographic, Behavioural — let us assign the right brand to the right consumer.",
    icon: PieChart,
    media: "img/unsplash-1556761175-5973dc0f32e7.jpg",
    details: [
      "Geographic — Concentrated in Greater Cairo, Alexandria, and the Delta urban centres. Weaker in Upper Egypt — a gap that maps directly onto cold-chain limits. Exports from Obour target Libya, Mauritius, Kenya.",
      "Demographic — Distinct brands across the family life-cycle: Danonino (young children), Activia & Danio (adult women — digestive / weight management), HiPro (active adults), Aptamil & Bebelac (infants). Income segmentation layered on top.",
      "Psychographic — Lifestyle-driven: health-conscious (Activia, Danio), active / fitness (HiPro), sustainability-aware (the B Corp story).",
      "Behavioural — Occasions (Danette, Rayeb = snack / on-the-go) · Benefits sought (Activia = digestion, Danio = protein, Danonino = growth, Aptamil = infant nutrition) · User status (repeat purchasers = highest-value segment) · Loyalty (satisfaction ≠ loyalty; dairy switching costs are low)."
    ]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Targeting Strategy",
    subtitle: "Differentiated + a concentrated niche overlay",
    content: "Danone Egypt practises differentiated targeting — distinct brand-product bundles for separate segments — with a concentrated overlay in Specialized Nutrition (Aptamil / Bebelac).",
    icon: Crosshair,
    media: "img/unsplash-1543286386-713bdd548da4.jpg",
    details: [
      "Differentiated targeting — distinct brand-product bundles for separate segments. The dominant stance across Danone's Egypt portfolio.",
      "Concentrated overlay (niche) — Aptamil / Bebelac is a niche, premium, health-led offering for parents of infants.",
      "Why differentiated, not undifferentiated — deep R&D and global resources justify it; the variability of consumer needs in dairy makes one-size-fits-all untenable. The 5 targeting-choice factors (company resources, product variability, life-cycle stage, market variability, competitor behaviour) all point the same way."
    ]
  },
  {
    theme: "blue",
    layout: "split-left",
    title: "Positioning",
    subtitle: "\"To (target & need) our (brand) is (concept) that (point of difference)\"",
    content: "Each Danone Egypt brand owns a distinct mental place. Three flagship examples below — claims taken from the actual Egypt packaging and global brand sites.",
    icon: Target,
    media: "img/unsplash-1542838132-92c53300491e.jpg",
    details: [
      "Activia — To health-conscious adult women seeking everyday digestive comfort, Activia is a daily probiotic yogurt that is 100 times stronger in stomach acidity for digestive comfort. (claim printed on Activia Egypt cup)",
      "Danio — To active adults seeking satiety with quality, Danio is a high-protein Greek-style yogurt that delivers up to 12 g of protein per serving.",
      "Danonino — To mothers seeking fun-but-nutritious snacks for young children, Danonino is a calcium- and vitamin-D-enriched mini-yogurt that supports healthy bone growth."
    ]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Commercial & Financial Objectives (2026-2028)",
    subtitle: "Market Objectives: Commercial Growth",
    content: "Focused targets for market share, distribution, and revenue diversification.",
    icon: TrendingUp,
    media: "img/unsplash-1534723452862-4c874018d66d.jpg",
    details: ["Market Share Capture: Target 3.5% increase in spoonable yogurt category over 24 months.","Distribution Expansion: Broaden retail footprint from 100k to 125k POS.","Revenue Diversification: Double-digit YoY volume growth in Specialized Nutrition.","Profitability Margin: Maintain EBITDA margins through strict cost-optimization."]
  },
  {
    theme: "green",
    layout: "split-right",
    title: "Product Development & Health Objectives",
    subtitle: "Market Objectives: Innovation & Public Health",
    content: "Commitments toward nutritional improvement, localized innovation, and community health.",
    icon: Beaker,
    media: "img/unsplash-1550583724-b2692b85b150.jpg",
    details: ["Nutritional Improvement: Re-formulating to achieve 15% reduction in added sugars by Q4 2027.","Localized Innovation: Minimum two new functional innovations tailored to Egyptian palate annually.","Community Education: Educate 1.5M mothers on first 1,000 days of early childhood nutrition."]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Integrated Marketing Mix Strategy",
    subtitle: "The Marketing Plan Overview (The 4Ps)",
    content: "A cohesive, interconnected strategy designed to maximize market penetration while protecting brand equity.",
    icon: PieChart,
    media: "img/unsplash-1542838132-92c53300491e.jpg",
    details: ["Product: Delivering scientifically backed, tailored nutritional solutions.","Price: Dual strategy focusing on premium health-value margins and broad accessibility.","Place: Omnichannel network overcoming logistical challenges.","Promotion: Educational, digitally-led communication to build loyalty."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Product Strategy: Essential Dairy Line",
    subtitle: "Marketing Mix - PRODUCT (Core Portfolio)",
    content: "Focusing on household staples, flagship probiotics, and indulgence categories.",
    icon: Box,
    media: "img/unsplash-1601584115197-04ecc0da31d7.jpg",
    details: ["Danone Plain Yogurt: Foundational household staple for consumption and culinary use.","Activia: Flagship, high-margin probiotic brand targeting digestive wellness and gut health.","Danette: Premium dairy desserts offering a superior, creamy alternative.","DanUp & Mix: Drinkable yogurts for on-the-go energy and satiety."]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Product Strategy: Specialized & Accessible Nutrition",
    subtitle: "Marketing Mix - PRODUCT (Targeted Nutrition)",
    content: "Tailored nutritional approaches for specific life stages and demographic groups.",
    icon: PlusCircle,
    media: "img/unsplash-1589923188900-85dae523342b.jpg",
    details: ["Specialized Nutrition: Premium infant formulas (Bebelac & Aptamil) marketed ethically.","Dango Line: Fortified, affordable snacks combatting nutritional deficiencies like anemia.","Plant-Based Exploration: Introducing Alpro for lactose-intolerant and vegan demographics."]
  },
  {
    theme: "blue",
    layout: "split-right",
    title: "Pricing Strategy: Value vs. Volume",
    subtitle: "Marketing Mix - PRICE (Value & Margin Strategy)",
    content: "Balancing premium positioning with competitive mass market realities.",
    icon: Coins,
    media: "img/unsplash-1511632765486-a01980e01a18.jpg",
    details: ["Value-Based Pricing: Applied strictly to functional/specialized brands mapping to clinical benefits.","Competitive Parity Pricing: Applied to plain yogurt lines to prevent market share erosion.","Dynamic Architecture: Advanced revenue growth management to manage promotional discounts."]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "Pricing Strategy: Reaching the Base of the Pyramid",
    subtitle: "Marketing Mix - PRICE (Accessibility Strategy)",
    content: "Tactics designed to ensure availability despite economic constraints.",
    icon: Users,
    media: "img/unsplash-1725977253066-c4551247bc49.jpg",
    details: ["Combating 'Shrinkflation': Designing smaller SKUs hitting psychological coin-price points.","Nutritional Accessibility: Low margins on 'Dango' ensuring protein/vitamins remain viable.","Bulk Formats for HORECA: Cost-effective formats tailored to secure steady B2B revenue."]
  },
  {
    theme: "red",
    layout: "split-right",
    title: "Distribution Infrastructure",
    subtitle: "Marketing Mix — PLACE (network & cold chain)",
    content: "Egypt is hot, vast and traffic-dense. Danone's distribution network is built around a strict 2–6 °C cold chain across the country.",
    icon: Truck,
    media: "img/unsplash-1574607383476-f517f260d30b.jpg",
    details: [
      "Cold-chain spec — 2–6 °C maintained from plant → DC → retailer.",
      "Network — 31 primary Distribution Centres across the republic.",
      "Routing — advanced route-planning software; specialised cold-vehicle maintenance protocols.",
      "Al-Omda Project — rural milk-collection programme using cooling tricycles, expanding rural reach."
    ]
  },
  {
    theme: "blue",
    layout: "split-left",
    title: "Distribution Models — Danone vs Juhayna",
    subtitle: "Marketing Mix — PLACE (fleet & route-to-market structure)",
    content: "Two structurally different go-to-market models. Different shelf-life economics, different fleet ownership, different traditional-trade depth.",
    icon: Briefcase,
    media: "img/unsplash-1519003722824-194d4455a60c.jpg",
    details: [
      "Fleet model — Danone: hybrid (own + 3rd-party). Juhayna: largely owned, vertically integrated.",
      "Product mix — Danone: chilled fresh dairy (short shelf life). Juhayna: chilled + UHT-ambient (longer shelf life unlocks more outlets).",
      "Modern trade — Danone: stronger, premium positioning. Juhayna: present, value-tier focus.",
      "Traditional trade (baqala) — Juhayna: entrenched route-to-market. Danone: challenger position."
    ]
  },
  {
    theme: "green",
    layout: "stats",
    title: "Promotional Strategy: Digital-First & Educational",
    subtitle: "Marketing Mix - PROMOTION (Communication & Engagement)",
    content: "A multi-channel promotional approach blending digital reach with targeted physical activations.",
    icon: Heart,
    media: "img/unsplash-1578916171728-46686eac8d58.jpg",
    details: ["Digital Transformation: Targeting social media (TikTok, Meta, YouTube) for Gen Z and millennial moms.","Influencer Ecosystem: Building Key Opinion Leaders—nutritionists, pediatricians, lifestyle.","Experiential Marketing: Visibility in BTL activations with extensive in-store sampling.","Data-Driven CRM: Building direct relationships through loyalty programs and parenting apps."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Promotional Strategy: Integrating CSR and Brand Value",
    subtitle: "Marketing Mix - PROMOTION (Purpose-Driven CSR)",
    content: "Integrating social responsibility deeply into corporate brand identity.",
    icon: Handshake,
    media: "img/unsplash-1460925895917-afdab827c52f.jpg",
    details: ["Egyptian Food Bank Alliance: Product donations and campaigns to eradicate hunger/waste.","Health Awareness Caravans: Mobile clinics offering free nutritional assessments to communities.","Academic Partnerships: Sponsoring research on Egyptian dietary habits to reinforce authority."]
  },
  {
    theme: "red",
    layout: "hero",
    title: "5 Marketing Problems",
    subtitle: "Diagnosis → Proposed Solution",
    content: "We identified five concrete problems Danone Egypt faces in 2026. For each, we frame the diagnosis, then propose actions across Product · Price · Place · Promotion.",
    icon: AlertTriangle,
    media: "img/unsplash-1521791136064-7986c2920216.jpg",
    details: []
  },
  {
    theme: "red",
    layout: "split-right",
    title: "Problem 1 — EGP Devaluation",
    subtitle: "Imported-input cost shock",
    content: "The pound floated to ~EGP 50 / USD in March 2024 (38% one-day devaluation); food inflation peaked at 47%. Milk-powder, packaging-resin and capex costs in EGP rose sharply. Juhayna pushed list prices up to +30% as a benchmark — but Danone's premium positioning makes consumers more elasticity-sensitive.",
    icon: TrendingDown,
    media: "img/unsplash-1554224155-6726b3ff858f.jpg",
    details: [
      "🩺 Diagnosis — Hard-currency input costs vs price-elastic premium consumers. [28][29][33]",
      "💡 Place — Deepen the Gawda local-milk programme to raise local-content ratio and cut hard-currency exposure.",
      "💡 Product — Introduce smaller, lower-EGP-ticket packs (single-serve cups; smaller multi-packs).",
      "💡 Price — Stagger by SKU: carry the burden on Danio / Activia Light, hold the line on Danonino / Activia Rayeb."
    ]
  },
  {
    theme: "blue",
    layout: "split-left",
    title: "Problem 2 — Juhayna's Scale",
    subtitle: "The baqala-channel share gap",
    content: "Juhayna's 1H-2025 revenue was up +23% YoY to USD 293.5M, with deeper traditional-trade reach and a value-tier portfolio that out-prices Danone in mainstream yogurt and rayeb. Danone's premium positioning works in modern trade but exposes a share gap in the much larger baqala channel.",
    icon: Users,
    media: "img/unsplash-1595981234058-a9302fb97229.jpg",
    details: [
      "🩺 Diagnosis — Strong in modern trade, weak in baqala (~400 K outlets). [25][32][33]",
      "💡 Place — Partner with regional sub-distributors for top-tier baqala in chosen Delta + Upper Egypt cities; subsidise chiller placement.",
      "💡 Product — Launch a \"Danone Fundamentals\" value SKU sized for the baqala basket — a market-penetration play (Ansoff).",
      "💡 Promotion — Disproportionate ad weight for Activia + Danio in modern trade and q-commerce, where premium positioning earns its margin."
    ]
  },
  {
    theme: "green",
    layout: "split-right",
    title: "Problem 3 — Education Gap",
    subtitle: "Functional dairy & plant-based awareness",
    content: "Activia's gut-health and Danio's high-protein propositions need sustained shopper education in a market where plain yogurt and rayeb are habitual. Plant-based dairy (Alpro) has minimal MENA awareness vs Europe — opportunity, but high marketing-spend ratio.",
    icon: Beaker,
    media: "img/unsplash-1576091160550-2173dba999ef.jpg",
    details: [
      "🩺 Diagnosis — Habit defaults beat functional claims unless the consumer is taught. [13][15]",
      "💡 Promotion — \"14 Days with Activia\" digital + TV campaign reviving the original clinical claim, with paediatrician / gastroenterologist PR.",
      "💡 Product — Pilot Alpro in modern trade only (concentrated targeting) — 2 SKUs to test category economics before broadening.",
      "💡 Place — Lean on q-commerce subscription models (Breadfast) to convert trial into routine."
    ]
  },
  {
    theme: "red",
    layout: "split-left",
    title: "Problem 4 — Sugar Regulation Risk",
    subtitle: "Danette's exposure & MENA momentum",
    content: "Dairy desserts like Danette are under increasing parental and regulator scrutiny across MENA. Regional momentum (Saudi sugar tax, UAE front-of-pack labelling) signals upcoming Egyptian pressure.",
    icon: ShieldAlert,
    media: "img/unsplash-1528207776546-365bb710ee93.jpg",
    details: [
      "🩺 Diagnosis — Long-term consumer / regulator interest must be balanced with short-term commercial appeal — before Egypt legislates.",
      "💡 Product — Launch Danette Reduced-Sugar variant (line extension) and reformulate the core variant in line with global Danone reformulation.",
      "💡 Promotion — Front-load Gawda / Omda-style social PR around child nutrition (Danonino) so the brand narrative is health-positive when regulation lands.",
      "💡 Price — Hold reformulated Danette at the same shelf price as the legacy variant — accept input-cost hit to protect category trust."
    ]
  },
  {
    theme: "blue",
    layout: "split-right",
    title: "Problem 5 — Cold-Chain Reach",
    subtitle: "The downstream distribution choke-point",
    content: "Egypt's ~400,000 baqala outlets dominate FMCG by transaction count, but cold-chain limits and Juhayna's entrenched route-to-market constrain Danone beyond Cairo, Alexandria and Delta urban centres. Gawda targets the upstream side — downstream chilled distribution remains the choke-point.",
    icon: Truck,
    media: "img/unsplash-1586528116311-ad8dd3c8310d.jpg",
    details: [
      "🩺 Diagnosis — Upstream milk supply solved (Gawda); downstream chilled-trucking gap remains. [23][24]",
      "💡 Place — Invest in regional cold-chain hubs (Mansoura, Tanta, Assiut) — possibly co-funded with EBRD / IFC sustainability lending given B Corp credentials.",
      "💡 Product — Prioritise UHT-style or longer-shelf-life formats for upstream regions where chilled is unrealistic, complementing the chilled core.",
      "💡 Promotion — Regional advertising on Sa'idi / Delta channels + partnerships with local football clubs to localise the brand image."
    ]
  },
  {
    theme: "light",
    layout: "references",
    title: "References",
    subtitle: "Sources cited throughout the deck",
    content: "All facts, figures and quotes in this presentation are referenced inline as [n] and resolved here.",
    icon: ListChecks,
    media: "",
    details: []
  },
  {
    theme: "blue",
    layout: "hero",
    title: "Thank You",
    subtitle: "Questions & Discussion",
    content: "We hope this was useful. Open floor for questions.",
    icon: Heart,
    media: "img/unsplash-1464822759023-fed622ff2c3b.jpg",
    details: [
      "Ahmed Sabri · Ahmed Awad · Tarik",
      "EMBA Marketing Project · 2026"
    ]
  }
];

const pagesData = rawPagesData.map((page, index) => ({ ...page, id: index + 1 }));

const themeStyles = {
  blue: {
    bg: "bg-[#001489]",
    textPrimary: "text-white",
    textSecondary: "text-blue-50",
    accent: "bg-[#379906] text-white",
    iconContainer: "bg-white/10 text-white border-white/20"
  },
  green: {
    bg: "bg-[#379906]",
    textPrimary: "text-white",
    textSecondary: "text-green-50",
    accent: "bg-[#001489] text-white",
    iconContainer: "bg-white/10 text-white border-white/20"
  },
  red: {
    bg: "bg-red-700",
    textPrimary: "text-white",
    textSecondary: "text-red-50",
    accent: "bg-white text-red-900",
    iconContainer: "bg-white/10 text-white border-white/20"
  },
  light: {
    bg: "bg-[#FAFAFA]",
    textPrimary: "text-[#001489]",
    textSecondary: "text-gray-700",
    accent: "bg-[#379906] text-white",
    iconContainer: "bg-[#001489]/5 text-[#001489] border-[#001489]/10"
  }
};

const MediaLayer = ({ src, alt = "Media element", asBlob = false }: { src: string, alt?: string, asBlob?: boolean }) => {
  return (
    <img
      src={src}
      className={cn("absolute inset-0 w-full h-full object-cover", asBlob ? "" : "")}
      alt={alt}
      loading="lazy"
    />
  );
};

const EGYPT_CITIES = [
  { name: "Obour Plant",   lng: 31.4670, lat: 30.2103, primary: true,  role: "plant" as const, dx: 14, dy:  4 },
  { name: "Nubariya Farm", lng: 30.0000, lat: 30.6700, primary: true,  role: "farm"  as const, dx: -8, dy:  4, anchor: "end" as const },
  { name: "Cairo",         lng: 31.2357, lat: 30.0444,                   role: "city"  as const, dx: -8, dy: 18, anchor: "end" as const },
  { name: "Alexandria",    lng: 29.9187, lat: 31.2001,                   role: "city"  as const, dx: -8, dy: -8, anchor: "end" as const },
  { name: "Mansoura",      lng: 31.3807, lat: 31.0364,                   role: "city"  as const, dx: 12, dy: -6 },
  { name: "Tanta",         lng: 30.9876, lat: 30.7865,                   role: "city"  as const, dx: -8, dy: -8, anchor: "end" as const },
  { name: "Assiut",        lng: 31.1825, lat: 27.1809,                   role: "city"  as const, dx: 12, dy:  4 },
];

const EgyptMap = () => {
  const W = 600, H = 700;
  const data = egyptGeoJSON as any;
  const projection = geoMercator().fitSize([W, H], data);
  const pathGen = geoPath(projection);
  const outline = pathGen(data.features[0]) || "";
  const fillOf = (r: string) => r === "plant" ? "#FACC15" : r === "farm" ? "#22c55e" : "#FFFFFF";
  const sizeOf = (primary: boolean) => primary ? 11 : 7;
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#001489] via-[#001489] to-[#0b3a6f] flex items-center justify-center">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="egGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,191,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,191,255,0.04)" />
          </linearGradient>
        </defs>
        <path
          d={outline}
          fill="url(#egGlow)"
          stroke="#00bfff"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        {EGYPT_CITIES.map((c, i) => {
          const p = projection([c.lng, c.lat]);
          if (!p) return null;
          const [x, y] = p;
          const r = sizeOf(!!c.primary);
          const anchor = (c as any).anchor || "start";
          return (
            <g key={c.name} transform={`translate(${x},${y})`}>
              <circle r={r} fill={fillOf(c.role)} stroke="#001489" strokeWidth={1.5}>
                <animate attributeName="r" values={`${r};${r * 1.35};${r}`} dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
              </circle>
              <text
                x={c.dx}
                y={c.dy}
                fill="#FFFFFF"
                fontSize={c.primary ? 16 : 13}
                fontWeight={c.primary ? 700 : 500}
                fontFamily="Montserrat, sans-serif"
                textAnchor={anchor}
                style={{ paintOrder: "stroke", stroke: "rgba(0,20,137,0.85)", strokeWidth: 3, strokeLinejoin: "round" }}
              >
                {c.name}
              </text>
            </g>
          );
        })}
        {/* Legend (bottom-right inside Red Sea area) */}
        <g transform={`translate(${W * 0.05}, ${H * 0.88})`}>
          <rect x={-8} y={-14} width={250} height={62} rx={6} fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.25)" />
          <circle cx={4}  cy={0}  r={6} fill="#FACC15" /><text x={16} y={4}  fill="#fff" fontSize={12} fontFamily="Open Sans">Obour plant (factory)</text>
          <circle cx={4}  cy={18} r={6} fill="#22c55e" /><text x={16} y={22} fill="#fff" fontSize={12} fontFamily="Open Sans">Nubariya farm (raw milk)</text>
          <circle cx={4}  cy={36} r={4} fill="#FFFFFF" /><text x={16} y={40} fill="#fff" fontSize={12} fontFamily="Open Sans">Cities Danone sells in</text>
        </g>
      </svg>
    </div>
  );
};

const ShareChart = () => {
  // Indicative share-of-market estimates of the Egyptian dairy & yogurt market.
  // Derived from Juhayna 1H25 revenue [32] vs total market size [25]; Almarai/Beyti [37][38]; Danone Egypt [16][17].
  const data = [
    { name: "Juhayna",                 value: 30, color: "#001489" },
    { name: "Almarai",                 value: 22, color: "#379906" },
    { name: "Danone Egypt",            value: 17, color: "#22c55e" },
    { name: "Nestlé Egypt",            value: 11, color: "#f59e0b" },
    { name: "Others (regional, baqala)", value: 20, color: "#94a3b8" },
  ];
  return (
    <div className="absolute inset-0 w-full h-full bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <p className="text-xs font-bold uppercase tracking-widest text-[#001489] mb-3">Share of Egyptian dairy &amp; yogurt market — total = 100%</p>
        <div className="flex flex-col gap-3">
          {data.map(d => (
            <div key={d.name}>
              <div className="flex justify-between text-sm font-semibold mb-1" style={{ color: "#001489" }}>
                <span>{d.name}</span>
                <span>{d.value}%</span>
              </div>
              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${d.value}%`, background: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500 italic">Indicative shares. Sources: [25][32][37][38][16][17].</p>
      </div>
    </div>
  );
};

const getBlobClass = (id: number) => {
  const classes = ["cow-shape-1", "cow-shape-2", "cow-shape-3", "milk-shape"];
  return classes[id % classes.length];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.22 } }
};

const imgVariants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: "tween", ease: "easeOut", duration: 0.3 }
  }
};

const PageSection = ({ page, index }: { page: typeof pagesData[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const type = page.theme as keyof typeof themeStyles;
  const theme = themeStyles[type] || themeStyles.light;
  
  return (
    <section 
      ref={ref}
      id={`page-${page.id}`}
      className={cn(
        "relative h-screen w-full flex items-center justify-center overflow-hidden pt-28 md:pt-36 px-6 md:px-12 pb-8 md:pb-12",
        theme.bg,
        "page-snap-section"
      )}
    >
      <MilkWaveTop />
      <FloatingDecorations colorClass={theme.textPrimary} id={page.id} />
      <AnimatedShapes id={page.id} colorClass={theme.textPrimary} />
      {page.layout === "hero" && (
        <>
          <div className="absolute inset-0 z-0 opacity-30">
            <MediaLayer src={page.media} alt={page.title} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div
              variants={itemVariants}
              className={cn("w-24 h-24 rounded-full flex items-center justify-center mb-8 border", theme.iconContainer)}
            >
              <page.icon size={48} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="mb-4 inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold uppercase tracking-widest text-white border border-white/30">
                Page {page.id} of {pagesData.length}
              </div>
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-5xl md:text-8xl font-black mb-6 font-heading tracking-tight", theme.textPrimary)}>
              {page.title}
            </motion.h2>
            <motion.p variants={itemVariants} className={cn("text-xl md:text-3xl font-light mb-8", theme.textSecondary)}>
              {page.subtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="w-16 h-1 bg-current mx-auto opacity-50 mb-8" />
            
            <motion.p variants={itemVariants} className={cn("text-lg font-medium max-w-2xl mx-auto", theme.textPrimary)}>
              {page.content}
            </motion.p>
            {page.details && (
              <motion.ul variants={itemVariants} className="mt-8 text-left max-w-2xl mx-auto space-y-3">
                {page.details.map((detail, idx) => (
                  <motion.li 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.03, originX: 0, x: 10, textShadow: "0px 4px 10px rgba(0,0,0,0.15)" }}
                    className={cn("flex items-start gap-3 cursor-pointer", theme.textSecondary)}
                  >
                    <CheckCircle className="shrink-0 mt-1 opacity-70" size={18} />
                    <span className="text-base font-medium">{detail}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </>
      )}

      {page.layout === "split-right" && (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible"
          className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1 flex flex-col items-start text-left">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className={cn("inline-flex items-center justify-center w-10 h-10 rounded-lg border", theme.iconContainer)}>
                <page.icon size={20} />
              </span>
              <span className={cn("text-sm font-bold tracking-widest uppercase opacity-70", theme.textPrimary)}>
                Insight {page.id}
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-3xl md:text-5xl font-black mb-2 font-heading", theme.textPrimary)}>{page.title}</motion.h2>
            <motion.h3 variants={itemVariants} className={cn("text-lg md:text-xl font-light mb-4", theme.textSecondary)}>{page.subtitle}</motion.h3>

            <motion.p variants={itemVariants} className={cn("text-sm md:text-base leading-relaxed mb-3", theme.textPrimary)}>{page.content}</motion.p>
            {page.details && (
              <ul className="space-y-2">
                {page.details.map((detail, idx) => (
                  <motion.li 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.1)" }}
                    className={cn("flex items-start gap-3 p-2.5 rounded-xl bg-black/5 backdrop-blur-sm border border-black/5 cursor-pointer", theme.textSecondary)}
                  >
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={16} />
                    <span className="text-sm font-medium opacity-90 leading-snug">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <motion.div
            variants={imgVariants}
            className={cn("relative aspect-square md:aspect-video lg:aspect-square overflow-hidden shadow-2xl order-1 lg:order-2 border-8 border-white/40", getBlobClass(page.id))}
          >
            {(page as any).customMedia === "egyptMap" ? <EgyptMap /> :
             (page as any).customMedia === "shareChart" ? <ShareChart /> :
             <MediaLayer src={page.media} alt={page.title} asBlob />}
          </motion.div>
        </motion.div>
      )}

      {page.layout === "split-left" && (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible"
          className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={imgVariants}
            className={cn("relative aspect-square md:aspect-video lg:aspect-square overflow-hidden shadow-2xl border-8 border-white/40", getBlobClass(page.id + 1))}
          >
            {(page as any).customMedia === "egyptMap" ? <EgyptMap /> :
             (page as any).customMedia === "shareChart" ? <ShareChart /> :
             <MediaLayer src={page.media} alt={page.title} asBlob />}
          </motion.div>
          <div className="flex flex-col items-start text-left">
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className={cn("inline-flex items-center justify-center w-10 h-10 rounded-lg border", theme.iconContainer)}>
                <page.icon size={20} />
              </span>
              <span className={cn("text-sm font-bold tracking-widest uppercase opacity-70", theme.textPrimary)}>
                Insight {page.id}
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-3xl md:text-5xl font-black mb-2 font-heading", theme.textPrimary)}>{page.title}</motion.h2>
            <motion.h3 variants={itemVariants} className={cn("text-lg md:text-xl font-light mb-4", theme.textSecondary)}>{page.subtitle}</motion.h3>

            <motion.p variants={itemVariants} className={cn("text-sm md:text-base leading-relaxed mb-3", theme.textPrimary)}>{page.content}</motion.p>
            {page.details && (
              <ul className="space-y-2">
                {page.details.map((detail, idx) => (
                  <motion.li 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.1)" }}
                    className={cn("flex items-start gap-3 p-2.5 rounded-xl bg-black/5 backdrop-blur-sm border border-black/5 cursor-pointer", theme.textSecondary)}
                  >
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={16} />
                    <span className="text-sm font-medium opacity-90 leading-snug">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}

      {page.layout === "stats" && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center"
        >
          <div className="text-center mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 border mx-auto shadow-sm" style={{ backgroundColor: theme.iconContainer.split(' ')[0].replace('bg-', '') }}>
               <page.icon size={40} className={theme.textPrimary} />
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-5xl md:text-7xl font-black mb-4 font-heading", theme.textPrimary)}>{page.title}</motion.h2>
            
            <motion.h3 variants={itemVariants} className={cn("text-2xl font-light", theme.textSecondary)}>{page.subtitle}</motion.h3>
            <motion.p variants={itemVariants} className={cn("mt-4 text-lg font-medium", theme.textPrimary)}>{page.content}</motion.p>
            {page.details && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                {page.details.map((detail, idx) => (
                  <motion.div 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
                    className={cn("flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer", theme.textPrimary)}
                  >
                    <CheckCircle size={18} className="shrink-0 mt-0.5 opacity-70" />
                    <span className="text-sm font-medium">{detail}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {page.stats?.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center"
              >
                <div className={cn("text-4xl md:text-5xl font-black mb-2", theme.textPrimary)}>{stat.value}</div>
                <div className={cn("text-sm uppercase tracking-widest font-bold opacity-80", theme.textSecondary)}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {page.layout === "references" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h2 className={cn("text-4xl md:text-6xl font-black font-heading", theme.textPrimary)}>{page.title}</h2>
            <p className={cn("text-lg md:text-xl font-light mt-2", theme.textSecondary)}>{page.subtitle}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex-1 overflow-y-auto pr-2"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {REFERENCES.map(r => (
                <a
                  key={r.n}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex gap-3 items-start p-3 rounded-lg border bg-white/60 backdrop-blur-sm transition hover:bg-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer", theme.iconContainer)}
                >
                  <span className={cn("shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md font-black text-sm", theme.accent)}>
                    {r.n}
                  </span>
                  <div className="text-left min-w-0">
                    <p className={cn("text-sm font-semibold leading-snug", theme.textPrimary)}>{r.title}</p>
                    <p className={cn("text-xs italic opacity-70 mt-0.5 break-all", theme.textSecondary)}>{r.publisher} · {r.url.replace(/^https?:\/\//, '').slice(0, 50)}…</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const FloatingDecorations = ({ colorClass, id }: { colorClass: string, id: number }) => {
  const elements = [
    { Icon: Rocket, size: 36, left: "10%", duration: 15, delay: 0 },
    { Icon: Leaf, size: 24, left: "25%", duration: 20, delay: 2 },
    { Icon: Heart, size: 28, left: "45%", duration: 18, delay: 5 },
    { Icon: Beaker, size: 36, left: "70%", duration: 22, delay: 1 },
    { Icon: PlusCircle, size: 20, left: "85%", duration: 16, delay: 4 },
    { Icon: Rocket, size: 28, left: "55%", duration: 14, delay: 7 },
    { Icon: Activity, size: 32, left: "5%", duration: 19, delay: 3 },
    { Icon: Apple, size: 26, left: "35%", duration: 17, delay: 8 },
    { Icon: Globe, size: 40, left: "65%", duration: 25, delay: 2 },
    { Icon: TrendingUp, size: 30, left: "90%", duration: 21, delay: 6 },
    { Icon: Droplet, size: 24, left: "15%", duration: 16, delay: 9 },
    { Icon: ShieldPlus, size: 34, left: "75%", duration: 23, delay: 11 },
    { Icon: HeartPulse, size: 28, left: "30%", duration: 18, delay: 10 },
    { Icon: Rocket, size: 22, left: "80%", duration: 15, delay: 13 },
    { Icon: Cookie, size: 26, left: "50%", duration: 20, delay: 12 },
    { Icon: Milk, size: 32, left: "20%", duration: 17, delay: 14 },
    { Icon: Sparkles, size: 28, left: "95%", duration: 24, delay: 5 },
    { Icon: Carrot, size: 30, left: "40%", duration: 19, delay: 15 },
    { Icon: Rocket, size: 40, left: "60%", duration: 26, delay: 8 },
    { text: "DANONE", size: 48, left: "22%", duration: 21, delay: 5 },
    { text: "EGYPT", size: 40, left: "68%", duration: 24, delay: 12 },
    { text: "DANONE", size: 32, left: "82%", duration: 16, delay: 3 },
    { text: "EGYPT", size: 28, left: "12%", duration: 19, delay: 9 },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", colorClass)}>
      {elements.map((el, i) => {
        // Vary the duration, delay, position, and rotation based on the slide id
        const offsetDelay = (el.delay + id * 1.5) % 15;
        const variedDuration = el.duration + (id % 5) - 2; // slightly faster or slower
        const leftPos = (parseInt(el.left) + id * 7) % 100;
        const xSway = ((i + id) % 2 === 0 ? 30 + id * 2 : -30 - id * 2);
        const variedScale = 0.5 + ((id + i) % 8) * 0.2; // more varied sizes

        return (
          <motion.div
            key={i}
            className="absolute opacity-10 flex text-current items-center justify-center font-black tracking-widest"
            initial={{ y: "110vh", x: 0, rotate: 0, scale: variedScale }}
            animate={{
              y: ["110vh", "-10vh"],
              x: [0, xSway, 0],
              rotate: [0, 180 + id * 15, 360],
            }}
            transition={{
              duration: variedDuration,
              delay: offsetDelay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${leftPos}%`, fontSize: typeof el.size === 'number' && 'text' in el ? el.size : undefined }}
          >
            {el.Icon ? <el.Icon size={el.size} /> : <span>{el.text}</span>}
          </motion.div>
        );
      })}
    </div>
  );
}

const MilkWaveTop = () => (
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none drop-shadow-md">
    <svg 
      className="relative block w-full h-16 md:h-28" 
      data-name="Layer 1" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
    >
        <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white" opacity=".25"
        ></path>
        <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" 
            className="fill-white" opacity=".5"
        ></path>
        <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-white"
        ></path>
    </svg>
  </div>
);

const AnimatedShapes = ({ id, colorClass }: { id: number, colorClass: string }) => {
  const variant = id % 4;
  
  const fluidBorder1 = ["54% 46% 43% 57% / 41% 48% 52% 59%", "35% 65% 54% 46% / 55% 36% 64% 45%", "60% 40% 64% 36% / 45% 61% 39% 55%", "54% 46% 43% 57% / 41% 48% 52% 59%"];
  const fluidBorder2 = ["65% 35% 42% 58% / 37% 61% 39% 63%", "45% 55% 58% 42% / 62% 43% 57% 38%", "30% 70% 35% 65% / 45% 41% 59% 55%", "65% 35% 42% 58% / 37% 61% 39% 63%"];
  const fluidBorder3 = ["35% 65% 42% 58% / 61% 37% 63% 39%", "55% 45% 50% 50% / 39% 54% 46% 61%", "65% 35% 60% 40% / 55% 48% 52% 45%", "35% 65% 42% 58% / 61% 37% 63% 39%"];

  // Varied offsets to avoid repetition across slides
  const durationOffset1 = (id % 7);
  const durationOffset2 = (id % 5);
  const scaleMod1 = 1 + (id % 3) * 0.1;
  const scaleMod2 = 0.9 + ((id + 1) % 3) * 0.1;

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-overlay", colorClass)}>
      {variant === 0 && (
        <>
          <motion.div
            animate={{ y: [0, -40 - id * 5, 0], x: [0, id * 10, 0], rotate: [0, 10 + id, -10 - id, 0], scale: [1, scaleMod1, 1], borderRadius: fluidBorder1 }}
            transition={{ duration: 15 + durationOffset1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-current opacity-10 blur-3xl milk-shape"
          />
          <motion.div
            animate={{ y: [0, 30 + id * 3, 0], x: [0, 20 + id * 5, 0], borderRadius: fluidBorder2 }}
            transition={{ duration: 10 + durationOffset2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[10%] w-64 h-64 opacity-5"
            style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 40px)"
            }}
          />
        </>
      )}

      {variant === 1 && (
        <>
          <motion.div
            animate={{ x: [0, -30 - id * 5, 0], y: [0, id * 8, 0], rotate: [0, -15 - id, 0], scale: [1, scaleMod1, 1], borderRadius: fluidBorder2 }}
            transition={{ duration: 18 + durationOffset1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-current opacity-10 blur-3xl cow-shape-1"
          />
          <motion.div
            animate={{ x: [0, 40 + id * 5, 0], y: [0, -20 - id * 3, 0], borderRadius: fluidBorder3 }}
            transition={{ duration: 20 + durationOffset2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-48 h-48 opacity-5 cow-shape-2"
            style={{
              background: "repeating-linear-gradient(-45deg, transparent, transparent 15px, currentColor 15px, currentColor 30px)"
            }}
          />
        </>
      )}

      {variant === 2 && (
        <>
          <motion.div
            animate={{ y: [0, 50 + id * 5, 0], x: [0, -20 - id * 5, 0], rotate: [0, 20 + id, 0], scale: [1, scaleMod2, 1], borderRadius: fluidBorder3 }}
            transition={{ duration: 16 + durationOffset1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-current opacity-10 blur-3xl cow-shape-3"
          />
          <motion.div
            animate={{ rotate: [0, 180 + id * 20, 360], scale: [1, scaleMod1, 1], borderRadius: fluidBorder1 }}
            transition={{ duration: 60 - durationOffset2 * 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] right-[20%] w-56 h-56 opacity-5 milk-shape"
            style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)"
            }}
          />
        </>
      )}

      {variant === 3 && (
        <>
          <motion.div
            animate={{ x: [0, 50 + id * 5, 0], y: [0, -30 - id * 5, 0], rotate: [0, -10 - id, 0], scale: [1, scaleMod1, 1], borderRadius: fluidBorder2 }}
            transition={{ duration: 17 + durationOffset1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[20%] w-[55vw] h-[55vw] bg-current opacity-10 blur-3xl cow-shape-2"
          />
          <motion.div
            animate={{ y: [0, 40 + id * 3, 0], x: [0, id * 5, 0], rotate: [0, -5 - id, 0], scale: [1, scaleMod2, 1], borderRadius: fluidBorder3 }}
            transition={{ duration: 12 + durationOffset2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[15%] w-60 h-60 opacity-5 cow-shape-1"
            style={{
              background: "repeating-linear-gradient(135deg, transparent, transparent 25px, currentColor 25px, currentColor 50px)"
            }}
          />
        </>
      )}
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [activeId, setActiveId] = React.useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor intersection to update the sticky nav indicator
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          if (id) setActiveId(id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.page-snap-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const goTo = (id: number) => {
      const el = document.querySelector(`[data-id="${id}"]`) as HTMLElement | null;
      if (el && containerRef.current) {
        containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'auto' });
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const next = ["ArrowDown", "ArrowRight", "PageDown", " "];
      const prev = ["ArrowUp", "ArrowLeft", "PageUp"];
      if (next.includes(e.key)) { e.preventDefault(); goTo(Math.min(activeId + 1, pagesData.length)); }
      else if (prev.includes(e.key)) { e.preventDefault(); goTo(Math.max(activeId - 1, 1)); }
      else if (e.key === "Home") { e.preventDefault(); goTo(1); }
      else if (e.key === "End")  { e.preventDefault(); goTo(pagesData.length); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory bg-black">
      
      {/* Global Progress Line */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#379906] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Side Navigation Dots */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {pagesData.map((page) => (
          <a
            key={page.id}
            href={`#page-${page.id}`}
            aria-label={`Go to slide ${page.id}: ${page.title}`}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              activeId === page.id 
                ? "bg-white scale-150 ring-2 ring-white/50" 
                : "bg-white/30 hover:bg-white/60"
            )}
            title={page.title}
          />
        ))}
        <div className="text-white/50 text-[10px] font-bold text-center mt-2 tracking-widest">
          {activeId} / {pagesData.length}
        </div>
      </div>

      <div ref={containerRef}>
        {pagesData.map((page, index) => (
          <div key={page.id} data-id={page.id} className="page-snap-section snap-start snap-always w-full h-screen overflow-hidden">
             <PageSection page={page} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
