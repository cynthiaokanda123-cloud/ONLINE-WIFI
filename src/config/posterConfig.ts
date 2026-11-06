/**
 * POSTER CONFIGURATION
 * 
 * You can easily edit any of the text, Wi-Fi credentials, job postings,
 * developer skills, contact information, and styling here.
 * 
 * PLACEHOLDERS TO REPLACE WITH YOUR REAL DETAILS:
 * - wifi.ssid: Replace "[WIFI_NAME]" with your router's Wi-Fi network name.
 * - wifi.password: Replace "[WIFI_PASSWORD]" with your password (or set to "No password needed").
 * - developer.phone: Replace with your actual phone number.
 * - developer.email: Replace with your actual contact email.
 * - developer.website: Replace with your portfolio or website URL.
 * - developer.linkedin: Replace with your LinkedIn profile link.
 * - developer.github: Replace with your GitHub profile link.
 * - developer.location: Replace with your town/city (e.g., "Nairobi, Kenya").
 * - developer.applyUrl: Link where candidates should submit job applications.
 */

export interface JobOpportunity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  payEstimate?: string;
  category: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
  highlight?: string;
}

export interface TechItem {
  name: string;
  category: string;
  iconKey: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface PosterConfig {
  wifi: {
    ssid: string;
    password: string;
    security: 'WPA' | 'WEP' | 'nopass';
    speedDescription: string;
    instruction: string;
  };
  hero: {
    badgeText: string;
    headline: string;
    typewriterWords: string[];
    subtext: string;
  };
  jobs: {
    heading: string;
    subheading: string;
    list: JobOpportunity[];
    howToApplySteps: {
      step: number;
      title: string;
      description: string;
    }[];
  };
  developer: {
    name: string;
    roleTitle: string;
    bio: string;
    photoUrl: string;
    phone: string;
    email: string;
    website: string;
    linkedin: string;
    github: string;
    location: string;
    applyUrl: string;
  };
  skills: {
    heading: string;
    subheading: string;
    items: SkillItem[];
  };
  technologies: {
    heading: string;
    subheading: string;
    items: TechItem[];
  };
  services: {
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  cta: {
    buttonText: string;
    footerText: string;
  };
  theme: {
    electricBlue: string;
    posterNavy: string;
    white: string;
    hotPink: string;
    freshGreen: string;
    tintBlue: string;
    tintPink: string;
    tintGreen: string;
  };
}

export const initialPosterConfig: PosterConfig = {
  // 1. Wi-Fi Access Information
  wifi: {
    ssid: "CYNTHIA_FREE_HIGH_SPEED", // [WIFI_NAME] Placeholder
    password: "No password needed", // [WIFI_PASSWORD] Placeholder
    security: "nopass", // Change to "WPA" if using a password
    speedDescription: "High-Speed 5G Fiber · Unlimited Bandwidth",
    instruction: "Instant connection for visitors, freelancers, and remote workers",
  },

  // 2. Hero Banner Copy
  hero: {
    badgeText: "100% FREE ACCESS",
    headline: "FREE WI-FI",
    typewriterWords: ["Connect.", "Work.", "Earn."],
    subtext: "Get online instantly and discover rewarding online job opportunities.",
  },

  // 3. Online Job Opportunities
  jobs: {
    heading: "Online Job Opportunities",
    subheading: "Verified remote roles & freelance gigs you can start today from right here.",
    list: [
      {
        id: "web-dev",
        title: "Freelance Web Development",
        description: "Build landing pages, frontend interfaces, and business websites for local & international clients.",
        iconName: "Code2",
        payEstimate: "$25 - $65 / hr",
        category: "Engineering",
      },
      {
        id: "va-data",
        title: "Virtual Assistance & Data Entry",
        description: "Provide executive admin support, organize spreadsheets, manage schedules, and process online records.",
        iconName: "Briefcase",
        payEstimate: "$15 - $30 / hr",
        category: "Operations",
      },
      {
        id: "content-social",
        title: "Content Writing & Social Media",
        description: "Write SEO articles, manage LinkedIn & Instagram feeds, and draft engaging marketing copy.",
        iconName: "Globe",
        payEstimate: "$20 - $45 / hr",
        category: "Marketing",
      },
      {
        id: "graphic-design",
        title: "Graphic & Web Design",
        description: "Create brand identities, social media creatives, Figma UI wireframes, and digital marketing banners.",
        iconName: "Laptop",
        payEstimate: "$25 - $50 / hr",
        category: "Design",
      },
      {
        id: "tutoring",
        title: "Online Tutoring & Coaching",
        description: "Teach coding basics, high school subjects, languages, or career skills to students globally.",
        iconName: "Users",
        payEstimate: "$20 - $40 / hr",
        category: "Education",
      },
      {
        id: "customer-support",
        title: "Remote Customer Support",
        description: "Assist app users via live chat, email helpdesks, and ticket resolutions during flexible shifts.",
        iconName: "Clock",
        payEstimate: "$18 - $35 / hr",
        category: "Support",
      },
    ],
    howToApplySteps: [
      {
        step: 1,
        title: "Connect to Wi-Fi",
        description: "Join our free network right now on your phone or laptop.",
      },
      {
        step: 2,
        title: "Scan the QR Code",
        description: "Open your camera to visit our jobs portal or application form.",
      },
      {
        step: 3,
        title: "Apply & Start Earning",
        description: "Submit your basic details and get matched with active gigs.",
      },
    ],
  },

  // 4. About the Developer
  developer: {
    name: "Cynthia Okanda",
    roleTitle: "Software Engineer | Professional Web Developer | Web Designer",
    bio: "I build scalable systems and modern web experiences using new technologies, helping businesses and people get online and grow.",
    photoUrl: "/src/assets/images/cynthia_okanda_portrait_1793965080353.jpg",
    phone: "+254 700 000 000", // [PHONE] Placeholder
    email: "cynthiaokanda123@gmail.com", // [EMAIL]
    website: "https://cynthiaokanda.dev", // [WEBSITE] Placeholder
    linkedin: "https://linkedin.com/in/cynthia-okanda", // [LINKEDIN] Placeholder
    github: "https://github.com/cynthiaokanda", // [GITHUB] Placeholder
    location: "Nairobi, Kenya", // [TOWN/CITY] Placeholder
    applyUrl: "https://cynthiaokanda.dev/jobs-apply", // [WEBSITE or application form] Placeholder
  },

  // 5. Skills & Meters
  skills: {
    heading: "Core Developer Skills",
    subheading: "Proven technical proficiency across modern software engineering and design.",
    items: [
      { name: "Web Development", percentage: 95, highlight: "Full-Stack, React, Next.js, Node.js" },
      { name: "Web & UI/UX Design", percentage: 90, highlight: "Figma, User Flows, Design Systems" },
      { name: "Scalable System Design", percentage: 85, highlight: "Cloud Architecture, Robust APIs" },
      { name: "Responsive / Mobile-First Design", percentage: 90, highlight: "Tailwind CSS, Fluid Layouts" },
      { name: "Problem Solving & Emerging Tech", percentage: 88, highlight: "AI Integration, Cloud Tools" },
    ],
  },

  // 6. Technologies Stack
  technologies: {
    heading: "Technologies I Use",
    subheading: "Production-grade tools, modern frameworks, and cloud developer platforms.",
    items: [
      { name: "HTML5", category: "Core", iconKey: "html5" },
      { name: "CSS3", category: "Styling", iconKey: "css3" },
      { name: "JavaScript", category: "Language", iconKey: "javascript" },
      { name: "TypeScript", category: "Language", iconKey: "typescript" },
      { name: "React", category: "Frontend", iconKey: "react" },
      { name: "Node.js", category: "Backend", iconKey: "nodejs" },
      { name: "Tailwind CSS", category: "Styling", iconKey: "tailwindcss" },
      { name: "Git & GitHub", category: "Version Control", iconKey: "git" },
      { name: "Figma", category: "UI/UX", iconKey: "figma" },
      { name: "REST APIs", category: "Backend", iconKey: "api" },
      { name: "SQL & NoSQL", category: "Databases", iconKey: "database" },
      { name: "Google AI Studio", category: "Emerging Tech", iconKey: "ai" },
    ],
  },

  // 7. Services Offered
  services: {
    heading: "Services I Offer",
    subheading: "Delivering modern digital solutions for businesses, organizations, and entrepreneurs.",
    items: [
      {
        title: "Website Design & Development",
        description: "High-converting, lightning-fast commercial websites crafted with modern typography, SEO optimization, and responsive design.",
        deliverables: ["Custom Branding & UI", "Mobile-Optimized", "Speed & SEO Tuned"],
        iconName: "Globe",
      },
      {
        title: "Web Apps & Systems",
        description: "Custom dashboards, client portals, internal management tools, and database-driven software built for reliability.",
        deliverables: ["Role-Based Auth", "API Integrations", "Database Architecture"],
        iconName: "Laptop",
      },
      {
        title: "UI/UX Design",
        description: "User journey mapping, wireframing, high-fidelity prototypes, and cohesive design systems in Figma ready for development.",
        deliverables: ["Design Systems", "Interactive Prototypes", "Usability Testing"],
        iconName: "Code2",
      },
      {
        title: "Wi-Fi & Online Advertising Solutions",
        description: "Captive portal pages, localized digital advertising boards, and hotspot landing experiences that engage visitors.",
        deliverables: ["Captive Portals", "QR Lead Generation", "Visitor Analytics"],
        iconName: "Wifi",
      },
    ],
  },

  // 8. Call To Action & Footer
  cta: {
    buttonText: "Connect & Apply Now",
    footerText: "Free Wi-Fi • Online Jobs • Built by Cynthia Okanda",
  },

  // 9. Design System Colors
  theme: {
    electricBlue: "#1E5BFF",
    posterNavy: "#0B1F4D",
    white: "#FFFFFF",
    hotPink: "#FF3D9A",
    freshGreen: "#22C55E",
    tintBlue: "#EAF1FF",
    tintPink: "#FFE6F2",
    tintGreen: "#E3F9EA",
  },
};
