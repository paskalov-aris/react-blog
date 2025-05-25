import { Link, useParams } from "react-router-dom";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { Button, Container, Row } from "react-bootstrap";
import { BlogPost } from "../components/BlogPost";
import { SortControls } from "../components/SortControls";
import { useCallback, useState, useContext } from "react";
import { Categories } from "../components/Categories";
import { CategoriesContext } from "../contexts/CategoriesContext";

export const PostsByCategory = () => {
  const { categoryKey } = useParams();

  const { categories } = useContext(CategoriesContext);

  const [sortOrder, setSortOrder] = useState("");
  const { posts } = useBlogPosts(categoryKey, 1, sortOrder || null);

  const handleSortChange = useCallback((newSortOrder) => {
    setSortOrder((currentSort) =>
      currentSort === newSortOrder ? "" : newSortOrder
    );
  }, []);

  return (
    <Container>
      <div className="d-flex justify-content-center mb-4">
        <Button className="d-block">
          <Link to="/" className="text-light text-decoration-none">
            Назад
          </Link>
        </Button>
      </div>
      <Categories categories={categories} activeCategoryKey={categoryKey} />
      <SortControls sortOrder={sortOrder} onSortChange={handleSortChange} />

      <div className="d-flex justify-content-center">
        <Row xl={2} className="w-50">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </Row>
      </div>
    </Container>
  );
};
