import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { FIREBASE_CONFIG } from "../constants/firebaseConfig";
import { initializeApp } from "firebase/app";

export const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

const getBlogPosts = async () => {
    try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
      
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      
        return postsList;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
    }
};

export const firestoreService = {
    getBlogPosts,
};
