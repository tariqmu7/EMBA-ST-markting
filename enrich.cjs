const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const detailMap = {
  1: ["Unparalleled global R&D infrastructure scaling solutions.", "Vertical integration via Nubariya farm to the Obour plant.", "Commanding mass market volumes across all consumer segments.", "Continuous expansion despite local economic fluctuations."],
  2: ["Adoption of sustainable agricultural and manufacturing practices.", "Promoting health through specialized product formulations.", "Reducing environmental footprint across the supply chain.", "Integrating local communities into global value chains."],
  3: ["Rigorous adherence to social and environmental performance standards.", "Aligning profit metrics with social and ecological purpose.", "Driving global movement towards sustainable business models.", "Continuous independent verification and annual audits."],
  4: ["Volume-driven growth from essential dairy products.", "High-margin returns from specialized nutrition segment.", "Stable cash flows from the waters and hydration divisions.", "Strategic agility across multiple product life cycles."],
  5: ["Dominating local household penetration with trusted brands.", "Maintaining quality through uninterrupted cold chain logistics.", "Adapting product sizes to protect volume during inflation.", "Investing heavily in localized rural distribution networks."],
  6: ["Targeting dietary interventions and cognitive development therapies.", "Addressing adult medical nutrition and immunity-boosting needs.", "Insulating the product portfolio from generic commoditization.", "Leveraging extensive R&D to maintain scientific supremacy."],
  7: ["EGP 2 Billion Capital Deployment centered on Obour City and Nubariya.", "Positioning Egypt as a highly efficient African export hub.", "Automating manufacturing processes for unparalleled scale.", "Implementing advanced quality control systems region-wide."],
  8: ["In-house production capabilities reaching 120,000 tonnes annually.", "State-of-the-art facilities prioritizing energy efficiency.", "Integration of solar energy and localized electro-fitted fleets.", "Reducing reliance on imported finished products."],
  9: ["Ensuring a highly resilient, hyper-localized supply of premium milk.", "Implementing world-class livestock management and welfare standards.", "Collaborating with local agriculture initiatives like 'Kheir Ardena'.", "Securing the first link in a flawlessly integrated value chain."],
  10: ["Navigating the deeply complex MENA ecosystem effectively.", "Constant recalibration of supply chain and distribution logistics.", "Agility in response to shifting consumer purchasing power.", "Strategic foresight to anticipate and mitigate external shocks."],
  11: ["Combating rising costs of imported specialized ingredients.", "Adapting to severe currency devaluation and down-trading risks.", "Introducing tactical discount coupons to protect market share.", "Optimizing formulations to maintain accessible price points."],
  12: ["Flawless and uninterrupted cold chains are completely non-negotiable.", "Mitigating risks associated with regional energy grid disruptions.", "Empowering OMDA micro-distributors with refrigerated truck fleets.", "Preserving product viability and deeply entrenched brand trust."],
  13: ["Battling entrenched, vertically integrated local and regional giants.", "Defending volumes against aggressive domestic oligopolistic pricing.", "Driving continuous, high-cost investments in omnichannel marketing.", "Leveraging scientific claims to justify premium positioning."],
  14: ["Targeting consistent like-for-like net sales growth of +3% to +5%.", "Pursuing structurally double-digit returns on invested capital.", "Aligning regional operations with the global 'Renew Danone' framework.", "Accelerating plant-based alternative segment growth exponentially."],
  15: ["Aggressively pursuing a 90% local sourcing target by the year 2026.", "Decoupling the primary supply chain from global currency markets.", "Fostering deep local agricultural collaborations and partnerships.", "Rewiring operational vulnerabilities in an emerging market."],
  16: ["Pledging to cut virgin plastics usage by a staggering 50%.", "Transitioning 70% of global packaging to fully recyclable materials.", "Executing brilliant carbon footprint reduction strategies with partners.", "Leading the regional transition toward a circular economy."],
  17: ["Unparalleled global R&D infrastructure and microbiome patents.", "Flawless vertical integration via Nubariya farm and Obour plant.", "Vast OMDA micro-distribution rural networks securing volume.", "Global B-Corp certification status enhancing brand prestige."],
  18: ["Significant vulnerability to premium pricing paradigms during inflation.", "Severe elasticity leading to rapid volume drops if consumers down-trade.", "Total operational reliance on highly sensitive cold-chain logistics.", "High fixed costs necessitating constant production scale optimizations."],
  19: ["Post-pandemic surge in gut-health and functional nutrition awareness.", "Exploiting the massive EGP 2 billion infrastructure as an export hub.", "Accelerating the rapidly growing plant-based alternative segment.", "Expanding presence in specialized and medical adult nutrition."],
  20: ["Entrenched dominance of domestic oligopolies maintaining volume control.", "Structural fluctuations in global commodity and energy prices.", "Unpredictable regional geopolitical shocks disrupting major trade routes.", "Aggressive entry of new regional players armed with deep capital."],
  21: ["A fiercely contested FMCG ecosystem dominated by domestic giants.", "Intense competition in premium and scientifically functional sectors.", "Continuous battle for vital supermarket and traditional retail shelf space.", "Necessitates extreme marketing agility and deep consumer insights."],
  22: ["Juhayna commands up to 70% of the traditional Egyptian dairy sector.", "Leveraging decades of generational loyalty and deep rural penetration.", "Massive economies of scale allowing aggressive pricing strategies.", "An undisputed volume leader requiring tactical differentiation to combat."],
  23: ["Almarai brings deep Saudi capital and aggressive regional marketing.", "Domty dominates the specialized cheese sector to create leverage.", "Formidable competitors requiring constant innovation to outmaneuver.", "Intensifying the battle for market share and consumer mindshare."],
  24: ["Products are heavily engineered as functional health enablers.", "Activia dominates local gut health via specific Bifidobacterium strains.", "Scientifically insulating the brand from generic commoditization.", "Driving premium value through medically verified nutritional claims."],
  25: ["Combating childhood iron deficiency with fortified Dango & Danone Max.", "Targeting the urban fitness boom with high-protein HiPRO & Oikos.", "Meeting specific nutritional needs through tailored product development.", "Balancing indulgence with strict sugar reduction commitments."],
  26: ["Defending premium positioning through scientifically verified health claims.", "Fighting sudden down-trading via smaller adaptive product sizes.", "Deploying highly tactical discount coupons to protect market volume.", "Maintaining value-based agility in severely inflationary environments."],
  27: ["Empowering young rural entrepreneurs with specialized refrigerated trucks.", "A 380-strong distributor fleet reaching 50,000 localized retailers.", "Accessing 15 million consumers in deeply hard-to-access geographies.", "Establishing true omnichannel supremacy across the Egyptian market."],
  28: ["Integrating 8,000 smallholder farmers into the formal supply chain.", "Prioritizing women, who represent 90% of the participating farmers.", "Executing brilliant, eco-friendly co-distribution with Bel Egypt.", "Optimizing regional logistics and profoundly reducing carbon footprints."],
  29: ["Bypassing traditional passive advertising for deep emotional connection.", "Heavy reliance on grassroots initiatives and intense physical activations.", "Executing highly-engagement digital community and brand management.", "Embedding the brand deeply into the local cultural and social fabric."],
  30: ["Official sponsor of the fiercely supported Egyptian National Football Team.", "Official partner of the massive CAF AFCON continental tournaments.", "Executing physical activations like the intense 'Danone Fan Zone'.", "Tying the corporate brand permanently to immense national pride."]
};

