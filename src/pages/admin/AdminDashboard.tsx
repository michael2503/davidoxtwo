import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Inbox,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Archive,
  ArrowRight,
  Clock,
  Eye,
  RefreshCw,
  Search,
} from 'lucide-react';
import {
  subscribeToContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from '../../services/contactService.ts';
import { MessageDetailModal } from '../../components/admin/MessageDetailModal.tsx';
import { ConfirmModal } from '../../components/common/ConfirmModal.tsx';
import type { ContactMessage, MessageStatus } from '../../types/index.ts';

export const AdminDashboard: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToContactMessages(
      (data) => {
        setMessages(data);
        setLoading(false);
      },
      (error) => {
        console.error('Admin dashboard subscription error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const stats = {
    total: messages.length,
    newCount: messages.filter((m) => m.status === 'new').length,
    readCount: messages.filter((m) => m.status === 'read').length,
    repliedCount: messages.filter((m) => m.status === 'replied').length,
    archivedCount: messages.filter((m) => m.status === 'archived').length,
  };

  const handleUpdateStatus = async (id: string, status: MessageStatus) => {
    try {
      await updateMessageStatus(id, status);
      toast.success(`Message marked as ${status}.`);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status, isRead: status !== 'new' });
      }
    } catch (err: any) {
      toast.error('Failed to update message status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      await deleteContactMessage(messageToDelete);
      toast.success('Message deleted successfully.');
      setIsDetailOpen(false);
      setSelectedMessage(null);
      setMessageToDelete(null);
    } catch (err) {
      toast.error('Failed to delete message.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openMessageDetails = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsDetailOpen(true);
  };

  const formatDate = (ts: any) => {
    if (!ts) return 'Just now';
    try {
      if (ts.toDate) {
        return ts.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      return new Date(ts).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-[#0D6EFD] border-blue-200';
      case 'read':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'replied':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'archived':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const recentMessages = messages
    .filter((m) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        (m.companyName && m.companyName.toLowerCase().includes(q))
      );
    })
    .slice(0, 7);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] font-heading tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry and enquiries submitted through Davidox Limited corporate portals.
          </p>
        </div>

        <Link
          to="/admin/messages"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0D6EFD] hover:bg-blue-700 transition-all shadow-xs"
        >
          <span>Manage All Enquiries</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 5 Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#071B3A] font-heading">
            {loading ? '-' : stats.total}
          </div>
          <div className="text-[11px] text-slate-500">All submissions recorded</div>
        </div>

        {/* New */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-[#0D6EFD]" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">New</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D6EFD] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0D6EFD] font-heading">
            {loading ? '-' : stats.newCount}
          </div>
          <div className="text-[11px] text-slate-500">Awaiting initial review</div>
        </div>

        {/* Read */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Read</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-700 font-heading">
            {loading ? '-' : stats.readCount}
          </div>
          <div className="text-[11px] text-slate-500">Reviewed by team</div>
        </div>

        {/* Replied */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Replied</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-heading">
            {loading ? '-' : stats.repliedCount}
          </div>
          <div className="text-[11px] text-slate-500">Client contacted</div>
        </div>

        {/* Archived */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Archived</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Archive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-700 font-heading">
            {loading ? '-' : stats.archivedCount}
          </div>
          <div className="text-[11px] text-slate-500">Closed enquiries</div>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#071B3A] font-heading">
              Recent Client Enquiries
            </h2>
            <p className="text-xs text-slate-500">
              Showing latest submissions from the public contact page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recent..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0D6EFD] w-48 sm:w-56"
              />
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-bold text-[#0D6EFD] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Content list or loading */}
        {loading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#0D6EFD] mx-auto" />
            <p className="text-xs font-medium text-slate-500">Syncing Firestore messages...</p>
          </div>
        ) : recentMessages.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#071B3A]">No enquiries yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Submitted enquiries will automatically show here in real-time. Test the contact form on the public website.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-blue-50 text-[#0D6EFD] text-xs font-bold hover:bg-blue-100 transition-colors inline-block"
              >
                Open Contact Form to Submit Test
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <th className="py-3.5 px-4 sm:px-6">Client</th>
                  <th className="py-3.5 px-4">Subject & Service</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => openMessageDetails(msg)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="font-bold text-[#071B3A] group-hover:text-[#0D6EFD] transition-colors">
                        {msg.fullName}
                      </div>
                      <div className="text-slate-400 text-[11px]">{msg.email}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <div className="font-medium text-slate-800 truncate">{msg.subject}</div>
                      <div className="text-[11px] text-slate-500 truncate">{msg.service}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          msg.status
                        )}`}
                      >
                        {msg.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(msg.createdAt)}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => openMessageDetails(msg)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0D6EFD] text-slate-700 hover:text-white transition-colors text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <MessageDetailModal
        message={selectedMessage}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={(id) => setMessageToDelete(id)}
      />

      <ConfirmModal
        isOpen={Boolean(messageToDelete)}
        title="Delete Contact Enquiry?"
        message="Are you sure you want to permanently delete this contact enquiry? This action cannot be undone."
        confirmLabel="Yes, Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setMessageToDelete(null)}
      />
    </div>
  );
};
