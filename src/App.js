import { Routes, Route } from "react-router-dom";

import Home from "./pages";
import AdminPage from "./pages/admin";
import AdminPost from "./pages/admin/post";
import CreatePost from "./pages/admin/post/create";
import DetailPost from "./pages/admin/post/detail";
import CategoryArticle from "./pages/categoryArticle";
import SingleArticle from "./pages/singleArticle";
import AdminUser from "./pages/admin/user";
import ReviewNews from "./pages/admin/review";
import UpdatePassword from "./pages/admin/password";

// import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Routes>
      {/* <ScrollToTop /> */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:id" element={<SingleArticle />}></Route>
      <Route path="/category/:id" element={<CategoryArticle />}></Route>
      <Route path="/admin/post/create" element={<CreatePost />}></Route>
      <Route path="/admin/post/detail/:id" element={<DetailPost />}></Route>
      <Route path="/admin/post" element={<AdminPost />}></Route>
      <Route path="/admin/review" element={<ReviewNews />}></Route>
      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/update-password" element={<UpdatePassword />}></Route>
      <Route path="/admin/user" element={<AdminUser />}></Route>
    </Routes>
  );
}

export default App;
