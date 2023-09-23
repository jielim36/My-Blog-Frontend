import React from "react";
import Home from "./Components/Home";
import NavigationBar from './Components/NavigationBar';
import {Route , Routes} from "react-router-dom";
import About from "./Components/About";
import ArticlePage from "./Components/ArticlePage";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="article/:id" element={<ArticlePage/>} />
      </Routes>
    </div>
  );
}

export default App;
