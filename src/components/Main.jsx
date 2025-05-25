import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostsByCategory } from "../pages/PostsByCategory";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:categoryKey" element={<PostsByCategory />} />
      </Routes>
    </BrowserRouter>
  );
};
