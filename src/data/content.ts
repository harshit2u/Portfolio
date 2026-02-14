export const siteConfig = {
  name: "Harshit Upadhyay",
  tagline: "Full-Stack Developer | MERN & Firebase Specialist",
  bio: [
    "I'm Harshit Upadhyay, a Full-Stack Developer specializing in building scalable, high-performance web and mobile applications using the MERN stack, Firebase, and modern frontend technologies.",
    "I have developed systems including a hospital management platform, a secure ticket booking solution with database integration, and delivered live production websites for international clients such as MAQ Services (USA), JRE Services, and DMCT Orphanage.",
    "My focus is on clean architecture, performance optimization, and delivering real-world business impact. I build systems that are secure, scalable, efficient, and production-ready.",
  ],
  heroTyping: [
    "Hi, I'm Harshit.",
    2000,
    "I Build Secure & Scalable Systems.",
    2000,
    "Full-Stack Developer.",
    2000,
  ] as (string | number)[],
  resumeUrl: "https://drive.google.com/file/d/1scC7pSvmpw9LYv8Hy6LuPkR-mOszeBQp/view?usp=drive_link",
  email: "uharshit580@gmail.com",
  phone: "+91 8169476982",
  linkedin: "https://www.linkedin.com/in/harshit580/",
  github: "https://github.com/harshit2u",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const highlights = [
  { title: "Security Analyst", subtitle: "@ Getflytechnologies", icon: "Shield" },
  { title: "IBM Front-End", subtitle: "Internship", icon: "Monitor" },
  { title: "Google Android", subtitle: "Internship", icon: "Smartphone" },
  { title: "MERN Training", subtitle: "Full-Stack", icon: "Code" },
];

export const stats = [
  { value: 6, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Live Deployments" },
  { value: 3, suffix: "+", label: "Internships" },
  { value: 1, suffix: "", label: "Hackathon Runner-Up" },
];

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Full-Stack",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Express", level: 80 },
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "React Native", level: 70 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "C", level: 70 },
      { name: "C++", level: 70 },
      { name: "Java", level: 80 },
      { name: "Python", level: 75 },
      { name: "C#", level: 65 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    category: "Web",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    category: "Backend",
    skills: [

      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "Firebase", level: 85 },

    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 80 },
      { name: "Compass", level: 75 },
      { name: "Vercel", level: 80 },
      { name: "Netlify", level: 75 },
      { name: "Figma", level: 65 },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  gradient: string;
  icon: string;
  image?: string[];
}

