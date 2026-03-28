import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === '/') {
        window.scrollTo(0, 0);
      }

      return;
    }

    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <HeroScene />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-6 text-center text-[var(--text-primary)]">
      <div className="glass-card max-w-xl rounded-[28px] p-10 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]">404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">This trail fades into mist.</h1>
        <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
          The page you were looking for is not here, but the portfolio is just one step back down
          the ridge.
        </p>
        <Link to="/" className="button-primary mt-8 inline-flex">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
