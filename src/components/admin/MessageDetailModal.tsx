import React, { useEffect } from 'react';
import {
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  Archive,
  Trash2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import type { ContactMessage, MessageStatus } from '../../types/index.ts';

interface MessageDetailModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: MessageStatus) => Promise<void>;
  onDelete: (id: string) => void;
}

export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({
  message,
  isOpen,
  onClose,
  onUpdateStatus,
  onDelete,
}) => {
  useEffect(() => {
    // When opened and status is 'new', auto-mark as 'read'
    if (isOpen && message && message.status === 'new') {
      onUpdateStatus(message.id, 'read');
    }
  }, [isOpen, message, onUpdateStatus]);

  if (!isOpen || !message) return null;

  const formatDate = (ts: any) => {
    if (!ts) return 'Just now';
    try {
      if (ts.toDate) {
        return ts.toDate().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        });
      }
      return new Date(ts).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return 'Date unavailable';
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-[#0D6EFD] border-blue-200';
      case 'read':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'replied':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'archived':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  // Prefilled mailto link
  const mailtoSubject = encodeURIComponent(`RE: ${message.subject} - Davidox Limited`);
  const mailtoBody = encodeURIComponent(
    `Dear ${message.fullName},\n\nThank you for reaching out to Davidox Limited regarding "${message.service}".\n\n[Type your response here]\n\nBest regards,\nDavidox Limited Solutions Team\nhttps://davidoxlimited.com`
  );
  const mailtoLink = `mailto:${message.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D6EFD] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#071B3A] font-heading">
                  Enquiry Details
                </h3>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    message.status
                  )}`}
                >
                  {message.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">ID: {message.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Client Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/70 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Client Name</span>
              <p className="font-bold text-[#071B3A] mt-0.5">{message.fullName}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Email</span>
              <p className="font-bold text-[#0D6EFD] mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${message.email}`} className="hover:underline">
                  {message.email}
                </a>
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Phone</span>
              <p className="font-medium text-slate-700 mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {message.phone || 'Not provided'}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Company</span>
              <p className="font-medium text-slate-700 mt-0.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {message.companyName || 'Not provided'}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Service of Interest</span>
              <p className="font-semibold text-slate-800 mt-0.5">{message.service}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Submitted At</span>
              <p className="font-medium text-slate-600 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(message.createdAt)}
              </p>
            </div>
          </div>

          {/* Subject & Full Message */}
          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Subject
            </span>
            <h4 className="text-base font-bold text-[#071B3A]">{message.subject}</h4>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Enquiry Message
            </span>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {message.message}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          {/* Quick status change buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {message.status !== 'replied' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(message.id, 'replied')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark Replied</span>
              </button>
            )}

            {message.status !== 'archived' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(message.id, 'archived')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Archive</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(message.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>

          {/* Reply via Email Button */}
          <a
            href={mailtoLink}
            onClick={() => {
              if (message.status !== 'replied') {
                onUpdateStatus(message.id, 'replied');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0D6EFD] hover:bg-blue-700 transition-all shadow-xs cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Reply via Email</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
