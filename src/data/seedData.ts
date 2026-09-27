import { Article, Category, Project, SiteSettings, Tag } from '../types';

export const HERO_OCEAN_IMAGE = '/src/assets/images/hero_ocean_resin_1790528486021.jpg';
export const RESIN_WORKSHOP_IMAGE = '/src/assets/images/resin_workshop_beginner_1790528506485.jpg';
export const RESIN_GEODE_IMAGE = '/src/assets/images/resin_geode_tray_1790528520522.jpg';
export const RESIN_SAFETY_IMAGE = '/src/assets/images/resin_craft_safety_1790528534838.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-beginners',
    name: 'Beginner Guides',
    slug: 'beginners',
    description: 'Foundational tutorials, resin chemistry basics, workspace readiness, and first-pour guides.',
    image_url: RESIN_WORKSHOP_IMAGE,
    seo_title: 'Resin Art for Beginners — Foundational Guides & Tutorials',
    seo_description: 'Master the fundamentals of epoxy resin art: ratios, mixing, workspace prep, and beginner projects.'
  },
  {
    id: 'cat-techniques',
    name: 'Techniques',
    slug: 'techniques',
    description: 'Master advanced pouring styles including ocean lacing cells, geode layering, dirty pours, and marble veins.',
    image_url: HERO_OCEAN_IMAGE,
    seo_title: 'Resin Art Techniques — Ocean Waves, Geodes & Pouring Styles',
    seo_description: 'Discover step-by-step techniques to create cell lacing, geode crystals, dirty pours, and layered resin depths.'
  },
  {
    id: 'cat-projects',
    name: 'Projects',
    slug: 'projects',
    description: 'Step-by-step creative projects for coasters, serving trays, fine wall art, bookmarks, and jewelry.',
    image_url: RESIN_GEODE_IMAGE,
    seo_title: 'Resin Art Projects — Coasters, Trays, Jewelry & Home Decor',
    seo_description: 'Complete hands-on resin project tutorials with material lists, dimensions, and curing schedules.'
  },
  {
    id: 'cat-supplies',
    name: 'Supplies & Tools',
    slug: 'supplies',
    description: 'Deep dives into epoxy grades, mica pigments, silicone molds, heat torches, and studio equipment.',
    image_url: RESIN_WORKSHOP_IMAGE,
    seo_title: 'Resin Art Supplies & Equipment — Resins, Molds, Pigments & Tools',
    seo_description: 'Unbiased equipment guides: selecting casting vs coating resins, mica powders, torches, and silicone beakers.'
  },
  {
    id: 'cat-safety',
    name: 'Safety & Science',
    slug: 'safety',
    description: 'Essential respiratory defense, nitrile glove chemistry, exothermic mitigation, and safe curing habits.',
    image_url: RESIN_SAFETY_IMAGE,
    seo_title: 'Resin Art Studio Safety — Respirators, Nitrile Gloves & Ventilation',
    seo_description: 'Scientific and practical safety protocols: organic vapor filtration, ventilation requirements, and skin defense.'
  },
  {
    id: 'cat-troubleshooting',
    name: 'Troubleshooting',
    slug: 'troubleshooting',
    description: 'Practical solutions for sticky surfaces, trapped micro-bubbles, amine blush, cracks, and yellowing.',
    image_url: RESIN_SAFETY_IMAGE,
    seo_title: 'Resin Art Troubleshooting — Sticky Resin, Bubbles & Curing Fixes',
    seo_description: 'Diagnose and fix sticky uncured resin, surface dimples, cloudy casts, and heat cracks.'
  }
];

