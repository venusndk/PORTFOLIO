// frontend/src/App.tsx
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
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

export default App;
