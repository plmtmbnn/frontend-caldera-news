import { Routes, Route } from "react-router-dom";

import Home from "./pages";
import CategoryArticle from "./pages/categoryArticle";
import SingleArticle from "./pages/singleArticle";

// import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Routes>
      {/* <ScrollToTop /> */}
      <Route path="/" element={<Home />}></Route>
      <Route path="/article/:id" element={<SingleArticle />}></Route>
      <Route path="/category/:id" element={<CategoryArticle />}></Route>
    </Routes>
  );
}

export default App;
