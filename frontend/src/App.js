import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import components
import Nav from './Components/Nav';
import Footer from './Components/Footer';

//import User pages
import Home from './User/Home';

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;