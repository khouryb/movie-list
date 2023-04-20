
import { Routes, Route, Link } from 'react-router-dom'
import List from './List';
import Home from './Home';
import About from './About';
import "./App.css"
import Nav from './Nav';




function App() {



  return (
    <>

  
    <div className="App">
    {/* <nav>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>
  </nav> */}
    <Nav />
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    
    </div>
    
    </>
    
  );
}

export default App;
