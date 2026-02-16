import axios from 'axios'

const API_URL = 'http://localhost:8000';

// Public display APIs
const ProjectsData = async () => {
    try {
        const response = await axios.get(`${API_URL}/projects/display`);
        return response.data
    } catch (error) {
        console.error('Failed to fetch Projects', error)
        throw error
    }
}

const BlogsData = async () => {
    try {
        const response = await axios.get(`${API_URL}/blogs/display`);
        return response.data
    } catch (error) {
        console.error('Failed to fetch Blogs', error)
        throw error
    }
}

const TemplatesData = async () => {
    try {
        const response = await axios.get(`${API_URL}/templates/display`);
        return response.data
    } catch (error) {
        console.error('Failed to fetch Templates', error)
        throw error
    }
}

// Admin API - Projects
const getProjects = () => axios.get(`${API_URL}/projects/`).then((r) => r.data.projects);
const createProject = (data) => axios.post(`${API_URL}/projects/`, data).then((r) => r.data);
const updateProject = (id, data) => axios.patch(`${API_URL}/projects/${id}`, data).then((r) => r.data);
const deleteProject = (id) => axios.delete(`${API_URL}/projects/${id}`).then((r) => r.data);

// Admin API - Blogs
const getBlogs = () => axios.get(`${API_URL}/blogs/`).then((r) => r.data.blogs);
const createBlog = (data) => axios.post(`${API_URL}/blogs/`, data).then((r) => r.data);
const updateBlog = (id, data) => axios.patch(`${API_URL}/blogs/${id}`, data).then((r) => r.data);
const deleteBlog = (id) => axios.delete(`${API_URL}/blogs/${id}`).then((r) => r.data);

// Admin API - Templates
const getTemplates = () => axios.get(`${API_URL}/templates/`).then((r) => r.data.templates);
const createTemplate = (data) => axios.post(`${API_URL}/templates/`, data).then((r) => r.data);
const updateTemplate = (id, data) => axios.patch(`${API_URL}/templates/${id}`, data).then((r) => r.data);
const deleteTemplate = (id) => axios.delete(`${API_URL}/templates/${id}`).then((r) => r.data);

// Contact messages
const sendMessage = (data) => axios.post(`${API_URL}/messages/`, data).then((r) => r.data);
const getMessages = () => axios.get(`${API_URL}/messages/`).then((r) => r.data.messages);
const deleteMessage = (id) => axios.delete(`${API_URL}/messages/${id}`).then((r) => r.data);

// Content by slug (for project/blog/template detail pages)
const getProjectBySlug = (slug) =>
    axios.get(`${API_URL}/projects/slug/${encodeURIComponent(slug)}`).then((r) => r.data);
const getBlogBySlug = (slug) =>
    axios.get(`${API_URL}/blogs/slug/${encodeURIComponent(slug)}`).then((r) => r.data);
const getTemplateBySlug = (slug) =>
    axios.get(`${API_URL}/templates/slug/${encodeURIComponent(slug)}`).then((r) => r.data);

// Admin login (JWT)
const adminLogin = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    const response = await axios.post(`${API_URL}/auth/jwt/login`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
};

export {
    ProjectsData, BlogsData, TemplatesData,
    sendMessage, getMessages, deleteMessage,
    getProjectBySlug, getBlogBySlug, getTemplateBySlug,
    getProjects, createProject, updateProject, deleteProject,
    getBlogs, createBlog, updateBlog, deleteBlog,
    getTemplates, createTemplate, updateTemplate, deleteTemplate,
    adminLogin,
};
