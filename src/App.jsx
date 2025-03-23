import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Container, useMediaQuery, useTheme, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight, Close } from '@mui/icons-material';

const truckViews = [
  {
    id: 'front',
    image: './truck-front.svg',
    hotspots: [
      { id: 'engine', title: 'Motor', description: 'Motor de alta potencia con tecnología avanzada', position: { top: '65%', left: '50%' } },
      { id: 'lights', title: 'Luces', description: 'Sistema de iluminación LED de alta intensidad', position: { top: '42%', left: '38%' } },
    ]
  },
  {
    id: 'side',
    image: './truck-side.svg',
    hotspots: [
      { id: 'wheels', title: 'Ruedas', description: 'Neumáticos de alta resistencia para todo terreno', position: { top: '67%', left: '35%' } },
      { id: 'cabin', title: 'Cabina', description: 'Cabina ergonómica con controles intuitivos', position: { top: '45%', left: '85%' } },
    ]
  },
  {
    id: 'back',
    image: './truck-back.svg',
    hotspots: [
      { id: 'cargo', title: 'Área de Carga', description: 'Amplio espacio de carga con sistema de seguridad', position: { top: '45%', left: '50%' } },
      { id: 'exhaust', title: 'Sistema de Escape', description: 'Sistema de escape optimizado para reducir emisiones', position: { top: '71%', left: '25%' } },
    ]
  }
];

const modalStyle = (isMobile) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isMobile ? '90%' : 400,
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  p: isMobile ? 2 : 4,
  borderRadius: 3,
  outline: 'none',
  backdropFilter: 'blur(8px)',
});

const welcomeModalStyle = (isMobile) => ({
  ...modalStyle(isMobile),
  width: isMobile ? '90%' : '60%',
  textAlign: 'center',
});

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.5 }
};

const buttonStyle = {
  bgcolor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 1)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentView, setCurrentView] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(true);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setWelcomeModalOpen(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleNextView = () => {
    setCurrentView((prev) => (prev + 1) % truckViews.length);
  };

  const handlePrevView = () => {
    setCurrentView((prev) => (prev - 1 + truckViews.length) % truckViews.length);
  };

  const handleHotspotClick = (hotspot) => {
    setSelectedHotspot(hotspot);
    setModalOpen(true);
  };

  const getHotspotScale = (hotspotId) => {
    return selectedHotspot && selectedHotspot.id === hotspotId ? 1.5 : 1;
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      position: 'relative',
      overflow: 'hidden',
      p: isMobile ? 2 : 4,
      mx: 'auto',
      boxSizing: 'border-box',
      gap: 4
    }}>
      <Container maxWidth="sm" sx={{ 
        textAlign: 'center', 
        mb: isMobile ? 2 : 4,
        px: isMobile ? 1 : 2,
        position: 'relative',
        zIndex: 1,
        mx: 'auto'
      }}>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: isMobile ? 1 : 2,
            fontSize: isMobile ? '1.5rem' : '3.75rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            wordBreak: 'break-word',
            lineHeight: isMobile ? 1.2 : 1.3
          }}>
            Camion X100
          </Typography>
          <Typography variant="h5" sx={{ 
            color: 'text.secondary', 
            mb: 4, 
            fontSize: isMobile ? '0.9rem' : '1.5rem',
            px: isMobile ? 1 : 0
          }}>
            Explora la historia y características de nuestro camión minero
          </Typography>
        </motion.div>
      </Container>

      <Box sx={{ 
        position: 'relative', 
        width: '100%',
        maxWidth: isMobile ? '95%' : '80%',
        height: isMobile ? '50vh' : '70vh',
        mt: isMobile ? 2 : 3,
        mx: 'auto',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        borderRadius: 4,
        bgcolor: 'background.paper',
        p: isMobile ? 2 : 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            {...pageTransition}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <img
              src={truckViews[currentView].image}
              alt={`Vista ${currentView + 1} del camión`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                maxWidth: '100%',
                maxHeight: '100%',
                transform: isMobile ? 'scale(0.9)' : 'scale(1.1)',
                transition: 'transform 0.3s ease',
                margin: 'auto'
              }}
            />
            
            {truckViews[currentView].hotspots.map((hotspot) => (
              <motion.div
                key={hotspot.id}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: getHotspotScale(hotspot.id) }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  ...hotspot.position,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3
                }}
              >
                <IconButton
                  onClick={() => handleHotspotClick(hotspot)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    padding: isMobile ? '4px' : '8px',
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                >
                  <ZoomIn fontSize={isMobile ? 'small' : 'medium'} />
                </IconButton>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <IconButton
          onClick={handlePrevView}
          sx={{
            ...buttonStyle,
            position: 'absolute',
            left: isMobile ? '5px' : '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: isMobile ? '8px' : '16px',
            zIndex: 2
          }}
        >
          <ChevronLeft fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>

        <IconButton
          onClick={handleNextView}
          sx={{
            ...buttonStyle,
            position: 'absolute',
            right: isMobile ? '5px' : '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: isMobile ? '8px' : '16px',
            zIndex: 2
          }}
        >
          <ChevronRight fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
      </Box>

      <Box sx={{
        width: '100%',
        maxWidth: 'lg',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 3,
        px: isMobile ? 2 : 4,
        mb: 4
      }}>
        <Box sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Potencia Legendaria
          </Typography>
          <Typography variant="body2">
            Con más de 3,500 HP, el LT-2000 establece nuevos estándares en la industria minera.
          </Typography>
        </Box>
        <Box sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Tecnología Avanzada
          </Typography>
          <Typography variant="body2">
            Sistema de conducción autónoma y monitoreo en tiempo real para máxima eficiencia.
          </Typography>
        </Box>
        <Box sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Sostenibilidad
          </Typography>
          <Typography variant="body2">
            Certificación Tier 4 y sistema de recuperación de energía para un futuro más verde.
          </Typography>
        </Box>
      </Box>

      <Box sx={{
        width: '100%',
        maxWidth: 'lg',
        mb: 6,
        px: isMobile ? 2 : 4
      }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Galería de Imágenes
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 3,
          mb: 4
        }}>
          <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            aspectRatio: '16/9',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Box
              component="img"
              src="/truck-front.svg"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
          <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            aspectRatio: '16/9',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Box
              component="img"
              src="/truck-side.svg"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
          <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            aspectRatio: '16/9',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Box
              component="img"
              src="/truck-back.svg"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Box>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="hotspot-modal-title"
        aria-describedby="hotspot-modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
          {selectedHotspot && (
            <>
              <Typography id="hotspot-modal-title" variant="h6" component="h2" gutterBottom>
                {selectedHotspot.title}
              </Typography>
              <Typography id="hotspot-modal-description" sx={{ mt: 2 }}>
                {selectedHotspot.description}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={welcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
      >
        <Box sx={welcomeModalStyle(isMobile)}>
          <Typography id="welcome-modal-title" variant="h4" component="h2" gutterBottom>
            ¡Bienvenido al Explorador de Camiones!
          </Typography>
          <Typography id="welcome-modal-description" sx={{ mt: 2, mb: 4 }}>
            Descubre las características avanzadas de nuestro camión minero LT-2000, equipado con la más alta tecnología y diseñado para maximizar la eficiencia en operaciones mineras. Explora sus diferentes vistas y haz clic en los puntos interactivos para obtener información detallada sobre cada componente.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseWelcomeModal}
            sx={{
              mt: 2,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Comenzar Exploración
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;