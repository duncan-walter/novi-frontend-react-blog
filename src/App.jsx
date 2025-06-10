import './App.css'
import {Route, Routes} from "react-router-dom";

// Pages
import HomePage from "./pages/home/HomePage.jsx";
import BlogsOverviewPage from "./pages/blogs-overview/BlogsOverviewPage.jsx";
import BlogDetailsPage from "./pages/blog-details/BlogDetailsPage.jsx";
import NewBlogPage from "./pages/new-blog/NewBlogPage.jsx";
import NotFoundPage from "./pages/not-found/NotFoundPage.jsx";

// Assets
import Navigation from "./components/navigation/Navigation.jsx";

function App() {
  return (<>
    <header>
      <Navigation/>
    </header>
    <main className="outer-container">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/blogs" element={<BlogsOverviewPage/>}/>
        <Route path="/blog/:id" element={<BlogDetailsPage/>}/>
        <Route path="/nieuwe-blog" element={<NewBlogPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </main>
  </>);
}

export default App