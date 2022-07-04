import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import SingleArticle from "./pages/singleArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
