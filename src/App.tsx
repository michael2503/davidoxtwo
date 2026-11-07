import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext.tsx';
import { PublicLayout } from './layouts/PublicLayout.tsx';
import { AdminLayout } from './layouts/AdminLayout.tsx';
import { Home } from './pages/Home.tsx';
import { About } from './pages/About.tsx';
import { Services } from './pages/Services.tsx';
import { Contact } from './pages/Contact.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminMessages } from './pages/admin/AdminMessages.tsx';
import { AdminProfile } from './pages/admin/AdminProfile.tsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Corporate Website Pages */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dedicated Administrator Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Administrator Control Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Global Notifications Toaster */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            borderRadius: '16px',
            fontSize: '13px',
          },
        }}
      />
    </AuthProvider>
  );
}
