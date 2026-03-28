import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import projects from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';

function StreamForgeDiagram() {
  return (
    <svg viewBox="0 0 440 230" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="88" width="88" height="54" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <rect x="136" y="88" width="78" height="54" rx="16" fill="rgba(168,196,216,0.18)" stroke="#5B8FA8" />
      <rect x="244" y="88" width="104" height="54" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <rect x="272" y="162" width="76" height="42" rx="14" fill="rgba(168,196,216,0.16)" stroke="#5B8FA8" />
      <rect x="364" y="88" width="58" height="54" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <text x="62" y="120" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Producer</text>
      <text x="175" y="120" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Kafka</text>
      <text x="296" y="113" textAnchor="middle" fontSize="14" fill="#1C2226" fontFamily="DM Sans">Consumer</text>
      <text x="296" y="132" textAnchor="middle" fontSize="14" fill="#1C2226" fontFamily="DM Sans">Pool</text>
      <text x="310" y="188" textAnchor="middle" fontSize="14" fill="#1C2226" fontFamily="DM Sans">Redis</text>
      <text x="393" y="120" textAnchor="middle" fontSize="14" fill="#1C2226" fontFamily="DM Sans">Postgres</text>
      <path d="M106 115H136" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M214 115H244" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M348 115H364" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M296 142V162" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M128 49C176 18 243 18 310 44C358 64 396 72 422 66" stroke="rgba(91,143,168,0.35)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function DroplyDiagram() {
  return (
    <svg viewBox="0 0 440 230" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="92" width="86" height="52" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <rect x="136" y="92" width="96" height="52" rx="16" fill="rgba(168,196,216,0.18)" stroke="#5B8FA8" />
      <rect x="260" y="92" width="74" height="52" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <rect x="360" y="92" width="56" height="52" rx="16" fill="rgba(255,255,255,0.92)" stroke="#D6DDE5" />
      <rect x="158" y="28" width="86" height="42" rx="14" fill="rgba(168,196,216,0.16)" stroke="#5B8FA8" />
      <text x="65" y="124" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Client</text>
      <text x="184" y="124" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Express API</text>
      <text x="297" y="124" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Multer</text>
      <text x="388" y="124" textAnchor="middle" fontSize="15" fill="#1C2226" fontFamily="DM Sans">Storage</text>
      <text x="201" y="54" textAnchor="middle" fontSize="14" fill="#1C2226" fontFamily="DM Sans">JWT Auth</text>
      <path d="M108 118H136" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M232 118H260" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M334 118H360" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M201 70V92" stroke="#5B8FA8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 188C112 160 178 162 246 182C304 198 358 196 414 172" stroke="rgba(91,143,168,0.35)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function ArchitectureDiagram({ slug }) {
  return slug === 'streamforge' ? <StreamForgeDiagram /> : <DroplyDiagram />;
}

export default function Projects() {
  const reveal = useScrollReveal();

  return (
    <section id="projects" className="section-shell">
      <motion.div {...reveal}>
        <p className="section-kicker">Selected Work</p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">Projects</h2>
      </motion.div>

      <div className="mt-14 space-y-10">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
            className="grid gap-8 rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] p-8 shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:p-10"
          >
            <div className="flex flex-col justify-between">
              <div>
                <p className="section-kicker">{project.tagline}</p>
                <h3 className="mt-4 font-display text-3xl">{project.title}</h3>
                <ul className="mt-6 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-ice-deep)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[rgba(168,196,216,0.18)] px-4 py-2 text-sm font-medium text-[var(--accent-ice-deep)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-ice-deep)]"
              >
                Source Code <FiArrowUpRight />
              </motion.a>
            </div>

            <div className="glass-card flex min-h-[260px] items-center rounded-[26px] p-4 shadow-soft">
              <ArchitectureDiagram slug={project.slug} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
