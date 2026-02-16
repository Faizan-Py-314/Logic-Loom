import { useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioDesktop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-[#0f0f17] to-[#131324] text-[#e0e0ff] font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 h-14 md:h-16 backdrop-blur-xl bg-black/35 border-b border-neon-purple/15 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
        <div
          className="text-2xl md:text-3xl font-mono font-semibold inline-block"
          style={{
            background: 'linear-gradient(to right, #4ade80, #a78bfa, #7dd3fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>logic.loom </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-base md:text-lg font-medium">
          <Link to="/" className="text-white font-semibold hover:text-white transition-colors">Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors">Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors">Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors">Templates</Link>
          <Link to="/contact" className="text-[#c4b5fd] hover:text-white transition-colors">Contact</Link>
        </div>

        <button className="md:hidden text-[#c4b5fd] focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu" >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      <div className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none' }`} onClick={toggleMenu} >
        <div className="flex flex-col items-center justify-center h-full space-y-10 text-2xl font-medium"
          onClick={(e) => e.stopPropagation()} >
          <Link to="/" className="text-white font-semibold" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Templates</Link>
          <Link to="/contact" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 max-w-400 mx-auto px-8 md:px-20 pt-24 pb-16 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1
            className="text-6xl lg:text-8xl xl:text-9xl font-sans font-extrabold leading-[0.85] inline-block"
            style={{
              background: 'linear-gradient(to bottom right, #c084fc, #a78bfa, #7dd3fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >LOGIC<br/>LOOM</h1>
          <p className="text-lg md:text-xl font-mono text-neon-purple/80">// Python • FastAPI • Web • Games • Interactive Experiences </p>
        </div>

        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-linear-to-b from-white via-[#d0d0ff] to-[#c7d2fe] bg-clip-text text-transparent">Code better.<br/>Build louder.</h2>
          <p className="text-base lg:text-lg text-[#b0b0ff] max-w-xl mx-auto leading-relaxed">Raw code templates, project breakdowns, dev blogs & ready-to-fork starters. No fluff — just working signal.</p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
            <Link to="/projects" className="px-8 py-3.5 bg-linear-to-r from-[#8b5cf6] to-neon-purple text-white font-mono font-medium rounded-full shadow-lg hover:scale-105 transition text-base" >Explore Projects →</Link>
            <Link to="/templates" className="px-8 py-3.5 border-2 border-neon-purple/50 text-neon-purple font-mono font-medium rounded-full hover:bg-neon-purple/10 transition text-base">View Templates</Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-mono font-semibold text-neon-purple mb-3">// Projects</h3>
            <p className="text-[#b0b0ff]/90 text-sm lg:text-base">FastAPI apps, chat systems, games — real code that runs.</p>
          </div>
          <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-mono font-semibold text-neon-purple mb-3">// Blogs</h3>
            <p className="text-[#b0b0ff]/90 text-sm lg:text-base">Auth flows, schemas, Python tricks & architecture notes.</p>
          </div>
          <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-mono font-semibold text-neon-purple mb-3">// Templates</h3>
            <p className="text-[#b0b0ff]/90 text-sm lg:text-base">Fork-ready starters: APIs, auth, frontends & more.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDesktop;