export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export default function useScrollReveal({ delay = 0, duration = 0.6 } = {}) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: 'easeOut' },
    viewport: { once: true, margin: '-80px' }
  };
}
