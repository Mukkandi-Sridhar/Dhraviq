import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
