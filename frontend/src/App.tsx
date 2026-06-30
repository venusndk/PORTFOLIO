// frontend/src/App.tsx
import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { trackVisit } from './api/visitorApi';

// Show the admin panel when the URL path is /admin
const isAdminRoute = window.location.pathname === '/admin';

const Portfolio: React.FC = () => {
  // Fire tracking beacon once per session on first load
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="pt-20">
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  if (isAdminRoute) return <AdminPanel />;
  return <Portfolio />;
};

export default App;
