import React from "react";
import Home from "./Components/Home";
import NavigationBar from './Components/NavigationBar';
import {Route , Routes} from "react-router-dom";
import About from "./Components/About";
import ArticlePage from "./Components/ArticlePage";
import {QueryClientProvider , QueryClient} from '@tanstack/react-query';
import QueryPage from "./Components/QueryPage";
import Profile from "./Components/Profile";
import CreatorHub from "./Components/CreatorHub";
import Login from "./Components/Login";

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
            <Route path="/query/:content" element={<QueryPage/>}/>
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/creatorhub/:id" element={<CreatorHub />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </QueryClientProvider>
    </div>
  );
 
}

export default App;
