import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveUserToFirestore = async (user: any) => {
  if (!user?.uid) return;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email || "",
      name: user.displayName || user.email?.split("@")[0] || "Anonymous",
      reminderEnabled: false,
      createdAt: new Date().toISOString(),
    });
  }
};
