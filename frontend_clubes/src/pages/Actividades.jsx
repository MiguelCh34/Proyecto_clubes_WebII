import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Typography, Grid, Card, CardContent, 
  Button, IconButton, Modal, TextField, Chip, MenuItem 
} from "@mui/material";
import { Add, Delete, Close, CalendarMonth, Event, LocationOn, Edit } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";

export default function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Modal para Crear/Editar
  const [openDetail, setOpenDetail] = useState(false); // Modal para Ver Detalles
  const [selectedAct, setSelectedAct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [form, setForm] = useState({
    Nombre: "", Descripcion: "", Fecha: "", Lugar: "",
    ID_Club: "", ID_Estado: 1, ID_Usuario: 1
  });

  const loadData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const resAct = await fetch(`${import.meta.env.VITE_API_URL}/actividad/listar_actividades`, { headers });
      const dataAct = await resAct.json();
      // Asignamos video de ejemplo si no existe
      setActividades(dataAct.map(a => ({ ...a, VideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" })));

      const resClub = await fetch(`${import.meta.env.VITE_API_URL}/club/listar_clubes`, { headers });
      setClubes(await resClub.json());
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenCreate = () => {
    setForm({ Nombre: "", Descripcion: "", Fecha: "", Lugar: "", ID_Club: "", ID_Estado: 1, ID_Usuario: 1 });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleOpenEdit = (act) => {
    // Formatear fecha para el input datetime-local (YYYY-MM-DDTHH:mm)
    const fechaFormateada = act.Fecha ? act.Fecha.substring(0, 16) : "";
    setForm({ ...act, Fecha: fechaFormateada });
    setIsEditing(true);
    setOpenModal(true);
    setOpenDetail(false); // Cerramos el detalle si estaba abierto
  };

  const handleSave = async () => {
    if (!form.Nombre || !form.Fecha || !form.ID_Club) return alert("Completa los campos obligatorios");

    const url = isEditing 
      ? `${import.meta.env.VITE_API_URL}/actividad/actualizar_actividad/${form.ID_Actividad}`
      : `${import.meta.env.VITE_API_URL}/actividad/crear_actividad`;
    
    const method = isEditing ? "PUT" : "POST";
    const fechaISO = form.Fecha.length === 16 ? `${form.Fecha}:00` : form.Fecha;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, Fecha: fechaISO })
      });

      if (response.ok) {
        setOpenModal(false);
        loadData();
        alert(isEditing ? "Actualizado" : "Creado");
      }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar actividad?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/actividad/eliminar_actividad/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      setOpenDetail(false);
      loadData();
    } catch (e) { console.error(e); }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a', color: 'white' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '260px', p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6 }}>
          <Typography variant="h4" fontWeight="bold">Actividades</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} sx={{ bgcolor: '#3b82f6', borderRadius: 3 }}>
            AGREGAR ACTIVIDAD
          </Button>
        </Box>

        <Grid container spacing={3}>
          {actividades.map((act) => (
            <Grid item xs={12} sm={6} md={4} key={act.ID_Actividad}>
              <Card sx={{ bgcolor: 'rgba(30, 41, 59, 0.5)', color: 'white', borderRadius: 5, border: '1px solid rgba(255,255,255,0.1)' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <CalendarMonth sx={{ color: '#3b82f6', fontSize: 30 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">{act.Nombre}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Button onClick={() => { setSelectedAct(act); setOpenDetail(true); }} sx={{ color: '#3b82f6', fontWeight: 'bold' }}>VER DETALLES</Button>
                    <IconButton size="small" onClick={() => handleOpenEdit(act)} sx={{ color: '#94a3b8' }}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDelete(act.ID_Actividad)} sx={{ color: '#ef4444' }}><Delete fontSize="small" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* MODAL DE DETALLES (VIDEO Y DATOS) */}
      <Modal open={openDetail} onClose={() => setOpenDetail(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
        <Box sx={{ bgcolor: '#1e293b', width: { xs: '95%', md: 800 }, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', outline: 'none' }}>
          {selectedAct && (
            <>
              <IconButton onClick={() => setOpenDetail(false)} sx={{ position: 'absolute', right: 12, top: 12, color: 'white', zIndex: 10, bgcolor: 'rgba(0,0,0,0.5)' }}><Close /></IconButton>
              <Box sx={{ width: '100%', pt: '56.25%', position: 'relative', bgcolor: 'black' }}>
                <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} src={selectedAct.VideoUrl} title="Video" frameBorder="0" allowFullScreen></iframe>
              </Box>
              <Box sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>{selectedAct.Nombre}</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Chip icon={<Event sx={{ color: 'white !important' }} />} label={new Date(selectedAct.Fecha).toLocaleString()} sx={{ bgcolor: '#3b82f6', color: 'white' }} />
                  <Chip icon={<LocationOn sx={{ color: 'white !important' }} />} label={selectedAct.Lugar} variant="outlined" sx={{ color: '#94a3b8' }} />
                </Box>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4 }}>{selectedAct.Descripcion || "Sin descripción disponible."}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button fullWidth variant="outlined" startIcon={<Edit />} onClick={() => handleOpenEdit(selectedAct)} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>EDITAR</Button>
                  <Button fullWidth variant="contained" startIcon={<Delete />} onClick={() => handleDelete(selectedAct.ID_Actividad)} sx={{ bgcolor: '#ef4444' }}>ELIMINAR</Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* MODAL CREAR / EDITAR */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ bgcolor: '#1e293b', p: 4, width: 450, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'white', fontWeight: 'bold' }}>{isEditing ? "✏️ Editar Actividad" : "🚀 Nueva Actividad"}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField select label="Club" fullWidth variant="filled" value={form.ID_Club} onChange={(e) => setForm({...form, ID_Club: e.target.value})} sx={{ bgcolor: 'rgba(255,255,255,0.05)', '& .MuiSelect-select': { color: 'white' } }}>
              {clubes.map((c) => (<MenuItem key={c.ID_Club} value={c.ID_Club}>{c.Nombre}</MenuItem>))}
            </TextField>
            <TextField label="Nombre" fullWidth variant="filled" value={form.Nombre} onChange={(e) => setForm({...form, Nombre: e.target.value})} sx={{ bgcolor: 'rgba(255,255,255,0.05)', input: { color: 'white' } }} />
            <TextField label="Descripción" fullWidth multiline rows={3} variant="filled" value={form.Descripcion} onChange={(e) => setForm({...form, Descripcion: e.target.value})} sx={{ bgcolor: 'rgba(255,255,255,0.05)', '& .MuiInputBase-root': { color: 'white' } }} />
            <TextField label="Fecha" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} variant="filled" value={form.Fecha} onChange={(e) => setForm({...form, Fecha: e.target.value})} sx={{ bgcolor: 'rgba(255,255,255,0.05)', '& .MuiInputBase-root': { color: 'white' } }} />
            <TextField label="Lugar" fullWidth variant="filled" value={form.Lugar} onChange={(e) => setForm({...form, Lugar: e.target.value})} sx={{ bgcolor: 'rgba(255,255,255,0.05)', input: { color: 'white' } }} />
          </Box>
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button fullWidth onClick={() => setOpenModal(false)} sx={{ color: '#94a3b8' }}>CANCELAR</Button>
            <Button fullWidth variant="contained" onClick={handleSave} sx={{ bgcolor: '#3b82f6' }}>GUARDAR</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}