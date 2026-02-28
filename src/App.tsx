
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Realisations from './pages/Realisations'
import Services from './pages/Services'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  )
}

export default App
