export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  subject: string;
  service: string;
  message: string;
  status: MessageStatus;
  isRead: boolean;
  createdAt: any; // Firestore Timestamp, Date, or string
  updatedAt: any;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  subject: string;
  service: string;
  message: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  technologies: string[];
  iconName: string;
  badge?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string | null;
  role: 'admin' | 'superadmin';
}

export interface MessageStats {
  total: number;
  newCount: number;
  readCount: number;
  repliedCount: number;
  archivedCount: number;
}
