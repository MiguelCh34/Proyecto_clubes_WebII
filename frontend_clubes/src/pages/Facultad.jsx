import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Typography, Grid, Card, CardContent, 
  Button, IconButton, Modal, TextField 
} from "@mui/material";
import { Add, Delete, AccountBalance, Edit } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";

export default function Facultades() {
  const [facultades, setFacultades] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({ Nombre: "" });
  
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchFacultades = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/facultad/listar_facultades`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 401) return navigate("/login");
      const data = await response.json();
      setFacultades(data);
    } catch (e) { console.error("Error al cargar facultades:", e); }
  };

  useEffect(() => { fetchFacultades(); }, []);

  const handleSave = async () => {
    if (!form.Nombre.trim()) return alert("El nombre es obligatorio");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/facultad/crear_facultad`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setOpenModal(false);
        setForm({ Nombre: "" });
        fetchFacultades();
      } else {
        const err = await response.json();
        alert(err.error || "Error al crear");
      }
    } catch (e) { console.error(e); }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a', color: 'white' }}>
      {/* 1. Sidebar lateral fijo */}
      <Sidebar />
      
      {/* 2. Contenedor principal con margen izquierdo para no tapar el sidebar */}
      <Box sx={{ flexGrow: 1, ml: '260px', p: 4 }}>
        
        {/* ENCABEZADO: Título y Botón */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">Facultades</Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>Administración de facultades universitarias.</Typography>
          </Box>
          
          {/* BOTÓN DE ACCIÓN */}
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => setOpenModal(true)}
            sx={{ bgcolor: '#3b82f6', borderRadius: 3, px: 3, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
          >
            AGREGAR FACULTAD
          </Button>
        </Box>

        {/* LISTADO DE TARJETAS */}
        <Grid container spacing={3}>
          {facultades.map((fac) => (
            <Grid item xs={12} sm={6} md={4} key={fac.ID_Facultad}>
              <Card sx={{ bgcolor: 'rgba(30, 41, 59, 0.5)', color: 'white', borderRadius: 5, border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <AccountBalance sx={{ color: '#3b82f6', fontSize: 30 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">{fac.Nombre}</Typography>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton size="small" sx={{ color: '#94a3b8' }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" sx={{ color: '#ef4444' }}><Delete fontSize="small" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* MODAL PARA CREAR NUEVA FACULTAD */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ bgcolor: '#1e293b', p: 4, width: 400, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'white', fontWeight: 'bold' }}>🏛️ Nueva Facultad</Typography>
          <TextField 
            label="Nombre de la Facultad" 
            fullWidth 
            variant="filled" 
            value={form.Nombre}
            onChange={(e) => setForm({ Nombre: e.target.value })}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)', 
              borderRadius: 2,
              '& .MuiFilledInput-root': { color: 'white' },
              '& .MuiInputLabel-root': { color: '#94a3b8' }
            }} 
          />
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button fullWidth onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8', textTransform: 'none' }}>CANCELAR</Button>
            <Button fullWidth variant="contained" onClick={handleSave} sx={{ bgcolor: '#3b82f6', textTransform: 'none', fontWeight: 'bold' }}>GUARDAR</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}