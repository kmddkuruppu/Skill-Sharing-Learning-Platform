import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import components
import Nav from './Components/Nav';
import Footer from './Components/Footer';

// import User pages
import Home from './User/Home';
import About from './User/About';
import Contact from './User/Contact';
import Learning from './User/Learning';
import Course from './User/Course';
import Success from './User/Success';
import Instructor from './User/Instructor';
import Community from './User/Community';

// import Admin pages
import AddCouse from './Admin/AddCouse';
import View from './Admin/ViewCourse';
import Skill from './Admin/Skill';
import Dashboard from './Admin/Dashboard';
import ViewContact from './Admin/ViewContact';

// layout wrapper to handle conditional Nav/Footer
function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = ['/viewcourse', '/skill' , '/dashboard' , '/viewcontact'].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <Nav />}
      <Routes>
        {/* User */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/course' element={<Course />} />
        <Route path='/success' element={<Success />} />
        <Route path='/instructor' element={<Instructor />} />
        <Route path='/community' element={<Community />} />

        {/* Admin */}
        <Route path='/addcourse' element={<AddCouse />} />
        <Route path='/view' element={<View />} />
        <Route path='/skill' element={<Skill />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/viewcontact' element={<ViewContact />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}


function App() {
  return (
    <div className="App">
      <Router>
        <LayoutWrapper />
      </Router>
    </div>
  );
}

export default App;
