import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MountainCanvas from './MountainCanvas';

const aboutVars = {
  '--bg': '#F6F8FA',
  '--card': '#FFFFFF',
  '--border': '#E0E8EE',
  '--border-light': '#DDE8EF',
  '--accent': '#5B9AB5',
  '--accent-muted': '#8AACBE',
  '--text-primary': '#1A2228',
  '--text-body': '#344350',
  '--text-secondary': '#4A5A66',
  '--text-muted': '#8A9EAC',
  '--frame-border': '#C8D8E2'
};

const rightNowRows = [
  {
    label: 'Building data platforms at MAQ Software',
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="12" height="12" rx="3" stroke="#5B9AB5" strokeWidth="1.2" />
        <path d="M8 5V11" stroke="#5B9AB5" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5 8H11" stroke="#5B9AB5" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    label: 'Weekends: vibe coding & going down ML rabbit holes',
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="5.5" stroke="#5B9AB5" strokeWidth="1.2" />
        <path d="M8 5.3V8.2L10 9.7" stroke="#5B9AB5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    label: 'Planning the next trek back home',
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.4 12.2L6.8 5.5L9.2 8.7L11 6.4L13.6 12.2" stroke="#5B9AB5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

const stats = [
  { number: '9.08', suffix: '/10', label: 'CGPA · NIT Hamirpur' },
  { number: '1k', suffix: '+', label: 'Snowflake app users' },
  { number: '60', suffix: '%', label: 'Faster pipeline onboarding' }
];

function PhotoFrame() {
  const [hasAvatar, setHasAvatar] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = '/avatar.jpg';
    image.onload = () => setHasAvatar(true);
    image.onerror = () => setHasAvatar(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-60px' }}
      className="relative w-full overflow-hidden border border-[var(--frame-border)] bg-[var(--card)] md:aspect-[3/4] aspect-[4/3]"
      style={{ borderRadius: '4px 24px 4px 24px' }}
    >
      {hasAvatar ? (
        <img
          src="/avatar.jpg"
          alt="Vikrant portrait"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'top center' }}
        />
      ) : (
        <MountainCanvas />
      )}

      <div className="absolute bottom-4 left-4 right-4 rounded-[10px] border border-[rgba(200,218,230,0.6)] bg-[rgba(255,255,255,0.82)] px-[14px] py-[11px] backdrop-blur-[10px]">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [0.55, 1, 0.55], scale: [0.92, 1.12, 0.92] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-[7px] w-[7px] rounded-full bg-[var(--accent)]"
          />
          <div>
            <p className="text-[13px] font-medium text-[#2E4A58]">Himachal Pradesh, India</p>
            <p className="text-[11px] text-[#7A9BAC]">Where the thinking happens</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RightNowCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-60px' }}
      className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] px-[18px] py-4"
    >
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[2.5px] text-[var(--accent-muted)]">
        Right Now
      </p>

      {rightNowRows.map((row, index) => (
        <div
          key={row.label}
          className={`flex items-start gap-[9px] py-[6px] ${
            index < rightNowRows.length - 1 ? 'border-b border-[#F0F4F7]' : ''
          }`}
        >
          {row.icon}
          <p className="text-[13px] font-light leading-[1.45] text-[#3A4A56]">{row.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" style={aboutVars}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-[52px] md:py-[72px]">
        <div className="grid items-start gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-[60px]">
          <div className="flex flex-col gap-[14px]">
            <PhotoFrame />
            <RightNowCard />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="mb-4 flex items-center gap-[10px]">
              <div className="h-px w-[22px] bg-[var(--accent)] opacity-70" />
              <span className="text-[10px] font-medium uppercase tracking-[3px] text-[var(--accent-muted)]">
                About
              </span>
            </div>

            <h2 className="mb-7 max-w-[12ch] font-display text-[40px] font-bold leading-[1.06] tracking-[-1.5px] text-[var(--text-primary)] md:text-[48px]">
              From the mountains,
              <br />
              into <em className="font-normal text-[var(--accent)]">the systems.</em>
            </h2>

            <p className="mb-6 max-w-3xl text-[16px] font-light leading-[1.8] text-[var(--text-body)]">
              I&apos;m Vikrant — grew up in <strong className="font-medium text-[var(--text-primary)]">Himachal Pradesh</strong>, now building at <strong className="font-medium text-[var(--text-primary)]">MAQ Software</strong>. Growing up around mountains gives you a certain patience. An instinct for things that are calm on the surface, solid underneath. That&apos;s what I try to build.
            </p>

            <div className="mb-7 grid overflow-hidden rounded-[14px] border border-[var(--border-light)] bg-[var(--border-light)] md:grid-cols-2 gap-px">
              <div className="bg-[var(--card)] px-5 py-[18px]">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[2.5px] text-[var(--accent-muted)]">
                  At Work
                </p>
                <p className="text-[13.5px] font-light leading-[1.72] text-[var(--text-secondary)]">
                  Scalable pipelines, serverless apps on{' '}
                  <strong className="font-medium text-[#2A3840]">Azure &amp; Snowflake</strong>. I
                  like the part where infrastructure actually matters to the product.
                </p>
              </div>

              <div className="bg-[var(--card)] px-5 py-[18px]">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[2.5px] text-[var(--accent-muted)]">
                  Off The Clock
                </p>
                <p className="text-[13.5px] font-light leading-[1.72] text-[var(--text-secondary)]">
                  Side projects, <strong className="font-medium text-[#2A3840]">ML experiments</strong>,
                  web dev for fun. And whenever I can — back on a trail, no deadlines, just altitude.
                </p>
              </div>
            </div>

            <div className="mb-6 h-[1.5px] w-8 bg-[var(--accent)] opacity-45" />

            <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-60px' }}
                  className={`flex h-full flex-col rounded-[12px] border border-[var(--border)] bg-[var(--card)] px-4 py-[14px] ${
                    index === 2 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <div className="mb-[5px] flex min-h-[32px] items-start gap-1">
                    <span className="font-display text-[26px] font-bold leading-none tabular-nums text-[var(--text-primary)]">
                      {stat.number}
                    </span>
                    <span className="pt-[1px] font-body text-[12px] font-medium leading-none text-[var(--accent)]">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-[11px] font-normal leading-[1.4] text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
