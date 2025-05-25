import { useEffect, useState } from "react";
import { firestoreService } from "../services/firestoreService";

export const useSinglePost = (postId) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const singlePost = await firestoreService.getPostById(postId);
      setPost(singlePost);
    };

    fetchPost();
  }, [postId]);

  return { post };
};
