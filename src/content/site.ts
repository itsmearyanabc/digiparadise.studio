// Single source of truth for site copy. Content comes from the Digiparadise
// company profile doc and the portfolio PDF.

export const site = {
  name: "Digiparadise",
  legalName: "Digiparadise Media", // TODO: confirm final brand name with client (Media / Studio / Studios)
  url: "https://digiparadise.studio",
  tagline: "Content systems that get brands noticed.",
  description:
    "Digiparadise is a content and digital growth studio. We build content systems for brands, founders and experts: strategy, short-form video, UGC ads, personal branding and post-production.",
  email: "hello@digiparadise.studio", // TODO: confirm
  whatsapp: "", // TODO: client to provide
  socials: {
    instagram: "", // TODO
    youtube: "",
    linkedin: "",
  },
  playbook: "https://www.playbook.com/s/digiparadise-media/tyHDrLSM8wdfriBPrL1eX199",
};

export type ServiceGroup = { title: string; items: string[] };
export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  pitch: string;
  overview: string[];
  groups: ServiceGroup[];
  deliverables: string[];
  idealClients?: string[];
  accent: "aqua" | "blue" | "sun" | "ink";
};

export const services: Service[] = [
  {
    slug: "social-media-management",
    index: "01",
    title: "Social Media Strategy & Management",
    short: "Social media",
    pitch: "Turn every channel into a brand-building platform, not a posting schedule.",
    overview: [
      "We help brands build a consistent and recognisable social media presence through strategic planning, creative content and regular publishing.",
      "Our approach goes beyond simply managing accounts. We understand the brand, its audience, market positioning and business objectives before developing a content strategy.",
    ],
    groups: [
      { title: "Social media strategy", items: ["Social media audit and account analysis", "Competitor and industry research", "Target audience identification", "Brand positioning and communication strategy", "Content pillars and direction", "Platform strategy for Instagram, Facebook, LinkedIn and YouTube"] },
      { title: "Content planning", items: ["Monthly content calendars", "Content ideas and creative concepts", "Campaign planning", "Trending content opportunities", "Festive and occasion-based campaigns", "Content series planning"] },
      { title: "Creation & publishing", items: ["Reel concepts and creative direction", "Static posts and carousels", "Video content coordination", "Caption writing and copywriting", "Creative briefs and scripting", "Scheduling and publishing"] },
      { title: "Community management", items: ["Comment management", "Audience engagement", "DM response coordination", "Community-building activities", "Brand communication guidelines"] },
      { title: "Reporting & optimisation", items: ["Monthly performance reports", "Content performance analysis", "Reach and engagement monitoring", "High-performing format identification", "Recommendations for future content"] },
    ],
    deliverables: ["Social media audit", "Monthly content strategy", "Monthly content calendar", "Reel and post concepts", "Captions and hashtags", "Creative coordination", "Publishing and scheduling", "Monthly performance reports"],
    accent: "aqua",
  },
  {
    slug: "personal-branding",
    index: "02",
    title: "Personal Branding & Founder-Led Content",
    short: "Personal branding",
    pitch: "Position founders and experts as the recognisable voice of their industry.",
    overview: [
      "We help founders, executives, coaches, consultants and industry experts build a strong personal brand through strategic content and consistent digital communication.",
      "Personal branding is not about chasing viral videos. We turn your expertise, perspectives and experiences into content that builds credibility and audience trust.",
    ],
    groups: [
      { title: "Personal brand strategy", items: ["Personal brand positioning", "Audience identification", "Industry and competitor research", "Brand voice and communication style", "Content pillars and direction", "Platform selection and growth strategy"] },
      { title: "Content development", items: ["Topic research", "Content ideation", "Reel and video concepts", "Hook development", "Scriptwriting", "Educational and thought-leadership content", "Storytelling-based content", "Founder journey and behind-the-scenes"] },
      { title: "Production & execution", items: ["Recording plans", "Shoot planning and coordination", "On-camera direction", "Short-form video production", "Editing and post-production", "Subtitles and motion graphics", "Platform-specific formatting"] },
      { title: "Distribution", items: ["Instagram content strategy", "LinkedIn content strategy", "YouTube Shorts", "Long-form YouTube content", "Repurposing podcasts and interviews", "Publishing and performance analysis"] },
    ],
    deliverables: ["Personal branding strategy", "Monthly content strategy", "Content topic bank", "Video scripts", "Recording guidelines", "Short-form videos", "Captions and publishing calendars", "Performance reports"],
    idealClients: ["Startup founders", "Business owners", "CEOs and executives", "Coaches and consultants", "Finance professionals", "Doctors and healthcare professionals", "Industry experts", "Public speakers and creators"],
    accent: "sun",
  },
  {
    slug: "short-form-video-production",
    index: "03",
    title: "Short-Form Video Production",
    short: "Short-form video",
    pitch: "Reels and shorts built with a purpose: stop the scroll, land the message, drive action.",
    overview: [
      "We conceptualise and produce engaging short-form video content designed for today's platforms.",
      "Every video is developed with a specific purpose, whether brand awareness, product education, engagement, lead generation or storytelling.",
    ],
    groups: [
      { title: "Creative development", items: ["Content research and ideation", "Creative concepts", "Video hooks", "Scriptwriting", "Storyboards", "Content format development"] },
      { title: "Pre-production", items: ["Shoot planning", "Shot lists", "Location planning", "Talent coordination", "Production scheduling", "Creative direction"] },
      { title: "Production", items: ["Talking-head videos", "Product showcases", "Educational videos", "Testimonials", "Behind-the-scenes", "Lifestyle videos", "Brand storytelling", "Studio and location shoots"] },
      { title: "Post-production", items: ["Video editing", "Dynamic cuts and transitions", "Sound design", "Background music", "Subtitles and captions", "Motion graphics", "Colour correction", "Platform-specific exports"] },
    ],
    deliverables: ["Creative concepts", "Video scripts", "Shoot plans", "Professionally edited reels", "Short-form video assets", "Captions and on-screen text", "Platform-ready exports"],
    accent: "blue",
  },
  {
    slug: "ugc-performance-ads",
    index: "04",
    title: "UGC & Performance Ad Creatives",
    short: "UGC & ad creatives",
    pitch: "Creator-led ads with multiple hooks and angles, ready to test and scale.",
    overview: [
      "We create UGC-style and creator-led advertising videos that communicate product benefits, demonstrate solutions and connect with potential customers.",
      "The goal: give brands multiple creative formats and messaging angles to test across paid campaigns.",
    ],
    groups: [
      { title: "Creative strategy", items: ["Product and audience research", "Customer pain-point identification", "Advertising angles", "Competitor creative research", "Hook development", "Ad concept development"] },
      { title: "UGC video production", items: ["Creator-style videos", "Product demonstrations", "Problem-solution videos", "Testimonial-style videos", "Product explainers", "Unboxing videos", "Lifestyle integrations", "Founder-led ads"] },
      { title: "Ad creative development", items: ["Direct-response ad scripts", "Promotional scripts", "Offer-focused creatives", "Alternative hooks", "Multiple creative variations", "Platform-specific ad formats"] },
      { title: "Creative optimisation", items: ["Creative performance analysis", "Hook testing", "Messaging variations", "Video cut-downs", "New creative recommendations from campaign data"] },
    ],
    deliverables: ["UGC-style videos", "Advertising scripts", "Creative concepts", "Product demonstration videos", "Multiple ad variations", "Short-form ad assets", "Platform-ready exports"],
    accent: "aqua",
  },
  {
    slug: "video-editing-post-production",
    index: "05",
    title: "Video Editing & Post-Production",
    short: "Editing & post",
    pitch: "Raw footage in. Polished, platform-ready stories out, on repeat.",
    overview: [
      "We transform raw footage into polished, engaging and platform-ready video content.",
      "We support brands, agencies, creators and production houses with professional editing on a recurring or project basis, from reels to long-form YouTube and podcasts.",
    ],
    groups: [
      { title: "Short-form editing", items: ["Instagram Reels", "YouTube Shorts", "Promotional videos", "Educational videos", "Talking-head videos", "Social ads", "Dynamic short-form edits"] },
      { title: "Long-form editing", items: ["YouTube videos", "Brand films", "Interviews", "Documentary-style content", "Corporate videos", "Educational content"] },
      { title: "Podcast editing", items: ["Multi-camera podcast editing", "Audio podcast editing", "Dialogue cleanup", "Audio balancing", "Camera switching", "Episode formatting", "Intro and outro integration"] },
      { title: "Advanced post", items: ["Motion graphics", "Animation", "Subtitles and captions", "Colour correction and grading", "Sound design", "Music integration", "Visual effects", "Titles and graphics"] },
    ],
    deliverables: ["Edited reels and shorts", "Long-form YouTube videos", "Podcast episodes", "Podcast teasers", "Social cut-downs", "Motion graphics", "Audio masters", "Platform-ready exports"],
    accent: "blue",
  },
  {
    slug: "content-ip-branded-series",
    index: "06",
    title: "Content IPs & Branded Series",
    short: "Content IPs",
    pitch: "Repeatable formats that become recognisable brand assets over time.",
    overview: [
      "We help brands create distinctive content properties that go beyond conventional posts.",
      "A content IP is a repeatable format or series built around a recognisable concept, audience and style, building familiarity, category authority and long-term recall.",
    ],
    groups: [
      { title: "Research & discovery", items: ["Audience research", "Industry research", "Content opportunity identification", "Competitor and format analysis", "Content territory development"] },
      { title: "IP concept development", items: ["Series concept development", "Naming and positioning", "Format development", "Brand integration strategy", "Recurring segments", "Host and talent approach"] },
      { title: "Creative development", items: ["Episode structure", "Content themes", "Script development", "Visual identity direction", "Storytelling approach", "Communication guidelines"] },
      { title: "Production & execution", items: ["Pilot episode planning", "Production coordination", "Content creation", "Post-production", "Distribution planning", "Repeatable production workflows"] },
    ],
    deliverables: ["Content IP strategy", "Concept note", "Content format deck", "Series structure", "Episode architecture", "Sample scripts", "Pilot episode plan", "Production and distribution roadmap"],
    accent: "sun",
  },
];

