import { Box, Typography, Button } from "@mui/material";
// Añadimos AccountBalance a los iconos importados
import { Settings, Group, Event, School, Logout, Business, AccountBalance } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Clubes', icon: <Group />, path: '/clubes' },
    { text: 'Actividades', icon: <Event />, path: '/actividades' },
    { text: 'Sedes', icon: <School />, path: '/sedes' },
    // AGREGAMOS FACULTADES AQUÍ
    { text: 'Facultades', icon: <AccountBalance />, path: '/facultades' },
  ];

  return (
    <Box sx={{ 
      width: 260, 
      borderRight: '1px solid rgba(255,255,255,0.1)', 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'fixed', 
      height: '100vh', 
      bgcolor: '#0f172a',
      zIndex: 1100
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, color: '#3b82f6', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Business /> UniClubs
      </Typography>
      
      <nav style={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, mb: 3, color: '#3b82f6', opacity: 0.9 }}>
          <Settings fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
            Dashboard
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: '#64748b', px: 1, mb: 1, display: 'block', textTransform: 'uppercase' }}>
          Gestión
        </Typography>

        {menuItems.map((item) => (
          <Button
            key={item.text}
            fullWidth
            startIcon={item.icon}
            onClick={() => navigate(item.path)}
            sx={{ 
              justifyContent: 'flex-start', 
              color: location.pathname === item.path ? '#3b82f6' : '#94a3b8',
              mb: 1,
              py: 1.2,
              textTransform: 'none',
              borderRadius: '12px',
              bgcolor: location.pathname === item.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }
            }}
          >
            {item.text}
          </Button>
        ))}
      </nav>

      <Button 
        startIcon={<Logout />} 
        sx={{ 
          color: '#ef4444', 
          textTransform: 'none', 
          justifyContent: 'flex-start',
          borderRadius: '12px',
          '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
        }}
        onClick={() => { localStorage.removeItem("access_token"); navigate("/login"); }}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
}