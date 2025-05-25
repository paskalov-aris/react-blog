import { useParams } from "react-router-dom";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { Container, Row } from "react-bootstrap";
import { BlogPost } from "../components/BlogPost";
import { SortControls } from "../components/SortControls";
import { useCallback, useState } from "react";

export const PostsByCategory = () => {
  const { categoryKey } = useParams();
  const [sortOrder, setSortOrder] = useState('');
  const { posts } = useBlogPosts(categoryKey, 1, sortOrder || null);

  const handleSortChange = useCallback((newSortOrder) => {
    setSortOrder(currentSort => currentSort === newSortOrder ? '' : newSortOrder);
  }, []);

  return (
    <Container>
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