export const audiences = [
  { title: "Consumer & D2C brands", body: "Increase awareness, establish identity, showcase products and build stronger relationships with your audience." },
  { title: "Founders & business leaders", body: "Become a recognised thought leader with a personal brand people trust." },
  { title: "Coaches, consultants & experts", body: "Communicate expertise, attract your ideal audience and generate opportunities through content." },
  { title: "Service-based businesses", body: "Strengthen digital presence, build authority and generate qualified enquiries." },
  { title: "Marketing teams", body: "A reliable creative and video execution partner for your campaigns." },
  { title: "Brands running paid campaigns", body: "UGC-style content, ad creatives and video assets that feed performance marketing." },
];

export const process = [
  { n: "01", title: "Discovery", body: "We learn your business, audience, current marketing, product, challenges and the outcomes you expect." },
  { n: "02", title: "Strategy & scope", body: "We define content direction, deliverables, timelines, responsibilities and the numbers we'll track." },
  { n: "03", title: "Planning", body: "Content calendars, concepts, scripts, shoot plans, production needs and approval checkpoints." },
  { n: "04", title: "Production", body: "We execute the shoot, coordinate resources and capture everything to the agreed creative direction." },
  { n: "05", title: "Post & review", body: "Our post team edits, we collect consolidated feedback and complete the agreed revision rounds." },
  { n: "06", title: "Publish & optimise", body: "We publish or deliver, review performance and feed the insights into the next content cycle." },
];

