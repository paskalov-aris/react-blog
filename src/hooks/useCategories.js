import { useEffect, useState } from "react";
import { firestoreService } from "../services/firestoreService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await firestoreService.getCategories();

      if (categories.length > 0) {
        setCategories(categories);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};