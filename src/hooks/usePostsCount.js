import { useEffect, useState } from "react";
import { firestoreService } from "../services/firestoreService";

export const usePostsCount = () => {
  const [totalCount, setTotalCount] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await firestoreService.getPostsCount();
        setTotalCount(count.totalCount);
        setTotalPages(count.totalPages);
      } catch (error) {
        console.error("Error fetching posts count:", error);
      }
    };

    if (totalCount === null) {
      fetchCount();
    }
  }, [totalCount]);

  return { totalCount, totalPages };
}; 