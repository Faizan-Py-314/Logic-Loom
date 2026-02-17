import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PortfolioDesktop from './pages/PortfolioDesktop'
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Templates from './pages/Templates';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ContentView from './pages/ContentView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PortfolioDesktop />} />
        <Route path='projects' element={<Projects />} />
        <Route path='blogs' element={<Blogs />} />
        <Route path='templates' element={<Templates />} />
        <Route path='contact' element={<Contact />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/project/:slug' element={<ContentView />} />
        <Route path='/blog/:slug' element={<ContentView />} />
        <Route path='/template/:slug' element={<ContentView />} />
      </Routes>
    </Router>
  )
}

export default App
