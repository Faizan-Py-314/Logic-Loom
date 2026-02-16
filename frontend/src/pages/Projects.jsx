import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectsData } from '../api'

const Projects = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await ProjectsData()

      setProjects(data.projectsData)
    }

    loadData()
  }, [])
  
  const allProjects = projects
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Filter projects based on search
  const filteredProjects = allProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] text-[#e0e0ff] font-sans">
      
      <nav className="fixed inset-x-0 top-0 z-50 h-14 md:h-16 backdrop-blur-xl bg-black/35 border-b border-neon-purple/15 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
        <div className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold bg-linear-to-r from-neon-green via-neon-purple to-neon-cyan bg-clip-text text-transparent">logic.loom</div>

        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm md:text-base font-medium">
          <Link to="/" className="text-[#c4b5fd] hover:text-white transition-colors">Home</Link>
          <Link to="/projects" className="text-white font-semibold">Projects</Link>
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

      
      <div className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none' }`} onClick={toggleMenu} >

        <div className="flex flex-col items-center justify-center h-full space-y-10 text-2xl font-medium" onClick={(e) => e.stopPropagation()}>
          <Link to="/" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" className="text-white font-semibold" onClick={toggleMenu}>Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Blogs</Link>
          <Link to="templates" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Templates</Link>
          <Link to="contact" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>

      <main className="pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 lg:mb-16 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-san font-extrabold bg-linear-to-r from-white via-[#d0d0ff] to-[#c7d2fe] bg-clip-text text-transparent leading-tight">Projects</h1>
          <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-[#a0a0ff] font-light max-w-3xl mx-auto md:mx-0">Some of the things I've built — from APIs to interactive experiences</p>

          <div className="mt-8 md:mt-10 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search projects by title, description or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/30 backdrop-blur-md border border-neon-purple/30 rounded-full text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple/70 focus:ring-2 focus:ring-neon-purple/30 transition-all text-base md:text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-black/20 backdrop-blur-xl border border-neon-purple/20 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 transition-all duration-300 hover:border-neon-purple/60 hover:shadow-xl hover:shadow-neon-purple/20 hover:-translate-y-2 flex flex-col"
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-san font-bold text-white mb-3 md:mb-4">
                  {project.title}
                </h3>

                <p className="text-[#b0b0ff] text-sm md:text-base leading-relaxed mb-4 md:mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-2.5 mb-4 md:mb-5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-xs md:text-sm text-[#c4b5fd] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/project/${encodeURIComponent(project.link)}`}
                  className="inline-flex items-center gap-2 text-neon-purple hover:text-white transition-colors font-medium text-sm md:text-base group-hover:translate-x-1.5 duration-300 mt-auto"
                >
                  View Source →
                  <span>→</span>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-[#a0a0ff] text-lg md:text-xl"> No projects found matching "{searchQuery}" </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;