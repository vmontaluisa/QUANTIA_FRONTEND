import React from 'react';
import { Paper, Typography, Box } from '@mui/material';



interface NubeTerminosProps {
  title: string;
  datos: { text: string; size: number }[];
}

const NubeTerminos: React.FC<NubeTerminosProps> = ({ title, datos }) => {
    return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {(() => {
          const maxSize = Math.max(...datos.map(d => d.size));
          const minFont = 7;
          const maxFont = 25;

          return datos.map((term, i) => {
            const scaledSize = minFont + ((term.size / maxSize) * (maxFont - minFont));
            return (
              <Box
                key={i}
                component="span"
                sx={{
                  position: 'relative',
                  '&:hover::after': {
                    content: `"${term.text}: ${term.size} coincidencias"`,
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: 'yellow',
                    color: 'blue',
                    fontSize: '13px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: 1,
                    zIndex: 1,
                    mt: 0.5,
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: `${scaledSize}px`,
                    color: i % 2 === 0 ? '#1976d2' : 'green',
                    fontWeight: 'bold',
                  }}
                >
                  {term.text}
                </Typography>
              </Box>
            );
          });
        })()}
      </Box>
    </Paper>
  );
};

export default NubeTerminos;
