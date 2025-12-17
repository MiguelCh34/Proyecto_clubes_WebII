import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Modal, TextField, Box, Typography,
  Grid, Card, CardContent, Chip, IconButton
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import "./Clubes.css";

export default function Clubes() {
  const [clubes, setClubes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const emptyForm = {
    Nombre: "", 
    Descripcion: "", 
    Tipo: "General",
    Duracion: "6 meses", 
    ID_Sede: "", 
    ID_Facultad: 1,
    ID_Estado: 1, 
    ID_Usuario: 1,
  };

  const [form, setForm] = useState(emptyForm);

  const fetchClubes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/club/listar_clubes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 401) {
        localStorage.removeItem("access_token");
        return navigate("/login");
      }
      const data = await response.json();
      setClubes(data);
    } catch (error) {
      console.error("Error al obtener clubes:", error);
    }
  };

  useEffect(() => { 
    fetchClubes(); 
  }, []);

  const handleSave = async () => {
    const url = editingClub
      ? `${import.meta.env.VITE_API_URL}/club/actualizar_club/${editingClub.ID_Club}`
      : `${import.meta.env.VITE_API_URL}/club/crear_club`;

    const response = await fetch(url, {
      method: editingClub ? "PUT" : "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setOpenModal(false);
      setForm(emptyForm);
      setEditingClub(null);
      fetchClubes();
    } else {
      alert("Error al guardar el club");
    }
  };

  const deleteClub = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este club?")) return;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/club/eliminar_club/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) fetchClubes();
  };

  return (
    <div className="clubes-container">
      <Sidebar />

      <div className="clubes-main-content">
        <div className="clubes-header">
          <div>
            <h1 className="clubes-title">Gestión de Clubes</h1>
            <p className="clubes-subtitle">Administra y organiza los grupos activos.</p>
          </div>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => { setEditingClub(null); setForm(emptyForm); setOpenModal(true); }}
            className="btn-nuevo-club"
          >
            Nuevo Club
          </Button>
        </div>

        <Grid container spacing={3}>
          {clubes.map((club) => (
            <Grid item xs={12} md={6} lg={4} key={club.ID_Club}>
              <Card className="club-card">
                <CardContent className="club-card-content">
                  <div className="club-card-header">
                    <Chip label={club.Tipo} size="small" className="club-tipo-chip" />
                    <span className="club-id">ID: {club.ID_Club}</span>
                  </div>
                  <h3 className="club-nombre">{club.Nombre}</h3>
                  <p className="club-descripcion">{club.Descripcion}</p>
                  
                  <div className="club-actions">
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      onClick={() => { setEditingClub(club); setForm(club); setOpenModal(true); }} 
                      className="btn-editar-club"
                    >
                      Editar
                    </Button>
                    <IconButton 
                      onClick={() => deleteClub(club.ID_Club)} 
                      className="btn-eliminar-club"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)} className="clubes-modal">
        <Box className="clubes-modal-box">
          <Typography variant="h6" className="modal-title">
            {editingClub ? "✏️ Editar Club" : "🚀 Nuevo Club"}
          </Typography>
          
          <div className="modal-form">
            {["Nombre", "Descripcion", "Tipo", "Duracion", "ID_Sede"].map((f) => (
              <TextField 
                key={f} 
                fullWidth 
                label={f} 
                variant="filled" 
                value={form[f]} 
                onChange={(e) => setForm({...form, [f]: e.target.value})} 
                className="modal-input"
              />
            ))}
          </div>
          
          <div className="modal-actions">
            <Button fullWidth onClick={() => setOpenModal(false)} className="btn-cancelar">
              Cancelar
            </Button>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleSave} 
              className="btn-guardar"
            >
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}