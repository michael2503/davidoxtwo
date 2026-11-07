import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config.ts';

// Hardened designated bootstrap admin email from project metadata
export const PRIMARY_ADMIN_EMAIL = 'omotoshomichael2503@gmail.com';

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return cred.user;
}

export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export async function requestPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim());
}

export async function changeAdminPassword(user: User, newPass: string): Promise<void> {
  await updatePassword(user, newPass);
}

export async function checkIsAdmin(user: User | null): Promise<boolean> {
  if (!user || !user.email) return false;
  if (user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
    // Ensure document exists in admins collection for relational integrity
    try {
      const adminDocRef = doc(db, 'admins', user.uid);
      const snapshot = await getDoc(adminDocRef);
      if (!snapshot.exists()) {
        await setDoc(adminDocRef, {
          email: user.email.toLowerCase(),
          role: 'superadmin',
          createdAt: serverTimestamp(),
        });
      }
    } catch {
      // If rules allow direct email verification, proceed
    }
    return true;
  }

  try {
    const adminDocRef = doc(db, 'admins', user.uid);
    const snapshot = await getDoc(adminDocRef);
    return snapshot.exists();
  } catch (err) {
    console.warn('Admin check error:', err);
    return false;
  }
}

export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}
