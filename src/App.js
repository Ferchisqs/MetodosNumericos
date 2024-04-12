import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio  from "./inicio/index";
import Biseccion from './components/Biseccion/index'
import FalsePosition from './components/FalsePosition/index'
import Raphson from './components/Raphson/index'
import SecantMethod from './components/SecantMethod/index'




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Inicio />} /> */}
          <Route path="/" element={<Inicio/>}/>
          <Route path="/biseccion" element={<Biseccion/>}/>
          <Route path="/falseposition" element={<FalsePosition/>}/>
          <Route path="/raphson" element={<Raphson/>}/>
          <Route path="/secantmethod" element={<SecantMethod/>}/>
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;