export const INITIAL_TAGS: Tag[] = [
  { id: 'tag-ocean', name: 'Ocean Waves', slug: 'ocean-waves' },
  { id: 'tag-geode', name: 'Geodes', slug: 'geodes' },
  { id: 'tag-coasters', name: 'Coasters', slug: 'coasters' },
  { id: 'tag-safety', name: 'Studio Safety', slug: 'studio-safety' },
  { id: 'tag-curing', name: 'Curing & Chemistry', slug: 'curing-chemistry' },
  { id: 'tag-pigments', name: 'Mica & Inks', slug: 'mica-inks' },
  { id: 'tag-beginner', name: 'Beginner Fundamentals', slug: 'beginner-fundamentals' }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-what-is-resin-art',
    category_id: 'cat-beginners',
    category: INITIAL_CATEGORIES[0],
    title: 'What Is Resin Art? The Complete Creative & Chemical Guide',
    slug: 'what-is-resin-art',
    excerpt: 'An introduction to the medium of epoxy and casting resin, how the chemical cross-linking reaction works, and why artists worldwide embrace its glass-like luminescence.',
    content: `
      <h2>The Medium That Transformed Modern Craft</h2>
      <p>Resin art is a contemporary artistic medium centered around liquid thermosetting polymers—primarily two-part epoxy resin—which transform into crystal-clear, durable solid surfaces through an exothermic chemical cure. Unlike traditional paints that dry through solvent evaporation, epoxy cures via stoichiometric cross-linking between a resin monomer (often Bisphenol-A) and an amine-based hardener.</p>
      
      <p>When poured over cradled wood panels, cast into silicone molds, or layered onto canvas, resin yields an optical depth unmatched by varnish or acrylic. Pigments float in suspension at multiple elevations, refracting light and creating three-dimensional spatial effects reminiscent of oceanic depth and gemstone crystallization.</p>

      <h2>The Two Essential Components: Resin and Hardener</h2>
      <p>Every epoxy system consists of Part A (the resin monomer) and Part B (the polyamine curing agent). Neither component will harden independently. When thoroughly combined at the manufacturer’s specified ratio (commonly 1:1 by volume or 2:1 by weight), reactive epoxide rings bond to active amine hydrogens, constructing a rigid polymer lattice.</p>

      <blockquote>
        "Working with epoxy is an intentional partnership with fluid dynamics and thermal chemistry. You do not simply paint with resin; you choreograph its flow during its brief open window."
      </blockquote>

      <h2>Common Forms of Resin in Contemporary Art</h2>
      <ul>
        <li><strong>Coating & Surface Epoxy:</strong> High viscosity (3,000–5,000 cps), formulated for self-leveling pours up to 1/8 inch thick. Excellent for canvas flood coats and trays.</li>
        <li><strong>Deep Pour & Casting Resin:</strong> Ultra-low viscosity (300–800 cps), slow exothermic curve, allowing massive single pours from 2 to 4 inches deep without overheating or boiling.</li>
        <li><strong>UV Resin:</strong> Single-part pre-catalyzed acrylate resin that cures within 2 minutes under 365–405nm ultraviolet light. Popular for small jewelry bezels and adhesive tacks.</li>
      </ul>

      <h2>Why Artists Choose Epoxy Resin</h2>
      <p>Artists choose resin because of its tactile durability, UV clarity, and refractive index (~1.53), which mimics natural quartz. Furthermore, resin can encapsulate botanical specimens, mineral shards, gold leaf, and metallic pigments without deteriorating or clouding the encapsulated elements when cured under correct studio conditions.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    author_name: 'ResinArt Editorial Team',
    status: 'published',
    featured: true,
    reading_time: '6 min read',
    seo_title: 'What Is Resin Art? Chemistry, Materials, and Modern Techniques',
    seo_description: 'Learn what resin art is, how two-part epoxy works, different types of casting resin, and why modern artists love this fluid medium.',
    published_at: '2026-03-15T08:00:00Z',
    created_at: '2026-03-15T08:00:00Z'
  },
  {
    id: 'art-resin-art-for-beginners',
    category_id: 'cat-beginners',
    category: INITIAL_CATEGORIES[0],
    title: 'Resin Art for Beginners: The Definitive Step-by-Step Starting Blueprint',
    slug: 'resin-art-for-beginners-guide',
    excerpt: 'Everything you need to successfully execute your first flawless pour: essential tools, temperature control, measuring protocols, and safety hygiene.',
    content: `
      <h2>Setting the Stage for Success</h2>
      <p>Embarking on your first resin project can feel intimidating, but adhering to laboratory-like precision in measuring and temperature control guarantees professional results. In resin art, 90% of failures stem from improper ratios or moisture contamination.</p>

      <h2>Essential Workspace Setup</h2>
      <p>Before unsealing your bottles, your studio must satisfy four environmental criteria:</p>
      <ol>
        <li><strong>Temperature:</strong> Maintain 72°F–78°F (22°C–25°C). Cooler rooms increase viscosity and trap bubbles; warmer rooms shorten open working time.</li>
        <li><strong>Relative Humidity:</strong> Keep below 50%. High moisture causes surface amine blush (a greasy, dull film).</li>
        <li><strong>Level Work Surface:</strong> Use a spirit bubble level across two perpendicular axes on your workbench. Resin is self-leveling and will pool off slanted surfaces.</li>
        <li><strong>Dust Protection:</strong> Have clean inverted cardboard boxes or plastic tubs ready to cover wet pieces throughout the initial 24-hour cure.</li>
      </ol>

      <h2>The Exact 6-Step Beginner Pour Protocol</h2>
      <h3>Step 1: Calculate Your Required Volume</h3>
      <p>Multiply surface length by width by desired depth in inches, then divide by 1.8 to determine fluid ounces needed. Always mix 10% extra to allow for cup cling.</p>

      <h3>Step 2: Gravimetric or Volumetric Measuring</h3>
      <p>Check your epoxy's label. If it specifies 1:1 by volume, use calibrated silicone graduated cups with eye-level meniscus readings. Never eyeball ratios.</p>

      <h3>Step 3: The 3-Minute Dual-Cup Stirring Rule</h3>
      <p>Stir continuously for a full 3 minutes, scraping sides and bottom with a flat silicone spatula. For absolute consistency, transfer the mixture into a second clean cup and stir for another 60 seconds.</p>

      <h3>Step 4: Incorporating Colorants</h3>
      <p>Divide resin into small cups. Add dry mica powder or liquid resin tint. Never exceed 6% colorant by volume, as excess pigment disrupts the stoichiometric balance.</p>

      <h3>Step 5: The Pour and Manipulation</h3>
      <p>Pour onto your sealed substrate. Use a palette knife or silicone spreader to guide resin to the edges. Resin will settle flat naturally.</p>

      <h3>Step 6: Eliminating Surface Air Bubbles</h3>
      <p>Wait 3–5 minutes for micro-bubbles to float to the top. Sweep a butane torch or heat gun 4–6 inches above the surface in swift continuous motions. Never linger in one spot.</p>
    `,
    featured_image: RESIN_WORKSHOP_IMAGE,
    author_name: 'ResinArt Master Craft Team',
    status: 'published',
    featured: true,
    reading_time: '9 min read',
    seo_title: 'Resin Art for Beginners — Complete Step-by-Step Starter Blueprint',
    seo_description: 'Master your very first epoxy pour with this comprehensive beginner roadmap: tools, measuring rules, pouring steps, and bubble prevention.',
    published_at: '2026-03-18T10:00:00Z',
    created_at: '2026-03-18T10:00:00Z'
  },
  {
    id: 'art-ocean-resin-art',
    category_id: 'cat-techniques',
    category: INITIAL_CATEGORIES[1],
    title: 'Ocean Resin Art: How to Create Realistic Waves & White Sea Foam Lacing',
    slug: 'ocean-resin-art-guide',
    excerpt: 'Uncover the master technique for realistic turquoise ocean depths and organic cellular lacing with white wave paste and directional heat gun manipulation.',
    content: `
      <h2>The Anatomy of Coastal Resin Art</h2>
      <p>Ocean resin art remains the most sought-after technique in the fluid art community. Replicating the translucent gradient of shorelines—from golden sand through crystalline aquamarine to midnight ocean depths—demands strict viscosity timing and the correct wave paste chemistry.</p>

      <h2>The Secret Behind Cellular Foam: Titanium Dioxide Wave Paste</h2>
      <p>White mica powder or standard white craft paint will not produce delicate ocean cells. Professional makers use dense white resin pigment paste rich in titanium dioxide. Its higher specific gravity causes it to sink slightly into the lower resin layer, breaking apart into circular lace cells when warm air passes over it.</p>

      <h2>Color Mapping Your Ocean Gradient</h2>
      <ul>
        <li><strong>Shoreline (Zone 1):</strong> Clear resin blended over natural wood grain or real sand.</li>
        <li><strong>Shallow Reef (Zone 2):</strong> Translucent turquoise or seafoam tint with minimal mica shimmer.</li>
        <li><strong>Mid-Tide (Zone 3):</strong> Cerulean and vibrant cobalt blue.</li>
        <li><strong>Deep Ocean (Zone 4):</strong> Opaque deep navy with a touch of phthalo green and black.</li>
      </ul>

      <h2>The Controlled Heat Gun Sweep</h2>
      <p>Fit your heat gun with a focused flat nozzle. Hold the gun at a 45-degree angle approximately 2 inches behind your thin line of white paste. Direct the airflow toward the beach. The heat softens the surface tension while the airflow pulls the white paste over the wet blue resin, instantaneously blooming into microscopic lacing cells.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    author_name: 'ResinArt Studio Collective',
    status: 'published',
    featured: true,
    reading_time: '7 min read',
    seo_title: 'Ocean Resin Art Guide — Realistic Wave Foam & Cell Lacing Secrets',
    seo_description: 'Master ocean resin art: pigment gradient layering, titanium dioxide wave paste, and directional heat gun techniques for real sea foam lacing.',
    published_at: '2026-03-20T11:00:00Z',
    created_at: '2026-03-20T11:00:00Z'
  },
  {
    id: 'art-geode-resin-art',
    category_id: 'cat-techniques',
    category: INITIAL_CATEGORIES[1],
    title: 'Geode Resin Art: Embedding Crystals, Glass & Metallic Mineral Veins',
    slug: 'geode-resin-art-tutorial',
    excerpt: 'Step-by-step masterclass on building three-dimensional quartz geodes using crushed fire glass, raw amethyst crystals, and lustrous metallic mica outlines.',
    content: `
      <h2>Simulating Natural Crystalline Formations</h2>
      <p>Geode resin art mimics the interior cavities of volcanic rocks, layering translucent colored resins with genuine gemstone fragments, crushed glass, and hand-gilded metallic veins. The secret to an authentic geode lies in concentric asymmetry: natural geodes are never perfectly round or evenly spaced.</p>

      <h2>Materials That Define Real Geode Textures</h2>
      <ul>
        <li><strong>Crushed Reflective Fire Glass:</strong> Coarse fragments (1/4 to 1/2 inch) bonded along the interior focal fault line.</li>
        <li><strong>Natural Quartz Points & Amethyst Chips:</strong> Placed at high-elevation clusters to disrupt planar flatness.</li>
        <li><strong>Fine & Chunky Cosmetic Glitters:</strong> Used sparingly as an accent transition buffer.</li>
        <li><strong>Floating Gold Leaf or Liquid Leafing Pen:</strong> Hand-painted along vein perimeters once the resin reaches its firm green-cure stage.</li>
      </ul>

      <h2>Layering Strategy for Dimensional Depth</h2>
      <p>Never attempt a complex geode in a single pour. A professional geode is crafted in three distinct passes: first, the structural foundation and glass adherence; second, the dimensional translucent color pours; and third, a crystal-clear flood coat that seals everything beneath a mirror-like finish.</p>
    `,
    featured_image: RESIN_GEODE_IMAGE,
    author_name: 'ResinArt Studio Collective',
    status: 'published',
    featured: false,
    reading_time: '8 min read',
    seo_title: 'Geode Resin Art Tutorial — Natural Crystals, Glass & Metallic Veining',
    seo_description: 'Step-by-step geode art techniques: creating concentric quartz lines, adhering crushed glass, and detailing with metallic gold veins.',
    published_at: '2026-03-22T14:00:00Z',
    created_at: '2026-03-22T14:00:00Z'
  },
  {
    id: 'art-best-resin-for-art',
    category_id: 'cat-supplies',
    category: INITIAL_CATEGORIES[3],
    title: 'Best Resin for Art: Surface Coating vs. Deep Pour Casting Systems',
    slug: 'best-resin-for-art',
    excerpt: 'Detailed technical comparison of epoxy chemistries: viscosity differences, curing curves, Shore D hardness ratings, and UV stabilization technologies.',
    content: `
      <h2>Why One Resin Does Not Fit All Projects</h2>
      <p>Selecting the wrong epoxy formula is the most common reason beginner projects crack, overheat, or stay gummy. Epoxy resins are engineered for specific volumetric depths and thermodynamic profiles.</p>

      <h2>Coating Resins (Art Resin Systems)</h2>
      <p>Coating resins have a 1:1 mixing ratio and cure within 24 hours. Because they release heat quickly, they should only be poured in thin layers (maximum 1/8 to 1/4 inch). Pouring them too thick triggers a thermal runaway reaction, resulting in violent smoking, boiling bubbles, and yellowed discoloration.</p>

      <h2>Deep Pour Casting Resins</h2>
      <p>Casting resins utilize a 2:1 or 3:1 ratio and cure over 48 to 72 hours. Their low reactivity permits massive single-layer pours (2 to 4 inches deep) with minimal exothermic heat generation. They are ideal for river tables, deep molds, and floral paperweights.</p>

      <h2>UV Additives: HALS vs. UV Blockers</h2>
      <p>Quality art-grade resins incorporate both Hindered Amine Light Stabilizers (HALS) to protect against polymer degradation and UV absorbers that neutralize yellowing caused by sunlight exposure.</p>
    `,
    featured_image: RESIN_WORKSHOP_IMAGE,
    author_name: 'ResinArt Science Desk',
    status: 'published',
    featured: false,
    reading_time: '6 min read',
    seo_title: 'Best Resin for Art: Coating vs Deep Pour Casting Comparison',
    seo_description: 'Learn the critical differences between coating and casting resins: viscosity, pour depth, exothermic curves, and UV resistance.',
    published_at: '2026-03-24T09:30:00Z',
    created_at: '2026-03-24T09:30:00Z'
  },
  {
    id: 'art-why-is-my-resin-sticky',
    category_id: 'cat-troubleshooting',
    category: INITIAL_CATEGORIES[5],
    title: 'Why Is My Resin Sticky? 5 Root Causes and the Foolproof Recovery Method',
    slug: 'why-is-my-resin-sticky',
    excerpt: 'Diagnose whether your sticky resin is soft, tacky, or gummy, understand the chemical imbalance causing it, and learn how to sand, seal, and recoat.',
    content: `
      <h2>The Chemistry of Sticky and Uncured Resin</h2>
      <p>When resin remains sticky after its designated cure time, the chemical reaction has stalled. Epoxies do not "dry"—they cross-link. If the stoichiometric balance between resin molecules and hardener molecules is off by even 5%, uncured monomer remains on the surface permanently.</p>

      <h2>The Three Types of Sticky Resin</h2>
      <ol>
        <li><strong>Runny / Liquid Resin:</strong> Caused by drastically incorrect ratios or completely omitting hardener. Must be thoroughly scraped off with an acetone-dampened cloth.</li>
        <li><strong>Sticky / Gummy Resin:</strong> Caused by inaccurate measuring, under-mixing, or scraping unmixed resin from the mixing container walls.</li>
        <li><strong>Tacky Surface Film (Amine Blush):</strong> Caused by high studio humidity (&gt;60%) reacting with amine molecules during the initial cure phase.</li>
      </ol>

      <h2>How to Fix Sticky Resin (Step-by-Step)</h2>
      <h3>Step 1: Scrape Soft Residue</h3>
      <p>Use a flat putty knife to remove any loose uncured gel. Clean the area with 91%+ isopropyl alcohol or denatured alcohol.</p>

      <h3>Step 2: Sand the Substrate</h3>
      <p>Once dry, sand the entire surface using 120-grit wet/dry sandpaper until the surface is uniform and matte. This mechanical key provides bonding tooth for the new layer.</p>

      <h3>Step 3: Pour a Fresh Calibrated Flood Coat</h3>
      <p>Mix a fresh batch of epoxy with precise gravimetric or volumetric measurement. Stir for 3 full minutes in one cup, pour into a second cup, stir for another minute, and flood the sanded piece.</p>
    `,
    featured_image: RESIN_SAFETY_IMAGE,
    author_name: 'ResinArt Quality & Diagnostics',
    status: 'published',
    featured: true,
    reading_time: '7 min read',
    seo_title: 'Why Is My Resin Sticky? 5 Causes and How to Fix Uncured Epoxy',
    seo_description: 'Fix sticky, tacky, or uncured resin with our step-by-step diagnostic and recovery protocol. Learn causes, sanding methods, and fresh recoats.',
    published_at: '2026-03-25T13:00:00Z',
    created_at: '2026-03-25T13:00:00Z'
  },
  {
    id: 'art-remove-resin-bubbles',
    category_id: 'cat-troubleshooting',
    category: INITIAL_CATEGORIES[5],
    title: 'How to Remove Resin Bubbles: Thermal Sweeping, Alcohol & Degassing Methods',
    slug: 'how-to-remove-resin-bubbles',
    excerpt: 'Comprehensive guide to bubble eradication: warm water bath pre-treatments, butane torch passes, isopropyl alcohol misting, and vacuum chamber degassing.',
    content: `
      <h2>Why Bubbles Form in Mixed Epoxy</h2>
      <p>Bubbles enter resin in two primary ways: mechanical air whipped into the liquid during stirring, and air released from porous substrates (wood, paper, canvas) as the warm resin penetrates fibers.</p>

      <h2>Method 1: Warm Water Pre-Heating (The Easiest Prevention)</h2>
      <p>Before measuring, place sealed bottles of Part A and Part B in warm (not boiling) tap water for 10 minutes. Warm resin has lower viscosity, letting air bubbles rise and burst freely.</p>

      <h2>Method 2: The Propane or Butane Torch</h2>
      <p>A blue-flame culinary butane torch is the gold standard for surface bubble removal. The flame produces carbon dioxide, which instantly destabilizes bubble surface tension. Hold the torch 6 inches away and sweep swiftly like spray paint.</p>

      <h2>Method 3: 91%+ Isopropyl Alcohol Fine Mist</h2>
      <p>When torching is hazardous (e.g., in delicate silicone molds where high heat could melt the silicone to the epoxy), mist the surface once with 91% or 99% isopropyl alcohol from a cosmetic atomizer.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    author_name: 'ResinArt Workshop Guild',
    status: 'published',
    featured: false,
    reading_time: '5 min read',
    seo_title: 'How to Remove Resin Bubbles: Torches, Heat Guns & Alcohol Mists',
    seo_description: 'Eliminate micro-bubbles from your resin projects with warm baths, butane torches, and isopropyl alcohol techniques.',
    published_at: '2026-03-26T08:00:00Z',
    created_at: '2026-03-26T08:00:00Z'
  },
  {
    id: 'art-resin-vs-epoxy',
    category_id: 'cat-supplies',
    category: INITIAL_CATEGORIES[3],
    title: 'Resin vs Epoxy: Chemical Differences, Viscosity & Best Applications',
    slug: 'resin-vs-epoxy',
    excerpt: 'Clear up common naming confusion between generic resin polymers, polyester resins, polyurethane resins, UV resins, and two-component epoxy systems.',
    content: `
      <h2>Demystifying the Terminology</h2>
      <p>While often used interchangeably by crafters, "resin" is a broad umbrella category encompassing any viscous synthetic liquid that hardens into a polymer. "Epoxy" is a specific chemical class within that family, renowned for superior adhesion, low odor, and minimal curing shrinkage.</p>

      <h2>Comparison Table: Epoxy vs. Polyester vs. Polyurethane</h2>
      <ul>
        <li><strong>Epoxy Resin:</strong> Negligible shrinkage (&lt;1%), virtually odorless, crystal clear, excellent bond to wood and glass. Working time: 30–60 minutes.</li>
        <li><strong>Polyester Resin:</strong> Higher shrinkage (5–7%), strong styrene odor requiring forced ventilation, cheaper bulk casting. Used heavily in boat repairs and fiberglass.</li>
        <li><strong>Polyurethane Resin:</strong> Rapid cure (5–20 minutes), moisture-sensitive, often cures opaque white or beige. Perfect for prototyping and figurines.</li>
      </ul>
    `,
    featured_image: RESIN_WORKSHOP_IMAGE,
    author_name: 'ResinArt Science Desk',
    status: 'published',
    featured: false,
    reading_time: '6 min read',
    seo_title: 'Resin vs Epoxy: Understanding Polymer Types and Applications',
    seo_description: 'Understand the distinct differences between epoxy resin, polyester, polyurethane, and UV resins for arts and crafts.',
    published_at: '2026-03-27T08:00:00Z',
    created_at: '2026-03-27T08:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-resin-coasters',
    title: 'Resin Coasters',
    slug: 'resin-coasters',
    excerpt: 'Create durable, heat-resistant decorative coasters with shimmering mica powders and protective silicone mold casting.',
    content: `
      <p>Resin coasters are the quintessential beginner project: they require minimal material (roughly 2–3 oz per coaster), cure in 24 hours, and teach foundational skills in color distribution and mold filling.</p>
      <p>Select silicone molds with rounded chamfered lips for comfortable handling, and finish the underside with adhesive cork backing to protect wooden tabletops.</p>
    `,
    featured_image: RESIN_GEODE_IMAGE,
    difficulty: 'Beginner',
    estimated_time: '45 mins active + 24 hr cure',
    featured: true,
    seo_title: 'How to Make Epoxy Resin Coasters — Step-by-Step DIY Tutorial',
    seo_description: 'Complete hands-on tutorial on crafting beautiful epoxy resin coasters with silicone molds, mica pigments, and cork backings.',
    status: 'published',
    materials: [
      { name: '1:1 Art Epoxy Resin', quantity: '8 oz', notes: 'Heat resistant up to 120°F' },
      { name: 'Silicone Coaster Molds (4-pack)', quantity: '1 set', notes: 'Square or round' },
      { name: 'Mica Powder Pigments', quantity: '3 colors', notes: 'Teal, bronze, and pearlescent white' },
      { name: 'Adhesive Cork Backing Pads', quantity: '4 pads', notes: '4-inch diameter' }
    ],
    steps: [
      { step_number: 1, title: 'Clean and Level Molds', content: 'Wipe silicone molds with tape to lift dust particles. Place on a verified level surface.' },
      { step_number: 2, title: 'Measure and Stir Resin', content: 'Measure 4 oz Part A and 4 oz Part B. Stir thoroughly for 3 continuous minutes.' },
      { step_number: 3, title: 'Separate and Pigment', content: 'Divide into 3 cups: 4 oz teal, 2 oz bronze, and 2 oz pearl white.' },
      { step_number: 4, title: 'Pour and Create Swirls', content: 'Pour contrasting colors into opposite sides of the mold and gently swirl with a wooden toothpick.' },
      { step_number: 5, title: 'De-bubble and Cover', content: 'Sweep lightly with a butane torch or mist with 99% alcohol, then cover with a dust dome for 24 hours.' }
    ],
    created_at: '2026-03-10T12:00:00Z'
  },
  {
    id: 'proj-resin-trays',
    title: 'Resin Trays',
    slug: 'resin-trays',
    excerpt: 'Design an exquisite ocean or marble serving tray with brass hardware and high-gloss flood coat leveling.',
    content: `
      <p>Serving trays represent a high-value craft project that blends functional woodwork with luxurious fluid resin art. Whether using an unfinished acacia wood tray or casting a full resin slab with embedded brass handles, the mirror finish provides a striking centerpiece.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    difficulty: 'Intermediate',
    estimated_time: '1.5 hours + 48 hr cure',
    featured: true,
    seo_title: 'DIY Resin Serving Tray Tutorial — Wood & Epoxy Crafting',
    seo_description: 'Learn how to pour a stunning ocean or marble resin serving tray with ergonomic metal handles and sealed wood bases.',
    status: 'published',
    materials: [
      { name: 'Unfinished Wood Tray Blank', quantity: '1 unit', notes: '12 x 16 inches' },
      { name: 'High-Viscosity Art Resin', quantity: '16 oz', notes: 'UV-resistant flood coat' },
      { name: 'Ocean Pigment Paste & Mica', quantity: '4 colors', notes: 'Navy, ocean blue, white wave paste' },
      { name: 'Brushed Brass Handles with Screws', quantity: '1 pair', notes: '6-inch center-to-center' }
    ],
    steps: [
      { step_number: 1, title: 'Seal the Wood Base', content: 'Apply a thin seal coat of clear epoxy to prevent air bubbles escaping from the wood grain.' },
      { step_number: 2, title: 'Drill Handle Holes', content: 'Measure and pre-drill holes for your brass hardware before pouring the main layer.' },
      { step_number: 3, title: 'Pour Gradient Ocean Layers', content: 'Pour dark blue at the top edge, blending into lighter turquoise toward the bottom.' },
      { step_number: 4, title: 'Blow Wave Lacing', content: 'Lay down a thin line of white wave paste and use a heat gun at 45 degrees to push foam across the blue.' },
      { step_number: 5, title: 'Attach Handles Post-Cure', content: 'After 48 hours of curing, attach your hardware securely from the underside.' }
    ],
    created_at: '2026-03-12T10:00:00Z'
  },
  {
    id: 'proj-resin-jewelry',
    title: 'Resin Jewelry',
    slug: 'resin-jewelry',
    excerpt: 'Handcraft botanical earrings, pendant necklaces, and rings with pressed florals and UV resin bezels.',
    content: `
      <p>Resin jewelry making offers instant creative gratification. By encapsulating dried miniature wildflowers, gold leaf flakes, and pigments inside open-back metal bezels, you can create wearable heirlooms in under 30 minutes.</p>
    `,
    featured_image: RESIN_GEODE_IMAGE,
    difficulty: 'Beginner',
    estimated_time: '30 mins + UV cure',
    featured: true,
    seo_title: 'How to Make Resin Jewelry — Pressed Flowers, Bezels & UV Cure',
    seo_description: 'Step-by-step jewelry crafting with UV resin, open-back bezels, pressed dried flowers, and hypoallergenic earring findings.',
    status: 'published',
    materials: [
      { name: 'UV Resin (Hard Type)', quantity: '100g bottle', notes: 'Crystal clear, low odor' },
      { name: 'Pressed Dried Miniature Botanicals', quantity: '1 pack', notes: 'Assorted blossoms and ferns' },
      { name: 'Gold-Plated Open-Back Bezels', quantity: '6 pieces', notes: 'Geometric teardrop and circle shapes' },
      { name: '36W UV LED Curing Lamp', quantity: '1 unit', notes: '365+405nm wavelength' }
    ],
    steps: [
      { step_number: 1, title: 'Tape Bezel Backs', content: 'Press open bezels firmly onto specialized seamless jewelry tape to create a temporary bottom barrier.' },
      { step_number: 2, title: 'Pour Thin Base Layer', content: 'Add a shallow layer of UV resin and cure under the UV lamp for 60 seconds.' },
      { step_number: 3, title: 'Arrange Dried Flowers', content: 'Place delicate dried blossoms with precision tweezers onto the cured base.' },
      { step_number: 4, title: 'Dome and Final Cure', content: 'Fill with UV resin to a convex dome and cure for 120 seconds on front and back.' }
    ],
    created_at: '2026-03-14T15:00:00Z'
  },
  {
    id: 'proj-resin-wall-art',
    title: 'Resin Wall Art',
    slug: 'resin-wall-art',
    excerpt: 'Elevate canvases and wooden cradle boards into high-end gallery pieces with multidimensional fluid pours.',
    content: `
      <p>Transforming large-format wooden panels with epoxy creates radiant wall decor that rivals glass installations. Using tape dams, level boards, and intentional movement, artists achieve mesmerizing abstract vistas.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    difficulty: 'Advanced',
    estimated_time: '2 hours + 72 hr cure',
    featured: true,
    seo_title: 'Resin Wall Art Masterclass — Cradled Panels & Fluid Abstraction',
    seo_description: 'Create large-scale resin wall art on cradled wood panels with layered depth, metallic pigments, and mirror flood coats.',
    status: 'published',
    materials: [
      { name: 'Birch Cradled Wood Panel (24x36)', quantity: '1 panel', notes: 'Sanded and primed' },
      { name: 'Premium Low-Viscosity Epoxy', quantity: '32 oz', notes: 'High UV stabilization' },
      { name: 'Heavy-Duty Painter\'s Tape', quantity: '1 roll', notes: 'For edge dams and back masking' },
      { name: 'Butane Studio Torch', quantity: '1 unit', notes: 'With butane canister' }
    ],
    steps: [
      { step_number: 1, title: 'Prep and Tape the Back', content: 'Apply tape around the underside perimeter to catch and easily peel away resin drips later.' },
      { step_number: 2, title: 'Level on Stand-Off Cups', content: 'Elevate the board on 4 inverted paper cups and verify horizontal level.' },
      { step_number: 3, title: 'Pour Fluid Composition', content: 'Pour tinted resins in organic diagonal bands, tilting the board smoothly to blend boundaries.' },
      { step_number: 4, title: 'Torch and Shield', content: 'Torch surface bubbles thoroughly, then place a clean cardboard shield overhead for 72 hours.' }
    ],
    created_at: '2026-03-16T11:00:00Z'
  },
  {
    id: 'proj-resin-bookmarks',
    title: 'Resin Bookmarks',
    slug: 'resin-bookmarks',
    excerpt: 'Cast slim, flexible bookmarks with embedded gold foil, dried lavender, and silk tassels.',
    content: `
      <p>Slender resin bookmarks are functional art pieces. Because bookmarks require flexibility to bend inside closed books without snapping, choosing a resin with balanced Shore D hardness is key.</p>
    `,
    featured_image: RESIN_WORKSHOP_IMAGE,
    difficulty: 'Beginner',
    estimated_time: '30 mins + 24 hr cure',
    featured: false,
    seo_title: 'DIY Resin Bookmarks Tutorial — Dried Flowers & Silk Tassels',
    seo_description: 'Learn how to pour delicate resin bookmarks with silicone molds, gold leaf, botanical florals, and silk tassels.',
    status: 'published',
    materials: [
      { name: 'Silicone Bookmark Mold Set', quantity: '1 pack', notes: 'Includes hole-pin for tassel' },
      { name: 'Epoxy Resin', quantity: '4 oz', notes: 'Flexible cure grade' },
      { name: 'Gold Leaf Flakes', quantity: '1 vial', notes: 'Imitation gold leaf' },
      { name: 'Silk Tassels', quantity: '5 pack', notes: 'Complementary pastel colors' }
    ],
    steps: [
      { step_number: 1, title: 'Fill Mold Halfway', content: 'Pour clear mixed epoxy halfway up the bookmark mold channel.' },
      { step_number: 2, title: 'Float Botanicals and Gold', content: 'Gently tuck gold leaf and dried sprigs into the resin with a toothpick.' },
      { step_number: 3, title: 'Top-Off and De-bubble', content: 'Fill to the top lip without overflowing the center tassel hole pin.' },
      { step_number: 4, title: 'Demold and Tie Tassel', content: 'Demold after 24 hours and thread your silk tassel through the molded hole.' }
    ],
    created_at: '2026-03-17T09:00:00Z'
  },
  {
    id: 'proj-resin-tables',
    title: 'Resin Tables',
    slug: 'resin-tables',
    excerpt: 'Comprehensive live-edge river table tutorial: wood flattening, deep-pour dams, and satin finish polishing.',
    content: `
      <p>Building a live-edge epoxy river table is the pinnacle of functional resin artistry. Integrating natural hardwood grain with deep river pours requires precision carpentry, silicone dam sealing, and slow-curing deep pour casting epoxy.</p>
    `,
    featured_image: HERO_OCEAN_IMAGE,
    difficulty: 'Advanced',
    estimated_time: '12 hours active + 7 days cure',
    featured: false,
    seo_title: 'Epoxy Resin River Table Tutorial — Live Edge Woodworking & Pouring',
    seo_description: 'Master live-edge resin river tables: moisture testing, mold sealing, deep-pour epoxy techniques, and topcoat polishing.',
    status: 'published',
    materials: [
      { name: 'Kiln-Dried Walnut Slabs', quantity: '2 matching pieces', notes: 'Moisture content &lt; 9%' },
      { name: 'Deep Pour Casting Resin', quantity: '3 gallons', notes: '2:1 ratio for 2-inch single pours' },
      { name: 'HDPE or Tuck Tape Mold Form', quantity: '1 unit', notes: 'Non-stick sealing surface' },
      { name: 'Silicone Caulk', quantity: '2 tubes', notes: '100% silicone for dam containment' }
    ],
    steps: [
      { step_number: 1, title: 'Bark Removal and Sanding', content: 'Strip loose bark with a drawknife and sand live edges to sound solid wood.' },
      { step_number: 2, title: 'Seal Live Edges', content: 'Brush a thin coat of epoxy onto the edge fibers to lock out trapped air pockets.' },
      { step_number: 3, title: 'Construct Watertight Form', content: 'Build a melamine form lined with Tuck tape and seal every corner with 100% silicone.' },
      { step_number: 4, title: 'Deep Pour the River', content: 'Mix deep-pour epoxy thoroughly and pour up to 2 inches deep. Allow 72 hours for gelation.' },
      { step_number: 5, title: 'Flatten and Topcoat', content: 'Flatten with a router sled or drum sander, progress through 800-grit, and apply hardwax oil.' }
    ],
    created_at: '2026-03-19T09:00:00Z'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'ResinArt',
  site_description: 'A premier editorial publication and comprehensive educational guide to modern epoxy resin art, techniques, beginner projects, supplies, and studio safety.',
  default_seo_title: 'ResinArt — Modern Resin Art Guides, Techniques & Inspiration',
  default_seo_description: 'Discover the craft and chemistry of epoxy resin. Expert tutorials, beginner guides, wave pouring techniques, supplies, and workshop safety.',
  contact_email: 'hello@resinart.com',
  support_phone: '+1 (555) 019-4587',
  studio_location: '128 Creative Way, Art City, CA 90210',
  instagram_url: 'https://instagram.com',
  pinterest_url: 'https://pinterest.com',
  youtube_url: 'https://youtube.com'
};