export const capabilities = [
  { title: "Pre-production", items: ["Creative briefing", "Scriptwriting", "Storyboarding", "Shot lists", "Talent & location"] },
  { title: "Production", items: ["Studio shoots", "Location shoots", "Product shoots", "Podcasts & interviews", "Multi-camera"] },
  { title: "Post-production", items: ["Editing", "Motion graphics", "Colour grading", "Sound design", "Subtitles"] },
  { title: "Distribution", items: ["Platform formatting", "Scheduling", "Publishing", "Creative versioning", "Performance feedback"] },
  { title: "Management", items: ["Approval workflows", "Asset management", "Version control", "Delivery tracking"] },
];

export type WorkItem = {
  name: string;
  category: "Creators" | "Brands" | "Personal brands";
  href: string;
  youtubeId?: string;
  note?: string;
};

// TODO: confirm client permission to display these names publicly.
export const work: WorkItem[] = [
  { name: "Mary Kom", category: "Creators", href: "https://youtu.be/_xlO4ugYVuk", youtubeId: "_xlO4ugYVuk", note: "Podcast" },
  { name: "Varun Mayya", category: "Creators", href: "https://youtu.be/ObXOm9YqnBk", youtubeId: "ObXOm9YqnBk", note: "Podcast" },
  { name: "KK Creates", category: "Creators", href: "https://youtu.be/RncL-lkUpU4", youtubeId: "RncL-lkUpU4", note: "Long-form" },
  { name: "Prakhar Gupta", category: "Creators", href: "https://youtu.be/ObXOm9YqnBk", youtubeId: "ObXOm9YqnBk", note: "Podcast" },
  { name: "Ankit Batra", category: "Creators", href: "https://youtu.be/dXICwpmGpSc", youtubeId: "dXICwpmGpSc", note: "Long-form" },
  { name: "Yogesh Rawat", category: "Creators", href: "https://youtu.be/JV0w75K9xSM", youtubeId: "JV0w75K9xSM", note: "Podcast" },
  { name: "Avadh Ojha", category: "Creators", href: "https://youtu.be/DfHaAO1zOmw", youtubeId: "DfHaAO1zOmw", note: "Interview" },
  { name: "Vivek Bindra", category: "Creators", href: "https://www.youtube.com/@MrVivekBindra", note: "YouTube" },
  { name: "Amy Aela", category: "Creators", href: "https://www.youtube.com/@AmyAelaOfficial", note: "YouTube" },
  { name: "Gagan Pratap Maths", category: "Creators", href: "https://www.youtube.com/@GaganPratapMaths", note: "YouTube" },
  { name: "Ashutosh Pratihast", category: "Creators", href: "https://www.youtube.com/@AshutoshPratihastAP", note: "YouTube" },
  { name: "Yamini Jain", category: "Creators", href: "https://www.instagram.com/yaminijainofficial/", note: "Instagram" },
  { name: "Sachin S Sharma", category: "Creators", href: "https://www.instagram.com/sachinnss", note: "Instagram" },
  { name: "Harshit Jain", category: "Creators", href: "https://www.instagram.com/bizharshit/", note: "Instagram" },
  { name: "Justh", category: "Creators", href: "https://www.instagram.com/i.justh/", note: "Instagram" },
  { name: "AstroTalk", category: "Brands", href: "https://www.instagram.com/astrotalk/", note: "Social & reels" },
  { name: "Seekho", category: "Brands", href: "https://www.instagram.com/seekhoapp/", note: "Social & reels" },
  { name: "Perfora", category: "Brands", href: "https://www.instagram.com/perforaofficial/", note: "D2C" },
  { name: "MyFrido", category: "Brands", href: "https://www.instagram.com/myfrido/", note: "D2C" },
  { name: "Be10x", category: "Brands", href: "https://www.instagram.com/be10x.in/reels/", note: "Edtech" },
  { name: "Max Protein", category: "Brands", href: "https://www.instagram.com/ritebite_maxprotein/", note: "D2C" },
  { name: "Delta Exchange", category: "Brands", href: "https://www.instagram.com/deltaexchangein/", note: "Fintech" },
  { name: "Trunativ", category: "Brands", href: "https://www.instagram.com/trunativ/", note: "D2C" },
  { name: "Glam21", category: "Brands", href: "https://www.instagram.com/reel/DaAwQ0mB4Y9/", note: "Beauty" },
  { name: "Brandbrew", category: "Brands", href: "https://www.instagram.com/thebrandbrew", note: "Agency" },
  { name: "DIB Accountants", category: "Brands", href: "https://www.instagram.com/dibaccountants/", note: "Australia" },
  { name: "DIB Lawyers", category: "Brands", href: "https://www.instagram.com/dibassociateslawyers/", note: "Australia" },
  { name: "Botanica Pharmacy", category: "Brands", href: "https://www.instagram.com/botanicawellnesspharmacy/", note: "Australia" },
  { name: "Prajwal Malhotra", category: "Personal brands", href: "https://www.instagram.com/pipswithprajwal/", note: "Built from scratch" },
  { name: "Dr. Tarang Jain Arora", category: "Personal brands", href: "https://www.instagram.com/dr_tarangjain/", note: "Built from scratch" },
  { name: "Chetan Bhardwaj", category: "Personal brands", href: "https://www.instagram.com/numerologywithchetan/", note: "Built from scratch" },
  { name: "Vaibbhav Ranghera", category: "Personal brands", href: "https://www.instagram.com/vaibbhavrnghera/", note: "Built from scratch" },
];

