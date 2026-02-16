import { useState, useEffect } from 'react';
import {
  getProjects, createProject, updateProject, deleteProject,
  getBlogs, createBlog, updateBlog, deleteBlog,
  getTemplates, createTemplate, updateTemplate, deleteTemplate,
  getMessages, deleteMessage,
  adminLogin,
} from '../api';
import TabPanel from '../components/TabPanel';
import MessagesPanel from '../components/MessagesPanel'

const API_URL = 'https://logic-loom-production.up.railway.app';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({ projects: false, blogs: false, templates: false, messages: false });

  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const emptyProject = { title: '', description: '', technologies: [], content: '', slug: '' };
  const emptyBlog = { title: '', excerpt: '', imagePlaceholder: '', content: '', slug: '' };
  const emptyTemplate = { title: '', template_type: '', description: '', features: [], content: '', downloadLink: '', slug: '' };

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [blogForm, setBlogForm] = useState(emptyBlog);
  const [templateForm, setTemplateForm] = useState(emptyTemplate);

  // Parse comma-separated string to array
  const toArray = (v) => {
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') return v.split(',').map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      await adminLogin(username, password);
      setIsAuthenticated(true);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg = typeof detail === 'string' ? detail : detail?.msg || 'Invalid credentials';
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const loadProjects = async () => {
    setLoading((l) => ({ ...l, projects: true }));
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading((l) => ({ ...l, projects: false }));
    }
  };

  const loadBlogs = async () => {
    setLoading((l) => ({ ...l, blogs: true }));
    try {
      const data = await getBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading((l) => ({ ...l, blogs: false }));
    }
  };

  const loadTemplates = async () => {
    setLoading((l) => ({ ...l, templates: true }));
    try {
      const data = await getTemplates();
      setTemplates(data || []);
    } catch (err) {
      console.error(err);
      setTemplates([]);
    } finally {
      setLoading((l) => ({ ...l, templates: false }));
    }
  };

  const loadMessages = async () => {
    setLoading((l) => ({ ...l, messages: true }));
    try {
      const data = await getMessages();
      setMessages(data || []);
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading((l) => ({ ...l, messages: false }));
    }
  };

  const projectSubmit = async (id, data) => {
    const payload = {
      title: data.title,
      description: data.description,
      technologies: toArray(data.technologies),
      content: data.content,
      slug: data.slug,
    };
    if (id) await updateProject(id, payload);
    else await createProject(payload);
  };

  const blogSubmit = async (id, data) => {
    const payload = {
      title: data.title,
      excerpt: data.excerpt,
      imagePlaceholder: data.imagePlaceholder,
      content: data.content,
      slug: data.slug,
    };
    if (id) await updateBlog(id, payload);
    else await createBlog(payload);
  };

  const templateSubmit = async (id, data) => {
    const payload = {
      title: data.title,
      template_type: data.template_type,
      description: data.description,
      features: toArray(data.features),
      content: data.content,
      downloadLink: data.downloadLink,
      slug: data.slug,
    };
    if (id) await updateTemplate(id, payload);
    else await createTemplate(payload);
  };

  // Form fields for Projects
  const projectFields = (formData, setFormData) => (
    <>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Project title"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Short description"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Technologies (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="Python, FastAPI, React"
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Link (slug)</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="https://github.com/..."
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
    </>
  );

  // Form fields for Blogs
  const blogFields = (formData, setFormData) => (
    <>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Blog title"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Excerpt (short description)</label>
        <input
          type="text"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief excerpt"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Image Placeholder</label>
        <input
          type="text"
          value={formData.imagePlaceholder}
          onChange={(e) => setFormData({ ...formData, imagePlaceholder: e.target.value })}
          placeholder="Alt text or image URL"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Link (slug)</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="blog-slug or full URL"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
    </>
  );

  // Form fields for Templates
  const templateFields = (formData, setFormData) => (
    <>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Template title"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Type</label>
        <input
          type="text"
          value={formData.template_type}
          onChange={(e) => setFormData({ ...formData, template_type: e.target.value })}
          placeholder="e.g. Full-stack, API, Frontend"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Short description"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Features (comma-separated)</label>
        <input
          type="text"
          value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features || ''}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Auth, Database, REST API"
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Download Link</label>
        <input
          type="text"
          value={formData.downloadLink}
          onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
          placeholder="https://..."
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
      <div>
        <label className="block text-[#c4b5fd] font-mono text-sm mb-2">Preview Link (slug)</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="template-slug or URL"
          required
          className="w-full px-4 py-3 bg-black/40 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
        />
      </div>
    </>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-black/40 backdrop-blur-xl border border-neon-purple/30 rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-serif font-bold text-white text-center">Admin Login</h2>
          
          {loginError && <p className="text-red-400 text-center text-sm">{loginError}</p>}

          <input
            type="text"
            placeholder="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-5 py-3.5 bg-black/50 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3.5 bg-black/50 border border-neon-purple/30 rounded-lg text-white placeholder-[#a0a0ff]/60 focus:outline-none focus:border-neon-purple"
          />

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full px-6 py-4 bg-linear-to-r from-neon-purple to-neon-cyan text-white font-mono font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f17] to-[#131324] text-[#e0e0ff] font-sans pb-12">
      <div className="fixed inset-x-0 top-0 z-50 h-16 backdrop-blur-xl bg-black/50 border-b border-neon-purple/20 px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-serif font-extrabold bg-linear-to-r from-white via-[#d0d0ff] to-[#c7d2fe] bg-clip-text text-transparent">
          ADMIN DASHBOARD
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="px-4 py-2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          >
            Back to Portfolio
          </a>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="pt-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8">
          {['Projects', 'Blogs', 'Templates', 'Messages'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-3 rounded-xl font-mono text-lg font-semibold transition-all ${
                activeTab === tab.toLowerCase()
                  ? 'bg-[#1e1e3c] border border-neon-purple/40 text-white shadow-lg'
                  : 'bg-black/30 border border-neon-purple/20 text-[#c4b5fd] hover:bg-black/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'projects' && (
          <TabPanel
            title="Projects"
            items={projects}
            loading={loading.projects}
            onLoad={loadProjects}
            onDelete={deleteProject}
            editingItem={editingProject}
            setEditingItem={setEditingProject}
            formData={projectForm}
            setFormData={setProjectForm}
            onSubmit={projectSubmit}
            getFormFields={projectFields}
            emptyFields={emptyProject}
            mdPlaceholder="# Project overview...\n\nDescribe your project, technologies used, and key features."
          />
        )}

        {activeTab === 'blogs' && (
          <TabPanel
            title="Blogs"
            items={blogs}
            loading={loading.blogs}
            onLoad={loadBlogs}
            onDelete={deleteBlog}
            editingItem={editingBlog}
            setEditingItem={setEditingBlog}
            formData={blogForm}
            setFormData={setBlogForm}
            onSubmit={blogSubmit}
            getFormFields={blogFields}
            emptyFields={emptyBlog}
            mdPlaceholder="# Blog post title\n\nWrite your blog content here with full markdown support..."
          />
        )}

        {activeTab === 'templates' && (
          <TabPanel
            title="Templates"
            items={templates}
            loading={loading.templates}
            onLoad={loadTemplates}
            onDelete={deleteTemplate}
            editingItem={editingTemplate}
            setEditingItem={setEditingTemplate}
            formData={templateForm}
            setFormData={setTemplateForm}
            onSubmit={templateSubmit}
            getFormFields={templateFields}
            emptyFields={emptyTemplate}
            mdPlaceholder="# Template name\n\nDescribe the template, setup instructions, and usage..."
          />
        )}

        {activeTab === 'messages' && (
          <MessagesPanel
            messages={messages}
            loading={loading.messages}
            onLoad={loadMessages}
            onDelete={deleteMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
