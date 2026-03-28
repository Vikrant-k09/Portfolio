const fallbackProfiles = {
  github: 'https://github.com/vikrant905',
  linkedin: 'https://www.linkedin.com/in/vikrant905/',
  resume: 'https://example.com/resume.pdf',
  streamForge: 'https://github.com/vikrant905/streamforge',
  droply: 'https://github.com/vikrant905/droply'
};

export const siteConfig = {
  name: 'Vikrant',
  tagline: 'Software Engineer · Dharamshala, HP',
  subtitle: 'Building distributed systems · Passionate about mountains & clean code',
  email: 'vik.t.905@gmail.com',
  phone: '+91 8894538942',
  location: 'Dharamshala, HP / Delhi NCR',
  profiles: {
    github: import.meta.env.VITE_GITHUB_URL || fallbackProfiles.github,
    linkedin: import.meta.env.VITE_LINKEDIN_URL || fallbackProfiles.linkedin,
    resume: import.meta.env.VITE_RESUME_URL || fallbackProfiles.resume,
    streamForge: import.meta.env.VITE_STREAMFORGE_SOURCE_URL || fallbackProfiles.streamForge,
    droply: import.meta.env.VITE_DROPLY_SOURCE_URL || fallbackProfiles.droply
  }
};
