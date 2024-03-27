
// import './App.css';
// import Home from './pages/Home/Home';
// import Navbar from './components/navigation/Navbar';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <Home />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navigation/Navbar';
// import Search from './Search';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        {/* <Route path="/search/:query" component={Search} /> */}
      </Routes>
        
      
    </Router>
  );
}

export default App;
