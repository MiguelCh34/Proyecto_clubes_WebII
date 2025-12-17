import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Typography, Grid, Card, CardContent, 
  Button, IconButton, Modal, TextField 
} from "@mui/material";
import { Add, Delete, Close, School, LocationOn, Edit } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSedeId, setCurrentSedeId] = useState(null);
  const [form, setForm] = useState({ Ubicacion: "" });
  
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchSedes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sede/listar_sedes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 401) return navigate("/login");
      const data = await response.json();
      setSedes(data);
    } catch (e) { console.error("Error al listar sedes:", e); }
  };

  useEffect(() => { fetchSedes(); }, []);

  const handleOpenCreate = () => {
    setForm({ Ubicacion: "" });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleOpenEdit = (sede) => {
    setForm({ Ubicacion: sede.Ubicacion });
    setCurrentSedeId(sede.ID_Sede);
    setIsEditing(true);
    setOpenModal(true);
  };

  // GUARDAR ADAPTADO PARA POSTMAN
  const handleSave = async () => {
    if (!form.Ubicacion.trim()) return alert("La ubicación es obligatoria");

    const url = isEditing 
      ? `${import.meta.env.VITE_API_URL}/sede/actualizar_sede/${currentSedeId}`
      : `${import.meta.env.VITE_API_URL}/sede/crear_sede`;
    
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        // Enviamos SOLO la Ubicación para evitar que Flask rechace campos extra
        body: JSON.stringify({ Ubicacion: form.Ubicacion }) 
      });

      const data = await response.json();

      if (response.ok) {
        setOpenModal(false);
        fetchSedes();
      } else {
        // Mostramos el error específico del Backend (ej: "Ya existe una sede...")
        alert(data.error || "Ocurrió un error en el servidor");
      }
    } catch (e) { 
      console.error("Error al guardar:", e);
      alert("Error de conexión con el servidor");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta sede?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sede/eliminar_sede/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) fetchSedes();
    } catch (e) { console.error("Error al eliminar:", e); }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a', color: 'white' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '260px', p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">Sedes Universitarias</Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>Administra las ubicaciones físicas de los clubes.</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleOpenCreate}
            sx={{ bgcolor: '#3b82f6', borderRadius: 3, px: 3, py: 1.5, textTransform: 'none', fontWeight: 'bold' }}
          >
            AGREGAR SEDE
          </Button>
        </Box>

        <Grid container spacing={3}>
          {sedes.map((sede) => (
            <Grid item xs={12} sm={6} md={4} key={sede.ID_Sede}>
              <Card sx={{ bgcolor: 'rgba(30, 41, 59, 0.5)', color: 'white', borderRadius: 5, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <School sx={{ color: '#3b82f6', fontSize: 30 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">Sede Universitaria</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, color: '#94a3b8', mt: 1 }}>
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">{sede.Ubicacion}</Typography>
                  </Box>
                  
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => handleOpenEdit(sede)} sx={{ color: '#94a3b8', bgcolor: 'rgba(255,255,255,0.05)' }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(sede.ID_Sede)} sx={{ color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal 
  open={openModal} 
  onClose={() => setOpenModal(false)} 
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
  <Box sx={{ 
    bgcolor: '#1e293b', 
    p: 4, 
    width: 400, 
    borderRadius: 6, 
    border: '1px solid rgba(255,255,255,0.1)', 
    outline: 'none' 
  }}>
    <Typography variant="h6" sx={{ mb: 3, color: 'white', fontWeight: 'bold' }}>
      {isEditing ? "✏️ Editar Sede" : "📍 Nueva Sede"}
    </Typography>
    
    <TextField 
      label="Escriba la ubicación del Campus" 
      fullWidth 
      variant="filled" 
      // Vincula el valor al estado del formulario
      value={form.Ubicacion}
      // Actualiza el estado cada vez que el usuario escribe
      onChange={(e) => setForm({ Ubicacion: e.target.value })}
      placeholder="Ej: Campus Central, Edificio A"
      sx={{ 
        bgcolor: 'rgba(255,255,255,0.05)', 
        borderRadius: 2,
        '& .MuiFilledInput-root': { color: 'white' },
        '& .MuiInputLabel-root': { color: '#94a3b8' }
      }} 
    />

    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
      <Button 
        fullWidth 
        onClick={() => setOpenModal(false)} 
        sx={{ color: '#94a3b8', textTransform: 'none' }}
      >
        CANCELAR
      </Button>
      <Button 
        fullWidth 
        variant="contained" 
        onClick={handleSave} 
        sx={{ bgcolor: '#3b82f6', textTransform: 'none', fontWeight: 'bold' }}
      >
        GUARDAR
      </Button>
    </Box>
  </Box>
</Modal>
    </Box>
  );
}