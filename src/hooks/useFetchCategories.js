import { useEffect, useContext } from "react";
import { firestoreService } from "../services/firestoreService";
import { CategoriesContext } from "../contexts/CategoriesContext";

export const useFetchCategories = () => {
  const { setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await firestoreService.getCategories();

      if (categories.length > 0) {
        setCategories(categories);
      }
    };

    fetchCategories();
  }, [setCategories]);
};