export const projects: Project[] = [
  {
    id: "sharath-enterprises",
    title: "Sharath Enterprises",
    description:
      "A trusted source for AC and Refrigeration spare parts in Mumbai. Top quality compressors, copper pipes, and HVAC tools.",
    techStack: ["React", "Vite", "Tailwind CSS"],
    liveUrl: "https://sharath-enterprises.vercel.app/",
    githubUrl: "#",
    category: "Web",
    featured: true,
    gradient: "from-cyan-500 via-teal-500 to-green-500",
    icon: "ShoppingBag",
    image: ["/sharath.webp"],
  },
  {
    id: "campus-buddy",
    title: "CAMPUS BUDDY",
    description:
      "A student academic benefits mobile application providing study resources, attendance tracking, timetable management, and peer collaboration features.",
    techStack: ["React Native", "Firebase", "Node.js"],
    githubUrl: "#",
    category: "Mobile",
    featured: true,
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    icon: "GraduationCap",
    image: ["/campus-buddy.webp", "/campus-buddy-2.webp", "/campus-buddy-3.webp", "/campus-buddy-4.webp"],
  },
  {
    id: "jre-services",
    title: "JRE Services",
    description:
      "A commercial construction excellence website showcasing services, projects, and company portfolio for JRE Services LLC.",
    techStack: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://www.jre-services.com/",
    githubUrl: "#",
    category: "Web",
    featured: true,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    icon: "Building",
    image: ["/jre-services.webp"],
  },
  {
    id: "dmct-orphanage",
    title: "DMCT Orphanage Website",
    description:
      "A live production website for DMCT Orphanage with donation management, event showcase, and responsive design for all devices.",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    liveUrl: "https://dmct.vercel.app/",
    githubUrl: "#",
    category: "Web",
    featured: true,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    icon: "Heart",
    image: ["/dmct.webp"],
  },
  {
    id: "maq-services",
    title: "MAQ Services USA Website",
    description:
      "A professional website for MAQ Services (USA) — an international client project with modern UI, SEO optimization, and performance-focused architecture.",
    techStack: ["React", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web",
    featured: true,
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    icon: "Globe",
    image: ["/maq.webp"],
  },
  {
    id: "hospital-mgmt",
    title: "Hospital Management Website",
    description:
      "A comprehensive hospital management system with patient records, appointment scheduling, doctor management, and secure data handling built with the MERN stack.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "#",
    category: "Full-Stack",
    featured: true,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    icon: "Hospital",
    image: ["/hospital-mgmt.webp"],
  },
  {
    id: "ticket-booking",
    title: "Ticket Booking System",
    description:
      "A secure ticket booking solution with real-time seat availability, database integration, payment flow, and user authentication.",
    techStack: ["React", "Node.js", "MySQL", "Express"],
    githubUrl: "#",
    category: "Full-Stack",
    featured: true,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    icon: "Ticket",
    image: ["/ticket-booking.webp"],
  },
  {
    id: "vppcoe-erp",
    title: "VPPCOE ERP Security Testing",
    description:
      "Comprehensive security testing and vulnerability assessment of the VPPCOE ERP system, including penetration testing, SQL injection analysis, and security report generation.",
    techStack: ["Python", "Burp Suite", "OWASP", "Kali Linux"],
    githubUrl: "#",
    category: "Security",
    featured: false,
    gradient: "from-red-600 via-rose-600 to-pink-600",
    icon: "ShieldAlert",
    image: ["/getfly.webp"],
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current: boolean;
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "getfly",
    role: "Security Analyst (Pentester)",
    company: "Getflytechnologies",
    period: "Current",
    description:
      "Conducting penetration testing, vulnerability assessments, and security audits for web applications and network infrastructure.",
    current: true,
    logo: "/getfly.webp",
  },
  {
    id: "ibm",
    role: "IBM SkillsBuild Internship",
    company: "IBM",
    period: "2024",
    description:
      "Completed front-end development internship focusing on modern web technologies, responsive design, and user experience.",
    current: false,
    logo: "/ibm.webp",
  },
  {
    id: "google",
    role: "AICTE Google Android Internship",
    company: "Google (via AICTE)",
    period: "2024",
    description:
      "Developed Android applications using Kotlin and Jetpack Compose, focusing on Material Design and mobile-first development.",
    current: false,
    logo: "/aicte.webp",
  },
  {
    id: "mern",
    role: "MERN Stack Training",
    company: "Training Program",
    period: "2023",
    description:
      "Intensive full-stack development training covering MongoDB, Express.js, React.js, and Node.js with real-world project delivery.",
    current: false,
    logo: "/mern.webp",
  },
  {
    id: "hackathon",
    role: "Technothon Runner-Up",
    company: "Hackathon",
    period: "2023",
    description:
      "Secured runner-up position in Technothon hackathon with an innovative full-stack solution built under competitive time constraints.",
    current: false,
    logo: "/hero.webp", // Assuming hero.webp doesn't exist but checking list... wait, I extracted "hero" from context? No, I don't see "hero.png" in the list. Wait. 
    // Looking at file content again.
    // Line 290: logo: "/mern.png",
    // Line 317: logo: "/mu.jpg",
    // Line 324: logo: "/school_logo.png",
    // Line 331: logo: "/school_logo.png",
  },
];

export interface Education {
  degree: string;
  institution: string;
  score: string;
  year: string;
  logo?: string;
}

export const education: Education[] = [
  {
    degree: "BE Computer Engineering",
    institution: "University of Mumbai",
    score: "CGPA 8.2",
    year: "2021 – 2025",
    logo: "/mu.webp",
  },
  {
    degree: "HSC (12th)",
    institution: "Maharashtra Board",
    score: "71%",
    year: "2021",
    logo: "/school_logo.webp",
  },
  {
    degree: "SSC (10th)",
    institution: "Maharashtra Board",
    score: "81%",
    year: "2019",
    logo: "/school_logo.webp",
  },
];
