import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getProjectBySlug, getBlogBySlug, getTemplateBySlug } from '../api';
import CodeBlock from '../components/CodeBlock'
import ImageRenderer from '../components/ImageRenderer'

const ContentView = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const type = pathname.split('/')[1]; // 'project', 'blog', or 'template'
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type || !slug) {
      setError('Invalid URL');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (type === 'project') {
          data = await getProjectBySlug(decodeURIComponent(slug));
        } else if (type === 'blog') {
          data = await getBlogBySlug(decodeURIComponent(slug));
        } else if (type === 'template') {
          data = await getTemplateBySlug(decodeURIComponent(slug));
        } else {
          setError('Invalid content type');
          return;
        }
        setItem(data);
      } catch (err) {
        setError(err?.response?.status === 404 ? 'Content not found' : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, slug]);

  const backLinks = {
    project: { to: '/projects', label: '← Back to Projects' },
    blog: { to: '/blogs', label: '← Back to Blogs' },
    template: { to: '/templates', label: '← Back to Templates' },
  };
  const back = backLinks[type] || { to: '/', label: '← Back to Home' };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] flex items-center justify-center">
        <p className="text-[#c4b5fd] text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-red-400 text-lg">{error || 'Content not found'}</p>
        <Link
          to={back.to}
          className="px-6 py-3 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple rounded-xl hover:bg-neon-purple/30 transition"
        >
          {back.label}
        </Link>
      </div>
    );
  }

  const formatDate = (d) => {
    if (!d) return '';
    try {
      const date = typeof d === 'string' ? new Date(d) : d;
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] text-[#e0e0ff] font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 h-14 md:h-16 backdrop-blur-xl bg-black/35 border-b border-neon-purple/15 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold bg-linear-to-r from-neon-green via-neon-purple to-neon-cyan bg-clip-text text-transparent">
          logic.loom
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm md:text-base font-medium">
          <Link to="/" className="text-[#c4b5fd] hover:text-white transition-colors">Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors">Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors">Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors">Templates</Link>
          <Link to="/contact" className="text-[#c4b5fd] hover:text-white transition-colors">Contact</Link>
        </div>

        <button className="md:hidden text-[#c4b5fd] focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </nav>

      <div className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} onClick={toggleMenu}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 text-2xl font-medium" onClick={(e) => e.stopPropagation()}>
          <Link to="/" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Templates</Link>
          <Link to="/contact" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>

      <main className="pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-[min(80rem,95vw)] mx-auto">
        <Link
          to={back.to}
          className="inline-block text-neon-purple hover:text-white transition-colors font-medium mb-8"
        >
          {back.label}
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {item.title}
          </h1>
          <p className="text-[#b0b0ff] text-lg">
            {item.description || item.excerpt}
          </p>
          {item.technologies && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-sm text-[#c4b5fd] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {item.template_type && (
            <span className="inline-block mt-4 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full text-sm text-neon-cyan font-mono">
              {item.template_type}
            </span>
          )}
          {(item.date || item.features) && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#a0a0ff]">
              {item.date && <span>{formatDate(item.date)}</span>}
              {item.downloadLink && (
                <a
                  href={item.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-purple hover:text-white transition-colors"
                >
                  Download →
                </a>
              )}
            </div>
          )}
        </header>

        <article className="prose-content text-[#e0e0ff] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-[#d0d0ff] [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-[#b0b0ff] [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-4 [&_ul]:text-[#b0b0ff] [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-4 [&_ol]:text-[#b0b0ff] [&_code]:bg-[#1e1e2e] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-neon-cyan [&_code]:text-sm [&_.code-block-wrapper>div]:overflow-auto! [&_.code-block-wrapper>div]:max-h-none! [&_a]:text-neon-purple [&_a]:hover:text-white [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-neon-purple/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#a0a0ff]">
          <ReactMarkdown
            components={{
              img:ImageRenderer,
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CodeBlock language={match[1]}>{children}</CodeBlock>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            // components={{}}
          >
            {item.content || '*No content available.*'}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
};

export default ContentView;

