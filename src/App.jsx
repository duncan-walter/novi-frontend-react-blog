import './App.css'
import {Route, Routes} from "react-router-dom";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import NewBlogPage from "./pages/new-blog/NewBlogPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import BlogsPage from "./pages/blogs/BlogsPage.jsx";

// Assets
import logo from './assets/logo-white.png'

function App() {
  return (<>
    <div className="page-container">
      <img src={logo} alt="Company logo"/>
      <h1>Begin hier met het maken van jouw blog-applicatie!</h1>
    </div>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/blogs" element={<BlogsPage/>}/>
      <Route path="/nieuwe-blog" element={<NewBlogPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  </>);
}

export default App
