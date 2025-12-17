import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a', color: 'white' }}>
      <Sidebar /> {/* Esto arregla el espacio lateral */}
      <Box sx={{ flexGrow: 1, p: 4, ml: '260px' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Panel de Control</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: 'rgba(30, 41, 59, 0.5)', color: 'white', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
              <CardContent>
                <Typography sx={{ color: '#94a3b8' }}>Clubes Activos</Typography>
                <Typography variant="h3" fontWeight="bold">12</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}