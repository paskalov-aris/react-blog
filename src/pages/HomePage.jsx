import { Container, Pagination, Row } from "react-bootstrap";
import { Categories } from "../components/Categories";
import { SortControls } from "../components/SortControls";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { usePostsCount } from "../hooks/usePostsCount";
import { BlogPost } from "../components/BlogPost";
import { useCallback, useState, useContext } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export const HomePage = () => {
  const { categories } = useContext(CategoriesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  const { totalPages } = usePostsCount();
  const { posts } = useBlogPosts(null, currentPage, sortOrder || null);

  useFetchCategories();

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSortChange = useCallback((newSortOrder) => {
    setSortOrder((currentSort) =>
      currentSort === newSortOrder ? "" : newSortOrder
    );
    setCurrentPage(1);
  }, []);

  const renderPaginationItems = useCallback(
    () =>
      Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      }),
    [totalPages, currentPage, handlePageChange]
  );

  return (
    <Container>
      <LanguageSwitcher />
      <Categories categories={categories} />
      <SortControls sortOrder={sortOrder} onSortChange={handleSortChange} />

      <div className="d-flex justify-content-center">
        <Row xl={2} className="w-50">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </Row>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </Container>
  );
};
