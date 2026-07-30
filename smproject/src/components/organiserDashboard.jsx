import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';

function OrganiserDashboard() {
  const [{ organiserName, organiserId, role, assignedEvent }] = useStateValue();
  console.log(assignedEvent);

  const displayName = organiserName || 'Organiser';
  const displayId = organiserId || 'Pending';
  const displayRole = role || 'Event Staff';

  return (
    <AnimatedPage>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          padding: { xs: '16px', sm: '24px', md: '32px' },
          boxSizing: 'border-box',
        }}
      >
        <Box>
          <Typography variant="h4" fontFamily="'nevis', sans-serif" color="#000000" gutterBottom>
            Organiser Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {displayName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Organiser ID: {displayId}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`Role: ${displayRole}`} color="warning" />
            </Stack>
          </Stack>
        </Paper>

        <Box display="flex" flexWrap="wrap" gap={2} width = "30%" justifyContent={'center'} margin={'auto'}>

          <Paper elevation={2} sx={{ flex: '1 1 220px', p: 2.5, borderRadius: 2 , width : "50%"}}>
            <Typography variant="subtitle2" color="text.secondary">Event Assigned</Typography>
            <Typography variant="h4" mt={1} fontWeight={700}>{assignedEvent.eventName}</Typography>
          </Paper>
        </Box>
      </Box>
    </AnimatedPage>
  );
}

export default OrganiserDashboard;

