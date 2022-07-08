import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import AdminPage from "./pages/admin";
import AdminPost from "./pages/admin/post";
import CreatePost from "./pages/admin/post/create";
import CategoryArticle from "./pages/categoryArticle";
import SingleArticle from "./pages/singleArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:id" element={<SingleArticle />}></Route>
      <Route path="/category/:id" element={<CategoryArticle />}></Route>
      <Route path="/admin/post/create" element={<CreatePost />}></Route>
      <Route path="/admin/post" element={<AdminPost />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
    </Routes>
  );
}

export default App;
