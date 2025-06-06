import './App.css'
import {Route, Routes} from "react-router-dom";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import NewBlogPage from "./pages/new-blog/NewBlogPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";
import BlogsPage from "./pages/blogs/BlogsPage.jsx";

// Assets
import Navigation from "./components/navigation/Navigation.jsx";

function App() {
  return (<>
    <Navigation/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/blogs" element={<BlogsPage/>}/>
      <Route path="/nieuwe-blog" element={<NewBlogPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  </>);
}

export default App