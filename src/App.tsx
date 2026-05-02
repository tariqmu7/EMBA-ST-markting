import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Globe, Leaf, Award, PieChart, Activity, PlusCircle, Factory, Building, 
  CloudRain, ShieldAlert, TrendingDown, Zap, Flame, Target, MapPin, Sun, 
  CheckCircle, AlertTriangle, TrendingUp, Crosshair, Briefcase, Crown, 
  Users, Beaker, Box, Coins, Truck, Handshake, Heart, Trophy, Rocket,
  Apple, Droplet, ShieldPlus, HeartPulse, Cookie, Milk, Sparkles, Carrot
} from 'lucide-react';
import { cn } from './lib/utils';

const rawPagesData = [
  {
    theme: "blue",
    layout: "hero",
    title: "Danone Egypt: Strategic Market Presentation",
    subtitle: "Nourishing a Healthier Future for Every Egyptian Home",
    content: "Target Audience: Internal Stakeholders, Executive Board, and Strategic Partners\nPresenter: [Your Name/Title]\nDate: May 2026",
    icon: Globe,
    media: "https://smartmedia.digital4danone.com//is/image/danonecs/w?wid=960&fmt=png-alpha&fit=wrap",
    details: ["Comprehensive Analysis: Introduction, Core Mission, Deep-Dive SWOT, Strategic Objectives, and 4Ps Marketing Mix"]
  },
  {
    theme: "light",
    layout: "stats",
    title: "Agenda & Strategic Roadmap",
    subtitle: "What to Expect",
    content: "This presentation is structured to provide a 360-degree view of Danone Egypt's market position and future trajectory:",
    icon: MapPin,
    media: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    details: ["1. Introduction & Company Overview: Global legacy and local presence.","2. Business Mission & Core Values: The driving forces behind our operations.","3. Operational Footprint in Egypt: From farm to factory to fridge.","4. Strategic Market Analysis (SWOT): Internal capabilities and external market dynamics.","5. Corporate & Market Objectives: SMART goals for the upcoming fiscal periods.","6. The Marketing Mix (4Ps): Detailed strategy across Product, Price, Place, and Promotion.","7. Strategic Implementation Roadmap: A 3-year phased execution plan.","8. Conclusion & Open Floor Q&A."]
  },
  {
    theme: "blue",
    layout: "split-right",
    title: "A Global Legacy of Health and Nutrition",
    subtitle: "Introduction to Danone Global",
    content: "Operating seamlessly across more than 120 international markets with a diverse workforce exceeding 100,000 employees. Over 100 years of expertise.",
    icon: Globe,
    media: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Position: Multinational leader in health-focused nutrition, headquartered in Paris.","Essential Dairy and Plant-Based (EDP): Largest segment focusing on gut health.","Specialized Nutrition: Early life and medical nutrition.","Waters: Premium bottled water brands promoting healthy hydration."]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Danone Egypt: Localizing a Global Vision",
    subtitle: "The Strategic Journey",
    content: "Dedicated to providing high-quality, scientifically backed healthy dairy products tailored to the dietary needs of Egyptian families.",
    icon: Briefcase,
    media: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Entry: Officially established in the Egyptian market in 2006.","Corporate Hub: Headquartered in Cairo, serving North African operations.","Economic Contribution: Employs an robust local workforce of over 1,500 professionals."]
  },
  {
    theme: "light",
    layout: "stats",
    title: "Our Core Philosophy: The Dual Project",
    subtitle: "The Dual Economic and Social Project",
    content: "Formulated by former CEO Antoine Riboud, Danone operates on the conviction that corporate business success and social/environmental progress are inextricably linked.",
    icon: Heart,
    media: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop",
    details: ["The Economic Pillar: Delivering sustainable growth, securing market leadership, maintaining robust supply chains.","The Social Pillar: Improving public health, empowering local communities, championing employee welfare, preserving environment."]
  },
  {
    theme: "blue",
    layout: "split-right",
    title: "Mission Statement",
    subtitle: "\"Bringing Health Through Food to as Many People as Possible\"",
    content: "Core Business Mission focusing on nutritional superiority, universal accessibility, and an innovation pipeline.",
    icon: Target,
    media: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1920&auto=format&fit=crop",
    details: ["Nutritional Superiority: Focus on R&D to ensure every product offers tangible health benefits.","Universal Accessibility: Making healthy food accessible across diverse socio-economic tiers.","Innovation Pipeline: Investment in probiotic research, functional foods, and fortification."]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Vision Alignment: One Planet. One Health.",
    subtitle: "Global Vision",
    content: "A corporate call to action recognizing that human health and the health of our environment are deeply interdependent.",
    icon: Leaf,
    media: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920&auto=format&fit=crop",
    details: ["Interconnected Ecosystems: You cannot have healthy people on a sick planet.","Dietary Transformation: Promotes a shift towards healthier, sustainable eating habits.","Operational Integration: Vision acts as primary filter for all corporate decisions."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Manufacturing Excellence: The Obour Facility",
    subtitle: "Operational Footprint",
    content: "Situated in Obour City, a major industrial hub facilitating efficient nationwide distribution.",
    icon: Factory,
    media: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1920&auto=format&fit=crop",
    details: ["Advanced Infrastructure: 9 state-of-the-art production lines scaling rapidly to demand.","Stringent Quality Assurance: Holds FSSC 22000 and ISO certifications.","Resource Optimization: Engineered for sustainability, wastewater treatment, and energy efficiency."]
  },
  {
    theme: "blue",
    layout: "split-left",
    title: "Securing the Source: The Nubariya Dairy Farm",
    subtitle: "Operational Footprint",
    content: "By controlling the primary raw material source, Danone Egypt buffers itself against market shortages.",
    icon: CloudRain,
    media: "https://smartmedia.digital4danone.com//is/image/danonecs/D-136?wid=480&fmt=png-alpha&fit=wrap",
    details: ["Scale & Capacity: 2nd largest private dairy farm in Egypt.","Herd Management: Over 6,000 high-yielding Holstein cows for predictable supply.","Precision Agriculture: Data-driven farming, automated milking, advanced veterinary monitoring."]
  },
  {
    theme: "green",
    layout: "split-right",
    title: "Setting the Benchmark: B-Corp Certification",
    subtitle: "Sustainability & Corporate Leadership",
    content: "Danone Egypt is exceptionally proud to be a certified B-Corporation, balancing profit and purpose.",
    icon: Award,
    media: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop",
    details: ["Elite Recognition: Joining a global movement of companies using business as a force for good.","Rigorous Standards: Passing comprehensive audits verifying social/environmental performance.","Industry Pioneer: First FMCG company of its scale in Egypt to achieve this."]
  },
  {
    theme: "red",
    layout: "hero",
    title: "Macro-Environmental Market Context",
    subtitle: "The Egyptian Dairy Market Context",
    content: "Operating in a market with over 110 million people, featuring a youth-heavy demographic.",
    icon: Activity,
    media: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1920&auto=format&fit=crop",
    details: ["Demographic Dividend: Youth-heavy driving high-volume demand for staple foods.","Evolving Consumer Behavior: Shifts accelerating awareness regarding preventative health.","Economic Realities: Highly price-sensitive market requiring agile pricing strategies."]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Core Internal Competencies & Strengths",
    subtitle: "SWOT Analysis - STRENGTHS (Internal)",
    content: "Distinct advantages that anchor its market leadership position.",
    stats: [{"label":"Equity","value":"High"},{"label":"Supply Chain","value":"Integrated"},{"label":"R&D","value":"Access"}],
    icon: CheckCircle,
    media: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop",
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
    media: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1920&auto=format&fit=crop",
    details: ["Heavy Logistics Overhead: Maintaining cold chain is capital-intensive.","Third-Party Reliance: Limited total control over the 'last mile' distribution.","FX Exposure: Vulnerability due to importing specific raw materials and machinery.","Premium Perception: Barrier for penetration into ultra-low-income segments."]
  },
  {
    theme: "green",
    layout: "stats",
    title: "External Avenues for Strategic Growth",
    subtitle: "SWOT Analysis - OPPORTUNITIES (External)",
    content: "External factors and market dynamics offering avenues for significant expansion.",
    icon: TrendingUp,
    media: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    details: ["Category Expansion: Rising interest introduces premium lines and specialized protein products.","Geographic Penetration: Massive untapped potential in rural governorates and Upper Egypt.","Consumption Occasions: Shifting to 'on-the-go' healthy snacking.","Digital Commerce: Rapid growth of grocery delivery apps offers new distribution channels."]
  },
  {
    theme: "red",
    layout: "split-right",
    title: "External Risks and Market Threats",
    subtitle: "SWOT Analysis - THREATS (External)",
    content: "Macro and competitive risks that pose a danger to sustained profitability.",
    icon: ShieldAlert,
    media: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1920&auto=format&fit=crop",
    details: ["Fierce Local Competition: Rivalry from entrenched local giants dominating traditional trade.","Macroeconomic Volatility: Sustained inflation eroding consumer disposable income.","Supply Chain Shocks: Global logistical disruptions affecting critical imports.","Fleet Maintenance Risks: FX shortages threaten regular service of refrigerated fleets."]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "Strategic Market Positioning",
    subtitle: "Competitive Landscape & Positioning",
    content: "Danone deliberately positions itself not merely as a traditional 'dairy processor,' but as an advanced 'health and nutrition' company.",
    icon: Crosshair,
    media: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1920&auto=format&fit=crop",
    details: ["The Differentiator: Advanced health and nutrition positioning.","Value over Volume: Emphasizing functional benefits (e.g., probiotics) over price wars.","Trust & Safety: Leveraging B-Corp status and stringent quality controls as the safest choice."]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Commercial & Financial Objectives (2026-2028)",
    subtitle: "Market Objectives: Commercial Growth",
    content: "Focused targets for market share, distribution, and revenue diversification.",
    icon: TrendingUp,
    media: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1920&auto=format&fit=crop",
    details: ["Market Share Capture: Target 3.5% increase in spoonable yogurt category over 24 months.","Distribution Expansion: Broaden retail footprint from 100k to 125k POS.","Revenue Diversification: Double-digit YoY volume growth in Specialized Nutrition.","Profitability Margin: Maintain EBITDA margins through strict cost-optimization."]
  },
  {
    theme: "green",
    layout: "split-right",
    title: "Product Development & Health Objectives",
    subtitle: "Market Objectives: Innovation & Public Health",
    content: "Commitments toward nutritional improvement, localized innovation, and community health.",
    icon: Beaker,
    media: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1920&auto=format&fit=crop",
    details: ["Nutritional Improvement: Re-formulating to achieve 15% reduction in added sugars by Q4 2027.","Localized Innovation: Minimum two new functional innovations tailored to Egyptian palate annually.","Community Education: Educate 1.5M mothers on first 1,000 days of early childhood nutrition."]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "Environmental, Social, and Governance (ESG) Targets",
    subtitle: "Market Objectives: ESG & Sustainability",
    content: "Specific goals for sustainability and circular economy commitments.",
    icon: Leaf,
    media: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop",
    details: ["Circular Economy Packaging: 100% recyclable, reusable, or compostable packaging by 2030.","Decarbonization: Reduce Obour factory's Scope 1 and Scope 2 carbon footprint by 20%.","Waste Management: Achieve 'Zero Food Waste to Landfill' from all primary sites."]
  },
  {
    theme: "blue",
    layout: "stats",
    title: "Integrated Marketing Mix Strategy",
    subtitle: "The Marketing Plan Overview (The 4Ps)",
    content: "A cohesive, interconnected strategy designed to maximize market penetration while protecting brand equity.",
    icon: PieChart,
    media: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop",
    details: ["Product: Delivering scientifically backed, tailored nutritional solutions.","Price: Dual strategy focusing on premium health-value margins and broad accessibility.","Place: Omnichannel network overcoming logistical challenges.","Promotion: Educational, digitally-led communication to build loyalty."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Product Strategy: Essential Dairy Line",
    subtitle: "Marketing Mix - PRODUCT (Core Portfolio)",
    content: "Focusing on household staples, flagship probiotics, and indulgence categories.",
    icon: Box,
    media: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1920&auto=format&fit=crop",
    details: ["Danone Plain Yogurt: Foundational household staple for consumption and culinary use.","Activia: Flagship, high-margin probiotic brand targeting digestive wellness and gut health.","Danette: Premium dairy desserts offering a superior, creamy alternative.","DanUp & Mix: Drinkable yogurts for on-the-go energy and satiety."]
  },
  {
    theme: "green",
    layout: "split-left",
    title: "Product Strategy: Specialized & Accessible Nutrition",
    subtitle: "Marketing Mix - PRODUCT (Targeted Nutrition)",
    content: "Tailored nutritional approaches for specific life stages and demographic groups.",
    icon: PlusCircle,
    media: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1920&auto=format&fit=crop",
    details: ["Specialized Nutrition: Premium infant formulas (Bebelac & Aptamil) marketed ethically.","Dango Line: Fortified, affordable snacks combatting nutritional deficiencies like anemia.","Plant-Based Exploration: Introducing Alpro for lactose-intolerant and vegan demographics."]
  },
  {
    theme: "blue",
    layout: "split-right",
    title: "Pricing Strategy: Value vs. Volume",
    subtitle: "Marketing Mix - PRICE (Value & Margin Strategy)",
    content: "Balancing premium positioning with competitive mass market realities.",
    icon: Coins,
    media: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1920&auto=format&fit=crop",
    details: ["Value-Based Pricing: Applied strictly to functional/specialized brands mapping to clinical benefits.","Competitive Parity Pricing: Applied to plain yogurt lines to prevent market share erosion.","Dynamic Architecture: Advanced revenue growth management to manage promotional discounts."]
  },
  {
    theme: "light",
    layout: "split-left",
    title: "Pricing Strategy: Reaching the Base of the Pyramid",
    subtitle: "Marketing Mix - PRICE (Accessibility Strategy)",
    content: "Tactics designed to ensure availability despite economic constraints.",
    icon: Users,
    media: "https://plus.unsplash.com/premium_vector-1725977253066-c4551247bc49?q=80&w=1920&auto=format&fit=crop",
    details: ["Combating 'Shrinkflation': Designing smaller SKUs hitting psychological coin-price points.","Nutritional Accessibility: Low margins on 'Dango' ensuring protein/vitamins remain viable.","Bulk Formats for HORECA: Cost-effective formats tailored to secure steady B2B revenue."]
  },
  {
    theme: "red",
    layout: "split-right",
    title: "Distribution Infrastructure & Overcoming Hurdles",
    subtitle: "Marketing Mix - PLACE (Distribution & Logistics Strategy)",
    content: "Operating in a vast, hot geography demanding meticulous logistical planning.",
    icon: Truck,
    media: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?q=80&w=1920&auto=format&fit=crop",
    details: ["The Logistics Challenge: Maintaining strict 2°C-6°C cold chain across Egypt's geography.","Network Structure: 31 primary Distribution Centers across the republic.","Strategic Mitigation: Advanced routing software and specialized maintenance protocols.","Innovation (Al-Omda Project): Empowering rural women with specialized cooling tricycles."]
  },
  {
    theme: "blue",
    layout: "split-left",
    title: "Logistical Battleground: Danone vs. Juhayna",
    subtitle: "Marketing Mix - PLACE (Fleet & Logistics Competitor Comparison)",
    content: "Contrasting supply-chain strategies against formidable entrenched rivals.",
    icon: Briefcase,
    media: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1920&auto=format&fit=crop",
    details: ["Fleet Ownership Model: Hybrid model heavily reliant on 3rd-party vs. wholly-owned.","The Control Advantage: Absolute control over traditional grocers creates an entry barrier.","Product Shelf-Life Factor: Fresh dairy requiring cold-chain vs. long-life UHT ambient distribution."]
  },
  {
    theme: "green",
    layout: "stats",
    title: "Promotional Strategy: Digital-First & Educational",
    subtitle: "Marketing Mix - PROMOTION (Communication & Engagement)",
    content: "A multi-channel promotional approach blending digital reach with targeted physical activations.",
    icon: Heart,
    media: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1920&auto=format&fit=crop",
    details: ["Digital Transformation: Targeting social media (TikTok, Meta, YouTube) for Gen Z and millennial moms.","Influencer Ecosystem: Building Key Opinion Leaders—nutritionists, pediatricians, lifestyle.","Experiential Marketing: Visibility in BTL activations with extensive in-store sampling.","Data-Driven CRM: Building direct relationships through loyalty programs and parenting apps."]
  },
  {
    theme: "light",
    layout: "split-right",
    title: "Promotional Strategy: Integrating CSR and Brand Value",
    subtitle: "Marketing Mix - PROMOTION (Purpose-Driven CSR)",
    content: "Integrating social responsibility deeply into corporate brand identity.",
    icon: Handshake,
    media: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop",
    details: ["Egyptian Food Bank Alliance: Product donations and campaigns to eradicate hunger/waste.","Health Awareness Caravans: Mobile clinics offering free nutritional assessments to communities.","Academic Partnerships: Sponsoring research on Egyptian dietary habits to reinforce authority."]
  },
  {
    theme: "blue",
    layout: "hero",
    title: "Executive 3-Year Implementation Roadmap",
    subtitle: "Strategic Roadmap (3-Year Implementation Plan)",
    content: "A phased execution plan transforming strategy into tangible outcomes.",
    icon: MapPin,
    media: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop",
    details: ["Year 1 (Foundation): Overhaul fleet strategy, launch reduced-sugar portfolio, scale Al-Omda.","Year 2 (Digital & Green): Quick-commerce push, plant-based pilot, biodegradable packaging.","Year 3 (Dominance & ESG): 20% carbon reduction, #1 in functional/medical, 100% circular packaging."]
  },
  {
    theme: "green",
    layout: "stats",
    title: "Conclusion: A Sustainable Future",
    subtitle: "Conclusion & Next Steps",
    content: "Final summarizing thoughts on market dominance, strategic vision, and action planning.",
    icon: CheckCircle,
    media: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    details: ["Summary: Danone Egypt is uniquely positioned to dominate the intersection of health, dairy, and sustainability.","Commitment: Fiercely committed to the Dual Project driving profitable growth and public health.","Strategic Imperative: Executing 4Ps with precision, maintaining logistical agility, educating consumers.","Next Steps: Thank You. Q&A Session. Contact Information: www.danone.eg"]
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

const getBlobClass = (id: number) => {
  const classes = ["cow-shape-1", "cow-shape-2", "cow-shape-3", "milk-shape"];
  return classes[id % classes.length];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const imgVariants = {
  hidden: { scale: 0.9, opacity: 0, rotate: -3 },
  visible: { 
    scale: 1, opacity: 1, rotate: 0,
    transition: { type: "spring", stiffness: 60, damping: 20 }
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
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden p-6 md:p-12",
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
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <span className={cn("inline-flex items-center justify-center w-12 h-12 rounded-xl border", theme.iconContainer)}>
                <page.icon size={24} />
              </span>
              <span className={cn("text-sm font-bold tracking-widest uppercase opacity-70", theme.textPrimary)}>
                Insight {page.id}
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-4xl md:text-6xl font-black mb-4 font-heading", theme.textPrimary)}>{page.title}</motion.h2>
            <motion.h3 variants={itemVariants} className={cn("text-2xl font-light mb-8", theme.textSecondary)}>{page.subtitle}</motion.h3>
            
            <motion.p variants={itemVariants} className={cn("text-lg leading-relaxed mb-6", theme.textPrimary)}>{page.content}</motion.p>
            {page.details && (
              <ul className="space-y-4">
                {page.details.map((detail, idx) => (
                  <motion.li 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.1)" }}
                    className={cn("flex items-start gap-4 p-4 rounded-2xl bg-black/5 backdrop-blur-sm border border-black/5 cursor-pointer", theme.textSecondary)}
                  >
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={20} />
                    <span className="text-base font-medium opacity-90">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <motion.div
            variants={imgVariants}
            className={cn("relative aspect-square md:aspect-video lg:aspect-square overflow-hidden shadow-2xl order-1 lg:order-2 border-8 border-white/40", getBlobClass(page.id))}
          >
            <MediaLayer src={page.media} alt={page.title} asBlob />
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
            <MediaLayer src={page.media} alt={page.title} asBlob />
          </motion.div>
          <div className="flex flex-col items-start text-left">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <span className={cn("inline-flex items-center justify-center w-12 h-12 rounded-xl border", theme.iconContainer)}>
                <page.icon size={24} />
              </span>
              <span className={cn("text-sm font-bold tracking-widest uppercase opacity-70", theme.textPrimary)}>
                Insight {page.id}
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className={cn("text-4xl md:text-6xl font-black mb-4 font-heading", theme.textPrimary)}>{page.title}</motion.h2>
            <motion.h3 variants={itemVariants} className={cn("text-2xl font-light mb-8", theme.textSecondary)}>{page.subtitle}</motion.h3>
            
            <motion.p variants={itemVariants} className={cn("text-lg leading-relaxed mb-6", theme.textPrimary)}>{page.content}</motion.p>
            {page.details && (
              <ul className="space-y-4">
                {page.details.map((detail, idx) => (
                  <motion.li 
                    variants={itemVariants} 
                    key={idx} 
                    whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 12px 24px rgba(0,0,0,0.1)" }}
                    className={cn("flex items-start gap-4 p-4 rounded-2xl bg-black/5 backdrop-blur-sm border border-black/5 cursor-pointer", theme.textSecondary)}
                  >
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={20} />
                    <span className="text-base font-medium opacity-90">{detail}</span>
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

  return (
    <div className="h-screen w-full overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory bg-black">
      
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
          <div key={page.id} data-id={page.id} className="page-snap-section snap-start snap-always w-full h-screen">
             <PageSection page={page} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
