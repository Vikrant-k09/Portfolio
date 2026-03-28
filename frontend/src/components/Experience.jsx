import { motion } from 'framer-motion';
import experience from '../data/experience';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Experience() {
  const reveal = useScrollReveal();

  return (
    <section id="experience" className="section-shell">
      <motion.div {...reveal}>
        <p className="section-kicker">Timeline</p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">Experience</h2>
      </motion.div>

      <div className="timeline-line relative mt-14 space-y-8 pl-0">
        {experience.map((entry, index) => (
          <motion.article
            key={`${entry.company}-${entry.duration}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="relative pl-10 sm:pl-14"
          >
            <span className="absolute left-0 top-7 h-6 w-6 rounded-full border border-white bg-[var(--accent-ice-deep)] shadow-soft" />

            <div className="glass-card rounded-[28px] p-7 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl">{entry.company}</h3>
                  <p className="mt-2 text-base font-medium text-[var(--text-secondary)]">
                    {entry.role} · {entry.duration}
                  </p>
                </div>
                <span className="rounded-full bg-[rgba(168,196,216,0.18)] px-4 py-2 text-sm font-medium text-[var(--accent-ice-deep)]">
                  {entry.tag}
                </span>
              </div>

              <ul className="mt-6 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                {entry.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-ice-deep)]" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