export const marqueeNames = [
  "Mary Kom", "Varun Mayya", "Vivek Bindra", "AstroTalk", "Seekho", "Avadh Ojha", "Perfora", "Prakhar Gupta",
  "MyFrido", "Be10x", "KK Creates", "Max Protein", "Delta Exchange", "Gagan Pratap", "Glam21", "DIB Lawyers",
];

export const faqs = [
  { q: "What does Digiparadise actually do?", a: "We're a content and digital growth studio. We plan, script, shoot, edit, publish and amplify content for brands, founders and experts, so it all works as one system instead of random posts." },
  { q: "Can I hire you for just one service?", a: "Yes. Every service can be taken on its own (say, only video editing or only UGC ads) or combined into one integrated monthly engagement." },
  { q: "Do you work with personal brands and founders?", a: "It's one of our core strengths. We've grown personal brands from scratch, handling positioning, topics, scripts, on-camera direction and editing." },
  { q: "Do you shoot, or only edit?", a: "Both. We handle pre-production, studio and location shoots, multi-camera podcasts and full post-production. Studio arrangements are customised per project." },
  { q: "Do you work with clients outside India?", a: "Yes. We currently work with brands in Australia, including accounting, legal and pharmacy businesses, as well as across India." },
  { q: "How do we get started?", a: "Send us a short brief. We'll set up a discovery call, understand your goals and come back with a strategy, scope and timeline." },
];
