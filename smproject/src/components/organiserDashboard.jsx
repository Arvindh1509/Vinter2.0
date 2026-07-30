import React from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';
import './organiserDashboard.css';

function OrganiserDashboard() {
  const [{ organiserName, organiserId, role, assignedEvent }] = useStateValue();
  console.log(assignedEvent);

  const displayName = organiserName || 'Organiser';
  const displayId = organiserId || 'Pending';
  const displayRole = role || 'Event Staff';

  return (
    <AnimatedPage>
      <Box className="organiser-dashboard-page">
        <Box>
          <Typography variant="h4" className="organiser-dashboard-title" gutterBottom>
            Organiser Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
          </Typography>
        </Box>

        <Paper elevation={3} className="organiser-info-card">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={2}
          >
            <Box>
              <Typography variant="h5" className="organiser-info-name">
                {displayName}
              </Typography>
              <Typography variant="body1" className="organiser-info-id">
                Organiser ID: {displayId}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`Role: ${displayRole}`} color="warning" />
            </Stack>
          </Stack>
        </Paper>

        <Box className="event-assigned-wrapper">
          <Paper elevation={2} className="event-assigned-card">
            <Typography variant="subtitle2" className="event-assigned-label">Event Assigned</Typography>
            <Typography variant="h4" className="event-assigned-value">{assignedEvent.eventName}</Typography>
          </Paper>
        </Box>
      </Box>
    </AnimatedPage>
  );
}

export default OrganiserDashboard;

