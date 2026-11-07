import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  CheckCircle,
  Archive,
  Trash2,
  Eye,
  Mail,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Inbox,
} from 'lucide-react';
import {
  subscribeToContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from '../../services/contactService.ts';
import { MessageDetailModal } from '../../components/admin/MessageDetailModal.tsx';
import { ConfirmModal } from '../../components/common/ConfirmModal.tsx';
import type { ContactMessage, MessageStatus } from '../../types/index.ts';

const ITEMS_PER_PAGE = 10;

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToContactMessages(
      (data) => {
        setMessages(data);
        setLoading(false);
      },
      (err) => {
        console.error('Contact messages subscription error:', err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedMessages = useMemo(() => {
    return messages
      .filter((msg) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            msg.fullName.toLowerCase().includes(q) ||
            msg.email.toLowerCase().includes(q) ||
            msg.subject.toLowerCase().includes(q) ||
            (msg.companyName && msg.companyName.toLowerCase().includes(q)) ||
            msg.service.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Status filter
        if (statusFilter !== 'all' && msg.status !== statusFilter) {
          return false;
        }

        // Date filter
        if (dateFilter !== 'all' && msg.createdAt) {
          const now = new Date();
          let msgDate: Date;
          if (msg.createdAt.toDate) {
            msgDate = msg.createdAt.toDate();
          } else {
            msgDate = new Date(msg.createdAt);
          }

          if (dateFilter === 'today') {
            const isToday =
              msgDate.getDate() === now.getDate() &&
              msgDate.getMonth() === now.getMonth() &&
              msgDate.getFullYear() === now.getFullYear();
            if (!isToday) return false;
          } else if (dateFilter === '7days') {
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (msgDate < sevenDaysAgo) return false;
          } else if (dateFilter === '30days') {
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (msgDate < thirtyDaysAgo) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = a.createdAt?.toMillis
          ? a.createdAt.toMillis()
          : new Date(a.createdAt || 0).getTime();
        const timeB = b.createdAt?.toMillis
          ? b.createdAt.toMillis()
          : new Date(b.createdAt || 0).getTime();

        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [messages, searchQuery, statusFilter, dateFilter, sortOrder]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, sortOrder]);

  // Pagination slices
  const totalPages = Math.ceil(filteredAndSortedMessages.length / ITEMS_PER_PAGE) || 1;
  const paginatedMessages = filteredAndSortedMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleUpdateStatus = async (id: string, status: MessageStatus) => {
    try {
      await updateMessageStatus(id, status);
      toast.success(`Message marked as ${status}.`);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status, isRead: status !== 'new' });
      }
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      await deleteContactMessage(messageToDelete);
      toast.success('Message deleted permanently.');
      setIsDetailOpen(false);
      setSelectedMessage(null);
      setMessageToDelete(null);
    } catch {
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
        return ts.toDate().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      return new Date(ts).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Date unavailable';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071B3A] font-heading tracking-tight">
            Contact Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, search, filter, and respond to inquiries submitted by prospective clients.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Found: <span className="font-bold text-[#071B3A]">{filteredAndSortedMessages.length}</span>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, subject..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D6EFD] focus:ring-1 focus:ring-blue-100"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0D6EFD]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New (Unreviewed)</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0D6EFD]"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0D6EFD]"
            >
              <option value="desc">Sort: Newest First</option>
              <option value="asc">Sort: Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-[#0D6EFD] mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Loading enquiries...</p>
          </div>
        ) : paginatedMessages.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0D6EFD] flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-[#071B3A]">No messages match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms, changing the status filter, or clearing date parameters.
            </p>
            {(searchQuery || statusFilter !== 'all' || dateFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <th className="py-4 px-6">Client</th>
                  <th className="py-4 px-4">Subject & Service</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Submitted Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => openMessageDetails(msg)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#071B3A] group-hover:text-[#0D6EFD] transition-colors text-sm">
                        {msg.fullName}
                      </div>
                      <div className="text-slate-400 text-xs mt-0.5">{msg.email}</div>
                      {msg.companyName && (
                        <div className="text-slate-500 text-[11px] italic mt-0.5">{msg.companyName}</div>
                      )}
                    </td>

                    <td className="py-4 px-4 max-w-md">
                      <div className="font-semibold text-slate-800 text-sm truncate">{msg.subject}</div>
                      <div className="text-xs text-[#0D6EFD] font-medium mt-0.5">{msg.service}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {msg.message}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          msg.status
                        )}`}
                      >
                        {msg.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-xs">
                      {formatDate(msg.createdAt)}
                    </td>

                    <td
                      className="py-4 px-6 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openMessageDetails(msg)}
                          title="View Message"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0D6EFD] text-slate-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {msg.status !== 'replied' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(msg.id, 'replied')}
                            title="Mark Replied"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-colors cursor-pointer"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {msg.status !== 'archived' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(msg.id, 'archived')}
                            title="Archive"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-700 text-slate-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setMessageToDelete(msg.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && filteredAndSortedMessages.length > ITEMS_PER_PAGE && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing{' '}
              <span className="font-bold text-[#071B3A]">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{' '}
              to{' '}
              <span className="font-bold text-[#071B3A]">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedMessages.length)}
              </span>{' '}
              of <span className="font-bold text-[#071B3A]">{filteredAndSortedMessages.length}</span>{' '}
              enquiries
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-semibold text-slate-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message Details Modal */}
      <MessageDetailModal
        message={selectedMessage}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={(id) => setMessageToDelete(id)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(messageToDelete)}
        title="Permanently Delete Enquiry?"
        message="This will completely remove the contact enquiry from Firebase Firestore. This operation cannot be reversed."
        confirmLabel="Yes, Delete Permanently"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setMessageToDelete(null)}
      />
    </div>
  );
};
