import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import components
import Nav from './Components/Nav';
import Footer from './Components/Footer';

//import User pages
import Home from './User/Home';
import About from './User/About';
import Contact from './User/Contact';

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;