import React from "react";
import Home from "./Components/Home";
import NavigationBar from './Components/NavigationBar';
import {Route , Routes} from "react-router-dom";
import About from "./Components/About";
import ArticlePage from "./Components/ArticlePage";
import {QueryClientProvider , QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:id" element={<ArticlePage/>} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
