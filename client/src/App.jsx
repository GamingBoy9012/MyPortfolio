import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
                <footer>
                    <p>© 2026 Dhruvin Suvagiya. All Rights Reserved.</p>
                </footer>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
