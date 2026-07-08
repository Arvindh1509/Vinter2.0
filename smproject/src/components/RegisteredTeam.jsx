import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import axios from '../axios';
import './RegisteredTeam.css';
import { useStateValue } from '../StateProvider';
import AnimatedPage from '../templates/AnimatedPage';

const RegisteredTeam = ({ eventId,eventName, team, schoolId, teamIndex, maxMember }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ activeEvent, schoolName }] = useStateValue();

  const allowedEvents = [
    "Naa ready dhan varava?",
    "Signal & Noise",
    "Vinter Premiere League - Auction",
    "Brand New Day: The First Frame",
    "Vector VOID",
    "Unnai kaanandhu",
    "Vinter CTF – 2026",
    "Sakkarapongalukku vadacurry",
    "Arangam Adhiratumae",
    "Thirai @180°",
    "Chordially yours",
    "Vinter Bowl-Out: Truf Cricket",
    "Vinter Kick-Off: 5-A Side Football"
  ];

  const [participants, setParticipants] = useState(
    team.participants.map((p, index) => ({
      ...p,
      participantId: `${schoolId}${eventId}t${teamIndex}p${index + 1}`
    }))
  );

  const handleNameChange = (index, newName) => {
    const updated = [...participants];
    updated[index].participantName = newName;
    setParticipants(updated);
  };

  const handleAddParticipant = () => {
    if (participants.length >= maxMember) {
      alert(`Maximum of ${maxMember} members allowed.`);
      return;
    }

    const newIndex = participants.length;
    const newParticipant = {
      participantId: `${schoolId}${eventId}t${teamIndex}p${newIndex + 1}`,
      participantName: ''
    };
    setParticipants([...participants, newParticipant]);
  };

  const handleSubmit = async (e) => {
  const hasBlank = participants.some((p) => p.participantName.trim() === '');
      if(hasBlank)
        {alert('Participant Names can not be blank');
          return
        }
   else{
    try {
      await axios.post('/vinterbash/updateTeamParticipants', {schoolId,schoolName,eventId,teamId: team.teamId,participants,})
      .then(() => {
        alert('Updated successfully');
        setIsEditing(false);
      })
      .catch((err) => {
        alert('Failed to update');
      });
    } catch (error) {
      alert(error.response?.data || 'Error updating participants');
    }
   } 
  };

  return (
    <AnimatedPage>
    <Card 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.25) !important', 
        backgroundColor: 'rgba(255, 255, 255, 0.25) !important', 
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '12px', 
        color: '#000000', 
        marginTop: '20px', 
        mb: 3,
        border: 'none !important',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05) !important'
      }}
    >
      <CardContent>
        <Box 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            borderRadius: '6px', 
            width: 'fit-content', 
            px: 2, 
            py: 0.5, 
            mb: 2, 
            color: '#000000',
            border: 'none',
            fontFamily: `'nevis', sans-serif` 
          }}
        >
          <Typography fontSize={14} fontWeight="600">{eventName}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{fontFamily: `'nevis', sans-serif`, fontWeight:'600', color: '#000000'}}>
          Team {teamIndex}
        </Typography>

        {/* Participant fields */}
        {participants.map((p, index) => (
          <Box key={p.participantId} sx={{ mb: 1.5 }}>
            <h5 style={{ marginBottom: '4px', color: '#000000' }}>{`Participant ${index + 1}`}</h5>
            {isEditing ? (
              <input
                type="text"
                value={p.participantName}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Type Candidate's Name"
                className="register_form"
              />
            ) : (
              <Typography sx={{fontFamily: `'nevis', sans-serif`, fontSize:'18px', color: '#000000'}}>{`${p.participantName}`}</Typography>
            )}
          </Box>
        ))}

        {/* Action Buttons */}
        {schoolId != '999'?
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          {!isEditing ?  (
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                color: '#000000',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit Participants
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                color: '#000000',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}

          {/* Show Add Team Member button only for allowed events */}
          {isEditing && allowedEvents.includes(activeEvent) && participants.length < maxMember && (
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                color: '#000000',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }
              }}
              onClick={handleAddParticipant}
            >
              Add Team Member
            </Button>
          )}
        </Box>
        :``
        }
      </CardContent>
    </Card>
    </AnimatedPage>
  );
};

export default RegisteredTeam;