export const SITE_CONFIG = {
  name: "Hridesh Sapkota",
  title: "Hridesh Sapkota - Freelance Podcast Producer",
  description: "4+ years experience in podcast production, editing, and growth strategies. Audio & video editing, distribution, and marketing services.",
  social: {
    twitter: "https://twitter.com/hrideshsapkota",
    instagram: "https://instagram.com/hrideshsapkota",
    linkedin: "https://linkedin.com/in/hrideshsapkota",
    youtube: "https://youtube.com/@hrideshsapkota",
  },
  contact: {
    email: "hello@hrideshsapkota.com",
    phone: "+977 123 456 789",
  }
};

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    id: "setup",
    title: "Setting up the Podcast",
    description: "Everything you need to get started, from equipment setup to platform selection.",
    icon: "settings",
  },
  {
    id: "editing",
    title: "Recording and Editing",
    description: "Professional audio and video editing to make your content shine.",
    icon: "edit",
  },
  {
    id: "distribution",
    title: "Distribution and Marketing",
    description: "Strategies to grow your audience and distribute your podcast effectively.",
    icon: "globe",
  },
];

export const SKILLS = [
  "High Quality Audio & Video Editing",
  "Audio Restoration EQ and Mastering",
  "Sound Design and SFXs",
  "Graphics and Thumbnails",
  "Website Maintenance",
  "Short Form Content",
  "Show-notes and Transcript",
  "Equipment Recommendation and Setup",
  "Formatting a Show and Scripting",
  "SEO Optimization and Distribution",
];

export const TOOLS = [
  "Adobe Audition",
  "iZotope RX",
  "Adobe Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Audacity",
  "Descript",
  "Riverside",
  "CapCut",
  "Eleven Labs",
  "Canva",
  "Adobe Photoshop",
  "Transistor/PodBean/Buzzsprout",
  "YouTube Studio",
];

export const PRICING = [
  {
    id: "basic",
    name: "Basic Editing",
    price: 150,
    description: "Perfect for podcasters looking for professional audio editing.",
    features: [
      "Audio Editing",
      "2 Audiograms",
      "Show notes",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Editing and Strategize",
    price: 250,
    description: "For podcasters who want to leverage both audio and video content.",
    features: [
      "All Basic features",
      "Video Editing",
      "2 Shorts/Reels",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Planning, Editing and Strategize",
    price: 500,
    description: "Full-service podcast production for serious content creators.",
    features: [
      "High Quality Audio/Video Editing",
      "2 Audiograms/Shorts",
      "Thumbnails and Banners",
      "Show Notes",
      "Publishing",
    ],
    popular: false,
  },
];

export const PROCESS_STEPS = [
  {
    id: 1,
    title: "Discovery Call",
    description: "We discuss your podcast goals, audience, and requirements to create a custom strategy that aligns with your vision.",
    icon: "mic",
  },
  {
    id: 2,
    title: "Strategy & Planning",
    description: "Comprehensive production planning including technical setup recommendations and detailed workflow design.",
    icon: "strategy",
  },
  {
    id: 3,
    title: "Recording Session",
    description: "Professional recording sessions with optimal technical setup ensuring crystal-clear audio and video quality.",
    icon: "settings",
  },
  {
    id: 4,
    title: "Editing & Post-Production",
    description: "Expert editing to polish your content with professional-grade techniques, sound design, and quality enhancement.",
    icon: "edit",
  },
  {
    id: 5,
    title: "Enhancement & Distribution",
    description: "Adding intros, outros, sound effects, music, and strategic publishing across podcast platforms for maximum reach.",
    icon: "distribution",
  },
  {
    id: 6,
    title: "Growth & Optimization",
    description: "Ongoing support with audience analytics, content optimization, and marketing strategies to grow your podcast.",
    icon: "growth",
  },
];

export const COMPANIES = [
  {
    id: 1,
    name: "Spotify",
    logo: "/images/companies/spotify.svg",
    category: "Streaming Platform",
    description: "Produced exclusive podcast content for Spotify's creator program",
    projectType: "Content Creation",
    color: "from-green-500 to-green-600",
    bgAccent: "bg-green-100",
    darkBgAccent: "dark:bg-green-900/20"
  },
  {
    id: 2,
    name: "Netflix",
    logo: "/images/companies/netflix.svg", 
    category: "Entertainment",
    description: "Audio post-production for documentary series promotional content",
    projectType: "Audio Post-Production",
    color: "from-red-500 to-red-600",
    bgAccent: "bg-red-100",
    darkBgAccent: "dark:bg-red-900/20"
  },
  {
    id: 3,
    name: "Google Podcasts",
    logo: "/images/companies/google.svg",
    category: "Tech Platform", 
    description: "Technical consulting for podcast optimization and distribution",
    projectType: "Consulting",
    color: "from-blue-500 to-blue-600",
    bgAccent: "bg-blue-100",
    darkBgAccent: "dark:bg-blue-900/20"
  },
  {
    id: 4,
    name: "Adobe",
    logo: "/images/companies/adobe.svg",
    category: "Creative Software",
    description: "Beta testing and feedback for Adobe Audition podcast features",
    projectType: "Product Development",
    color: "from-purple-500 to-purple-600", 
    bgAccent: "bg-purple-100",
    darkBgAccent: "dark:bg-purple-900/20"
  },
  {
    id: 5,
    name: "Anchor",
    logo: "/images/companies/anchor.svg",
    category: "Podcast Platform",
    description: "Content strategy and production for platform showcase podcasts",
    projectType: "Strategy & Production",
    color: "from-indigo-500 to-indigo-600",
    bgAccent: "bg-indigo-100", 
    darkBgAccent: "dark:bg-indigo-900/20"
  },
  {
    id: 6,
    name: "Riverside.fm",
    logo: "/images/companies/riverside.svg",
    category: "Recording Platform",
    description: "Quality assurance and workflow optimization for remote recordings",
    projectType: "Quality Assurance",
    color: "from-teal-500 to-teal-600",
    bgAccent: "bg-teal-100",
    darkBgAccent: "dark:bg-teal-900/20"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Host, Business Breakthrough Podcast",
    content: "Hridesh transformed our podcast quality overnight. The audio is crystal clear, and the promotional materials he creates have helped us grow our audience by 200%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Creator, Tech Talk Weekly",
    content: "Working with Hridesh has been amazing. His technical skills are top-notch, but it's his understanding of storytelling that really sets him apart from other producers.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lisa Patel",
    title: "Host, Mindful Entrepreneurship",
    content: "Hridesh doesn't just edit our podcast; he enhances it. His attention to detail and creative suggestions have made our show sound professional and engaging.",
    rating: 5,
  },
];