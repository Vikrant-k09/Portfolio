import { useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import { siteConfig } from '../data/site';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const links = [
  { label: 'GitHub', href: siteConfig.profiles.github, icon: FaGithub },
  { label: 'LinkedIn', href: siteConfig.profiles.linkedin, icon: FaLinkedinIn }
];

const contactChips = [
  { label: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: FiMail },
  { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`, icon: FiPhone },
  { label: siteConfig.location, href: '#contact', icon: FiMapPin }
];

const initialForm = {
  name: '',
  email: '',
  message: ''
};

export default function Contact() {
  const reveal = useScrollReveal();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill out your name, email, and message.' });
      return;
    }

    if (formData.message.trim().length > 2000) {
      setStatus({ type: 'error', message: 'Message must be 2000 characters or fewer.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await apiClient.post('/contact', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      setFormData(initialForm);
      setStatus({
        type: 'success',
        message: "Message sent! I'll get back to you."
      });
    } catch (error) {
      const isNetworkError = error.code === 'ERR_NETWORK' || !error.response;

      setStatus({
        type: 'error',
        message: isNetworkError
          ? 'Contact service is unreachable. Make sure the backend is running and restart dev after changing the API port.'
          : error.response?.data?.message ||
            'Something went wrong while sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Contact</p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">Let&apos;s Talk</h2>
        <p className="mt-5 text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
          Whether it&apos;s a role, a project, or just to talk about the mountains.
        </p>
      </motion.div>

      <motion.div
        {...useScrollReveal({ delay: 0.1 })}
        className="mx-auto mt-12 max-w-3xl rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-soft sm:p-10"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-left">
              <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-shell"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="block text-left">
              <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-shell"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="block text-left">
            <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              maxLength={2000}
              className="input-shell min-h-[180px] resize-y"
              placeholder="Tell me a little about what you have in mind."
            />
            <span className="mt-2 block text-right text-xs text-[var(--text-muted)]">
              {formData.message.length}/2000
            </span>
          </label>

          <motion.button
            type="submit"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="button-primary inline-flex w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {status.type !== 'idle' && (
            <motion.div
              key={status.type}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`mt-6 flex items-center gap-3 rounded-[22px] px-4 py-4 text-left ${
                status.type === 'success'
                  ? 'bg-[rgba(168,196,216,0.18)] text-[var(--accent-ice-deep)]'
                  : 'bg-[rgba(220,38,38,0.08)] text-[#b42318]'
              }`}
            >
              {status.type === 'success' ? <FiCheckCircle size={20} /> : <span>!</span>}
              <span className="text-sm font-medium">{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {contactChips.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card inline-flex items-center gap-3 rounded-full px-4 py-3 text-sm text-[var(--text-secondary)]"
            >
              <Icon className="text-[var(--accent-ice-deep)]" />
              {label}
            </motion.a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {links.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]"
            >
              <span className="inline-flex items-center gap-3">
                <Icon className="text-[var(--accent-ice-deep)]" />
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
