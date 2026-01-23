import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Profile from "@/pages/Profile";
import Home from "@/pages/Home";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth" element={<Auth />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>
