import { Routes, Route } from "react-router-dom";

import AdminPage from "./pages/admin";
import AdminPost from "./pages/admin/post";
import CreatePost from "./pages/admin/post/create";
import DetailPost from "./pages/admin/post/detail";
import AdminUser from "./pages/admin/user";
import ReviewNews from "./pages/admin/review";
import UpdatePassword from "./pages/admin/password";

// import ScrollToTop from './ScrollToTop';

function AppAdmin() {
  return (
    <Routes>
      {/* <ScrollToTop /> */}
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

export default AppAdmin;
