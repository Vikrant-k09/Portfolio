import { motion } from 'framer-motion';
import skillGroups from '../data/skills';
import useScrollReveal, { staggerContainer, staggerItem } from '../hooks/useScrollReveal';

export default function Skills() {
  const reveal = useScrollReveal();

  return (
    <section id="skills" className="section-shell">
      <motion.div {...reveal}>
        <p className="section-kicker">Toolkit</p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">Technical Skills</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        {skillGroups.map((group) => (
          <motion.article
            key={group.category}
            variants={staggerItem}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
            className="glass-card rounded-[28px] p-6 shadow-soft"
          >
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent-ice-deep)]">
              {group.category}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--text-secondary)]"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
