import {  Box, Button, Card, CardContent, Typography, TextField} from '@mui/material';
import React, { useState } from 'react';
import axios from '../axios';
import './RegisteredTeam.css';
import { useStateValue } from '../StateProvider';

const RegisteredTeam = ({ eventId,team }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ activeEvent, schoolName }] = useStateValue();

  const [participants, setParticipants] = useState(
    team.participants.map((p) => ({ ...p }))
  );

  const handleNameChange = (index, newName) => {
    const updated = [...participants];
    updated[index].participantName = newName;
    setParticipants(updated);
    // console.log("updated-->",participants);
    
  };

  const handleSubmit = (e) => {
    console.log("updated-->",participants);
    axios.post('/vinterbash/updateTeamParticipants', {
        schoolName,
        eventId: eventId,
        teamId: team.teamId,
        participants,
      })
      .then((res) => {
        alert('Updated successfully');
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update');
      });
  };

  return (
    <Card
      sx={{ backgroundColor: '#D4AB68', borderRadius: '0.55rem',color: 'white', marginTop:'20px', mb: 3,}} >
      <CardContent>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '9px',
            width: 'fit-content',
            px: 2,
            py: 1,
            mb: 2,
            color: 'black',
          }}
        >
          <Typography fontSize={14}>{activeEvent}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Team: {team.teamName}
        </Typography>

        {participants.map((p, index) => (
          <Box key={p.participantId} sx={{ mb: 1 }}>
            {isEditing ? (
              <TextField
                value={p.participantName}
                onChange={(e) => handleNameChange(index, e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
            ) : (
              <Typography>{`Participant ${index + 1}: ${p.participantName}`}</Typography>
            )}
          </Box>
        ))}

        {!isEditing ? (
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
            onClick={() => setIsEditing(true)}
          >
            Edit Participants
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisteredTeam;
