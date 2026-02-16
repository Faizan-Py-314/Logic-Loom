import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendMessage } from '../api';

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await sendMessage(formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thanks! Your message has been sent.');
    } catch (err) {
      setSubmitError(err?.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] text-[#e0e0ff] font-sans">
      <nav className="fixed inset-x-0 top-0 z-50 h-14 md:h-16 backdrop-blur-xl bg-black/35 border-b border-neon-purple/15 px-4 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between">
      <div className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold bg-linear-to-r from-neon-green via-neon-purple to-neon-cyan bg-clip-text text-transparent">logic.loom</div>

        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm md:text-base font-medium">
          <Link to="/" className="text-[#c4b5fd] hover:text-white transition-colors">Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors">Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors">Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors">Templates</Link>
          <Link to="/contact" className="text-white font-semibold">Contact</Link>
        </div>

        <button
          className="md:hidden text-[#c4b5fd] focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
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

      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none' }`} onClick={toggleMenu}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 text-2xl font-medium" onClick={(e) => e.stopPropagation()}>
          <Link to="/" className="text-white font-semibold" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Projects</Link>
          <Link to="/blogs" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Blogs</Link>
          <Link to="/templates" className="text-[#c4b5fd] hover:text-white transition-colors" onClick={toggleMenu}>Templates</Link>
          <Link to="/contact" className="text-white font-semibold" onClick={toggleMenu}>Contact</Link>
        </div>
      </div>

      <main className="pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-san font-extrabold bg-linear-to-r from-white via-[#d0d0ff] to-[#c7d2fe] bg-clip-text text-transparent leading-tight">Get in Touch</h1>
          <p className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl text-[#a0a0ff] font-light max-w-3xl mx-auto">Have a question, collaboration idea, or just want to say hi? Feel free to reach out — I reply within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8 hover:border-neon-purple/60 transition-all duration-300">
              <div className="text-4xl mb-4 text-neon-purple">✉️</div>
              <h3 className="text-xl lg:text-2xl font-mono font-semibold text-[#d8b4fe] mb-2">Email</h3>
              <p className="text-[#c4b5fd] text-base md:text-lg">
                <a href="mailto:pydeveloper314@gmail.com" className="hover:text-white transition-colors">pydeveloper314@gmail.com</a>
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8 hover:border-neon-purple/60 transition-all duration-300">
              <div className="text-4xl mb-4 text-neon-purple">💻</div>
              <h3 className="text-xl lg:text-2xl font-mono font-semibold text-[#d8b4fe] mb-2">GitHub</h3>
              <p className="text-[#c4b5fd] text-base md:text-lg">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  github.com/yourusername
                </a>
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8 hover:border-neon-purple/60 transition-all duration-300">
              <div className="text-4xl mb-4 text-neon-purple">📸</div>
              <h3 className="text-xl lg:text-2xl font-mono font-semibold text-[#d8b4fe] mb-2">Instagram</h3>
              <p className="text-[#c4b5fd] text-base md:text-lg">
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"> @yourusername </a> </p>
            </div>
          </div>

          <div className="bg-black/25 backdrop-blur-xl border border-neon-purple/25 rounded-xl p-6 lg:p-8 hover:border-neon-purple/60 transition-all duration-300">
            <h3 className="text-2xl lg:text-3xl font-san font-bold text-white mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#c4b5fd] font-mono text-sm md:text-base mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#c4b5fd] font-mono text-sm md:text-base mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#c4b5fd] font-mono text-sm md:text-base mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple transition"
                  placeholder="Collaboration / Question / Feedback"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#c4b5fd] font-mono text-sm md:text-base mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple transition resize-y"
                  placeholder="Write your message here..."
                />
              </div>

              {submitError && <p className="text-red-400 text-sm">{submitError}</p>}
              <button type="submit" disabled={submitting} className="w-full px-6 py-3.5 bg-linear-to-r from-neon-purple to-neon-cyan text-white font-mono font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition text-base md:text-lg disabled:opacity-50"> {submitting ? 'Sending...' : 'Send Message'} </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;