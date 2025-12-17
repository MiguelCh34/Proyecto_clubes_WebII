import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Clubes from "./pages/Clubes.jsx";
import Actividades from "./pages/Actividades.jsx";
import Sedes from "./pages/Sedes.jsx";
import Facultades from "./pages/Facultad.jsx"; // IMPORTAMOS FACULTADES

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Privadas */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/clubes" element={<ProtectedRoute><Clubes /></ProtectedRoute>} />
        <Route path="/actividades" element={<ProtectedRoute><Actividades /></ProtectedRoute>} />
        <Route path="/sedes" element={<ProtectedRoute><Sedes /></ProtectedRoute>} />
        
        {/* AGREGAMOS LA RUTA DE FACULTADES */}
        <Route path="/facultades" element={<ProtectedRoute><Facultades /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}