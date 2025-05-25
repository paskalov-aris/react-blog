import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
  startAfter,
  getCountFromServer,
  orderBy,
} from "firebase/firestore";
import { FIREBASE_CONFIG } from "../constants/firebaseConfig";
import { initializeApp } from "firebase/app";

export const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

const POSTS_PER_PAGE = 10;

const getPostsCount = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const countSnapshot = await getCountFromServer(postsCollection);
    
    const totalCount = countSnapshot.data().count;
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return {
      totalCount,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching posts count:", error);
    throw error;
  }
};

const getPostsWithPagination = async ({ page = 1, sortOrder = null }) => {
  try {
    const postsCollection = collection(db, "posts");

    const offset = (page - 1) * POSTS_PER_PAGE;

    let queryConstraints = [];

    if (sortOrder === "asc") {
      queryConstraints.push(orderBy("createdAt", "asc"));
    } else if (sortOrder === "desc") {
      queryConstraints.push(orderBy("createdAt", "desc"));
    }

    queryConstraints.push(limit(POSTS_PER_PAGE));

    let postsQuery = query(postsCollection, ...queryConstraints);

    if (page > 1) {
      let skipQueryConstraints = [];

      if (sortOrder === "asc") {
        skipQueryConstraints.push(orderBy("createdAt", "asc"));
      } else if (sortOrder === "desc") {
        skipQueryConstraints.push(orderBy("createdAt", "desc"));
      }

      skipQueryConstraints.push(limit(offset));

      const skipQuery = query(postsCollection, ...skipQueryConstraints);
      const skipSnapshot = await getDocs(skipQuery);
      const lastDoc = skipSnapshot.docs[skipSnapshot.docs.length - 1];

      if (lastDoc) {
        queryConstraints.push(startAfter(lastDoc));
        postsQuery = query(postsCollection, ...queryConstraints);
      }
    }

    const querySnapshot = await getDocs(postsQuery);

    const postsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      posts: postsList,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const categoriesCollection = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);

    const categoriesList = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categoriesList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getPostsByCategory = async ({ categoryKey, sortOrder = null }) => {
  try {
    const postsCollection = collection(db, "posts");

    let queryConstraints = [where("categoryKey", "==", categoryKey)];

    if (sortOrder === "asc") {
      queryConstraints.push(orderBy("createdAt", "asc"));
    } else if (sortOrder === "desc") {
      queryConstraints.push(orderBy("createdAt", "desc"));
    }

    const q = query(postsCollection, ...queryConstraints);

    const querySnapshot = await getDocs(q);

    const postsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return postsList;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
};

export const firestoreService = {
  getPostsWithPagination,
  getPostsByCategory,
  getCategories,
  getPostsCount,
};
