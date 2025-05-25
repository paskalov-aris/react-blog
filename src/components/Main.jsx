import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostsByCategory } from "../pages/PostsByCategory";
import { BlogPostPage } from "../pages/BlogPostPage";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:categoryKey" element={<PostsByCategory />} />
        <Route path="/post/:postId" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  );
};
