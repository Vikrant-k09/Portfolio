import { siteConfig } from './site';

const projects = [
  {
    slug: 'streamforge',
    title: 'StreamForge',
    tagline: 'Real-Time Event Processing Pipeline',
    highlights: [
      'Kafka + Node.js + PostgreSQL with sub-10ms P99 latency under sustained load.',
      'Async worker pools plus Redis caching for a fault-tolerant producer-consumer architecture.',
      'Docker Compose and Nginx for TLS-aware orchestration across a multi-service stack.'
    ],
    tags: ['Kafka', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
    sourceUrl: siteConfig.profiles.streamForge
  },
  {
    slug: 'droply',
    title: 'Droply',
    tagline: 'Secure File Sharing Platform',
    highlights: [
      'MERN-based encrypted transfers delivered through expiring shareable links.',
      'Chunked streaming uploads with Multer + Express.js supporting files up to 50MB.',
      'JWT auth, rate limiting, and GitHub Actions CI/CD powering Vercel deployments.'
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'GitHub Actions', 'Vercel'],
    sourceUrl: siteConfig.profiles.droply
  }
];

export default projects;
