import React, { useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";

// Pages
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/DashboardPage";
// Remove MainUspPage import
import UpiPage from "./pages/UpiPage";
import SmsPage from "./pages/SmsPage";
import UrlPage from "./pages/UrlPage";
import PhonePage from "./pages/PhonePage";
import QrPage from "./pages/QrPage";

// Components
import LoadingSpinner from "./components/LoadingSpinner";
import CommunityTweets from "./components/CommunityTweets";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Redirect if already logged in (for auth pages only)
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <Routes>
        {/* Dashboard Page - Accessible to all */}
        <Route path="/" element={<DashboardPage />} />

        {/* Auth routes - Redirect if already logged in */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
         <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Protected pages - Require authentication */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Remove MainUspPage route */}
        <Route
          path="/upi"
          element={
            <ProtectedRoute>
              <UpiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sms"
          element={
            <ProtectedRoute>
              <SmsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qr"
          element={
            <ProtectedRoute>
              <QrPage />
            </ProtectedRoute>
               }
               />
               <Route
                 path="/url"
                 element={
                   <ProtectedRoute>
                     <UrlPage />
                   </ProtectedRoute>
                 }
               />
               <Route
                 path="/phone"
                 element={
                   <ProtectedRoute>
                     <PhonePage />
                   </ProtectedRoute>
                 }
               />
       
               {/* Extra feature */}
               <Route path="/tweets" element={<CommunityTweets />} />
       
               {/* 404 Fallback */}
               <Route path="*" element={<div className="p-4 text-center">404 - Page Not Found</div>} />
             </Routes>
       
             <Toaster />
           </div>
         );
       }
       
       export default App;
