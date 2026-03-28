import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { siteConfig } from '../data/site';

const HeroArtwork = lazy(() => import('./HeroArtwork'));

const letters = siteConfig.name.split('');
const heroPills = ['Distributed Systems', 'Data Platforms', 'Calm Interfaces'];

const socials = [
  { label: 'GitHub', href: siteConfig.profiles.github, icon: FaGithub },
  { label: 'LinkedIn', href: siteConfig.profiles.linkedin, icon: FaLinkedinIn }
];

function HeroArtworkFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#edf5fa_0%,#f3f8fb_52%,#f8f9fa_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.95),transparent_22%),linear-gradient(90deg,rgba(248,249,250,0.96),rgba(248,249,250,0.56),rgba(248,249,250,0))]" />
      <div className="absolute right-[8%] top-[18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(180,218,233,0.32),transparent_72%)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-[-12%] h-[46%] bg-[radial-gradient(ellipse_at_bottom,rgba(248,249,250,0.98),rgba(248,249,250,0.72)_34%,rgba(248,249,250,0)_72%)]" />
    </div>
  );
}

export default function HeroScene() {
  return (
    <section id="hero" className="hero-topography relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={<HeroArtworkFallback />}>
          <HeroArtwork className="absolute inset-0 h-full w-full" />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,249,250,0.98)_0%,rgba(248,249,250,0.95)_30%,rgba(248,249,250,0.82)_48%,rgba(248,249,250,0.42)_64%,rgba(248,249,250,0.08)_82%,rgba(248,249,250,0)_100%)]" />

      <div className="section-shell relative z-10 flex min-h-screen items-center pt-32 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="section-kicker">Software Engineer · Dharamshala, HP</p>
          <div className="mt-5 flex flex-wrap text-[clamp(3.8rem,10vw,5rem)] leading-none tracking-[-0.04em] text-[var(--text-primary)]">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.56, delay: 0.15 + index * 0.08, ease: 'easeOut' }}
                className="font-display"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl"
          >
            {siteConfig.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {heroPills.map((pill) => (
              <motion.span
                key={pill}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-hover)' }}
                className="glass-card rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] shadow-soft"
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: 'easeOut' }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="button-primary inline-flex"
            >
              View Projects
            </motion.a>
            <motion.a
              href={siteConfig.profiles.resume}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="button-secondary inline-flex"
            >
              Resume ↗
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm text-[var(--text-secondary)] shadow-soft"
              >
                <Icon className="text-[var(--accent-ice-deep)]" />
                {label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
