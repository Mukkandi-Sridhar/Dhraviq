import { doc, setDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from './firebase';  // your firebase config path

export interface ProgressUpdate {
  totalSessions?: number;
  streakDays?: number;
}

export const updateUserProgress = async (
  userId: string,
  progressData: ProgressUpdate
) => {
  const userDocRef = doc(db, 'users', userId);

  const updateData: any = {
    lastUpdated: serverTimestamp(),
  };

  if (progressData.totalSessions !== undefined) {
    updateData.totalSessions = increment(progressData.totalSessions);
  }

  if (progressData.streakDays !== undefined) {
    updateData.streakDays = increment(progressData.streakDays);
  }

  await setDoc(userDocRef, updateData, { merge: true });
};
