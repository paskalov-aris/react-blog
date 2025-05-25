import { useCallback, useEffect, useState } from "react";
import { firestoreService } from "../services/firestoreService";

export const useBlogPosts = (categoryKey, page = 1, sortOrder = null) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const requestResult = await firestoreService.getPostsWithPagination({
      page: page,
      sortOrder: sortOrder,
    });

    const { posts } = requestResult;

    if (posts.length > 0) {
      setPosts(posts);
    }
  }, [page, sortOrder]);

  const fetchPostsByCategory = useCallback(async () => {
    const blogPosts = await firestoreService.getPostsByCategory({
      categoryKey,
      sortOrder,
    });

    if (blogPosts.length > 0) {
      setPosts(blogPosts);
    }
  }, [categoryKey, sortOrder]);

  useEffect(() => {
    if (categoryKey) {
      fetchPostsByCategory(categoryKey);
    } else {
      fetchPosts();
    }
  }, [categoryKey, fetchPosts, fetchPostsByCategory]);

  return { posts };
};
