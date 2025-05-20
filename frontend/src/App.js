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
import Enrollment from './User/Enrollment';
import AddSkill from './User/AddSkill';
import Skill from './User/Skill';

// import Admin pages
import AddCouse from './Admin/AddCouse';
import Dashboard from './Admin/Dashboard';
import ViewContact from './Admin/ViewContact';
import ViewCourse from './Admin/ViewCourse'
import ViewEndrollment from './Admin/ViewEnrollment';
import ViewSkill from './Admin/ViewSkill';

// layout wrapper to handle conditional Nav/Footer
function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = ['/viewcourse', '/dashboard' , '/viewcontact' , '/viewenrollment' , '/viewskill'].includes(location.pathname.toLowerCase());

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
        <Route path='/enrollment' element={<Enrollment />} />
        <Route path='/addskill' element={<AddSkill />} />
        <Route path='/skill' element={<Skill />} />

        {/* Admin */}
        <Route path='/addcourse' element={<AddCouse />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/viewcourse' element={<ViewCourse />} />
        <Route path='/viewcontact' element={<ViewContact />} />
        <Route path='/viewenrollment' element={<ViewEndrollment />} />
        <Route path='/viewskill' element={<ViewSkill />} />
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
