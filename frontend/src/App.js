import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import User pages
import Home from './User/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;