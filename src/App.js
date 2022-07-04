import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import CategoryArticle from "./pages/categoryArticle";
import SingleArticle from "./pages/singleArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/article" element={<SingleArticle />}></Route>
      <Route path="/category" element={<CategoryArticle />}></Route>
    </Routes>
  );
}

export default App;
