import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { staggerContainer, staggerItem } from '../hooks/useScrollReveal';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-4 transition duration-300 sm:px-6 ${
            isScrolled
              ? 'border border-[var(--border)] bg-[rgba(248,249,250,0.85)] shadow-soft backdrop-blur-xl'
              : 'bg-transparent'
          }`}
        >
          <a href="#hero" className="font-display text-3xl text-[var(--accent-ice-deep)]">
            V.
          </a>

          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="hidden items-center gap-2 md:flex"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                variants={staggerItem}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] transition hover:bg-white/70 hover:text-[var(--text-primary)]"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>

          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.96 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 text-[var(--text-primary)] md:hidden"
            aria-label="Open navigation menu"
          >
            <HiOutlineMenuAlt3 size={20} />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[rgba(28,34,38,0.22)] backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-[60] flex h-full w-[min(86vw,360px)] flex-col border-l border-[var(--border)] bg-[rgba(248,249,250,0.95)] px-6 py-6 shadow-lift backdrop-blur-2xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-[var(--accent-ice-deep)]">V.</span>
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--text-primary)]"
                  aria-label="Close navigation menu"
                >
                  <HiX size={20} />
                </motion.button>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-12 flex flex-col gap-3"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    variants={staggerItem}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card rounded-[24px] px-5 py-4 text-base text-[var(--text-primary)]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