const newCode = code.replace(/const pagesData = \[([\s\S]*?)\];/, (match) => {
  let modifiedMatch = match;
  for (const [id, details] of Object.entries(detailMap)) {
    const regex = new RegExp(`(id:\\s*${id},[\\s\\S]*?media:\\s*".*?")`);
    modifiedMatch = modifiedMatch.replace(regex, `$1,\n    details: ${JSON.stringify(details)}`);
  }
  return modifiedMatch;
});

// Now replace the PageSection to consume page.details
const renderAdditionHero = `
              <p className={cn("text-lg font-medium max-w-2xl mx-auto", theme.textPrimary)}>
                {page.content}
              </p>
              {page.details && (
                <ul className="mt-8 text-left max-w-2xl mx-auto space-y-3">
                  {page.details.map((detail, idx) => (
                    <li key={idx} className={cn("flex items-start gap-3", theme.textSecondary)}>
                      <CheckCircle className="shrink-0 mt-1 opacity-70" size={18} />
                      <span className="text-base font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
`;

const renderAdditionSplitRight = `
            <p className={cn("text-lg leading-relaxed mb-6", theme.textPrimary)}>{page.content}</p>
            {page.details && (
              <ul className="space-y-4">
                {page.details.map((detail, idx) => (
                  <li key={idx} className={cn("flex items-start gap-4 p-4 rounded-2xl bg-black/5 backdrop-blur-sm border border-black/5", theme.textSecondary)}>
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={20} />
                    <span className="text-base font-medium opacity-90">{detail}</span>
                  </li>
                ))}
              </ul>
            )}
`;

const renderAdditionSplitLeft = `
            <p className={cn("text-lg leading-relaxed mb-6", theme.textPrimary)}>{page.content}</p>
            {page.details && (
              <ul className="space-y-4">
                {page.details.map((detail, idx) => (
                  <li key={idx} className={cn("flex items-start gap-4 p-4 rounded-2xl bg-black/5 backdrop-blur-sm border border-black/5", theme.textSecondary)}>
                    <CheckCircle className="shrink-0 mt-0.5 opacity-60" size={20} />
                    <span className="text-base font-medium opacity-90">{detail}</span>
                  </li>
                ))}
              </ul>
            )}
`;

const renderAdditionStats = `
            <h3 className={cn("text-2xl font-light", theme.textSecondary)}>{page.subtitle}</h3>
            <p className={cn("mt-4 text-lg font-medium", theme.textPrimary)}>{page.content}</p>
            {page.details && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                {page.details.map((detail, idx) => (
                  <div key={idx} className={cn("flex items-start gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10", theme.textPrimary)}>
                    <CheckCircle size={18} className="shrink-0 mt-0.5 opacity-70" />
                    <span className="text-sm font-medium">{detail}</span>
                  </div>
                ))}
              </div>
            )}
`;

let replacedCode = newCode
  .replace(/<p className=\{cn\("text-lg font-medium max-w-2xl mx-auto", theme\.textPrimary\)\}>\s*\{page\.content\}\s*<\/p>/, renderAdditionHero)
  .replace(/<p className=\{cn\("text-lg leading-relaxed", theme\.textPrimary\)\}>\s*\{page\.content\}\s*<\/p>/, renderAdditionSplitRight)
  .replace(/<p className=\{cn\("text-lg leading-relaxed", theme\.textPrimary\)\}>\s*\{page\.content\}\s*<\/p>/, renderAdditionSplitLeft)
  .replace(/<h3 className=\{cn\("text-2xl font-light", theme\.textSecondary\)\}>\{page\.subtitle\}<\/h3>/, renderAdditionStats);

fs.writeFileSync('src/App.tsx', replacedCode);
