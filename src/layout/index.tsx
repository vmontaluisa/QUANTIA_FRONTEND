import { Box, Paper, Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { ReactNode, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { login as loginService, getCurrentUser } from '../services/authService';
import logoPequeno from '../assets/logo_pequeno_1.png';

const drawerWidth = 100;

const Layout = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   useEffect(() => {
     const checkAuth = async () => {
       try {
         await getCurrentUser();
         setIsAuthenticated(true);
       } catch {
         setIsAuthenticated(false);
       }
     };
     checkAuth();
   }, []);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [loginError, setLoginError] = useState('');
   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoginError('');
     try {
       await loginService(username, password);
       const user = await getCurrentUser();
       if (user) {
         setIsAuthenticated(true);
         window.location.reload();
       }
     } catch (err) {
      console.error('Error de inicio de sesión:', err);
       const status = err?.response?.status;
       const detalle = err?.response?.data?.detail;
       setLoginError(`${status || ''} - ${detalle || 'Error al iniciar sesión'}`);
     }
   };
  if (!isAuthenticated) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form
          onSubmit={handleLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minWidth: 450,
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '2rem',
            backgroundColor: '#fff'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <img src={logoPequeno} alt="Logo Quantia" style={{ height: '120px' }} />
       
          </div>
          <TextField
             label="Usuario"
             variant="outlined"
             fullWidth
             size="medium"
             required
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
           <TextField
             label="Contraseña"
             variant="outlined"
             type="password"
             fullWidth
             size="medium"
             required
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
          {loginError && (
            <Box sx={{
              color: 'red',
              maxWidth: '400px',
              textAlign: 'justify',
              alignSelf: 'center',
              padding: '0.5rem',
              borderRadius: '4px',
              backgroundColor: '#ffe6e6'
            }}>
              {loginError}
            </Box>
          )}
           <Button
             variant="contained"
             fullWidth
             sx={{
               mt: 2,
               py: 2,
               backgroundColor: '#1976d2',
               color: '#fff',
               fontWeight: 'bold',
               boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
               '&:hover': {
                 backgroundColor: '#115293',
               },
             }}
             type="submit"
             startIcon={<LoginIcon />}
           >
             Iniciar sesión
           </Button>
         </form>
       </Box>
     );
   }



  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'fixed', top: 0, left: `${drawerWidth+100}px`, right: 0, zIndex: 0 }}>
          <Header />
        </Box>

        <Box
          sx={{
            flex: 1,
            mt: '48px', // altura aproximada del header
            mb: '8px',  //altura aproximada del footer
            overflowY: 'auto',
            p: 3,
          }}
        >
          {children}
        </Box>

        <Box sx={{ position: 'fixed', bottom: 0, left: `${drawerWidth}px`, right: 0, zIndex: 1200 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;