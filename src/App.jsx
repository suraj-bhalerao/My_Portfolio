import React from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Stats from './components/Stats';

function App() {
  const githubUsername = 'suraj-bhalerao';
  const leetcodeUsername = 'SurajB_7176';

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects username={githubUsername} />
      <Stats githubUsername={githubUsername} leetcodeUsername={leetcodeUsername} />
      <Contact />

      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--glass-border)', color: '#888' }}>
        <p>&copy; {new Date().getFullYear()} Suraj Bhalerao. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
