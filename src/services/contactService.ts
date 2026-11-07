import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config.ts';
import { handleFirestoreError, OperationType } from '../firebase/error.ts';
import type { ContactFormData, ContactMessage, MessageStatus } from '../types/index.ts';

const COLLECTION_NAME = 'contact_messages';

export async function submitContactMessage(data: ContactFormData): Promise<string> {
  const collectionRef = collection(db, COLLECTION_NAME);
  try {
    const docRef = await addDoc(collectionRef, {
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '',
      companyName: data.companyName?.trim() || '',
      subject: data.subject.trim(),
      service: data.service.trim(),
      message: data.message.trim(),
      status: 'new',
      isRead: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const collectionRef = collection(db, COLLECTION_NAME);
  try {
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        companyName: data.companyName || '',
        subject: data.subject || '',
        service: data.service || '',
        message: data.message || '',
        status: (data.status || 'new') as MessageStatus,
        isRead: Boolean(data.isRead),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  }
}

export function subscribeToContactMessages(
  onSuccess: (messages: ContactMessage[]) => void,
  onError?: (error: Error) => void
): () => void {
  const collectionRef = collection(db, COLLECTION_NAME);
  const q = query(collectionRef, orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ContactMessage[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          companyName: data.companyName || '',
          subject: data.subject || '',
          service: data.service || '',
          message: data.message || '',
          status: (data.status || 'new') as MessageStatus,
          isRead: Boolean(data.isRead),
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });
      onSuccess(messages);
    },
    (error) => {
      console.error('Contact messages snapshot listener error:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  );
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus,
  isRead?: boolean
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const path = `${COLLECTION_NAME}/${id}`;
  try {
    await updateDoc(docRef, {
      status,
      isRead: isRead !== undefined ? isRead : status !== 'new',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function markMessageAsRead(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const path = `${COLLECTION_NAME}/${id}`;
  try {
    await updateDoc(docRef, {
      isRead: true,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const path = `${COLLECTION_NAME}/${id}`;
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
