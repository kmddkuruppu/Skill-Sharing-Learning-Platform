import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import components
import Nav from './Components/Nav';
import Footer from './Components/Footer';

//import User pages
import Home from './User/Home';
import About from './User/About';
import Contact from './User/Contact';
import Learning from './User/Learning';
import Course from './User/Course'

//import Admin pages
import AddCouse from './Admin/AddCouse';

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/course' element={<Course />} />



          {/* Admin */}
          <Route path='/addcourse' element={<AddCouse />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;