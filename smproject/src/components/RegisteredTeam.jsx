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

const RegisteredTeam = ({ eventId, team, schoolId, teamIndex, maxMember }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ activeEvent, schoolName }] = useStateValue();

  const allowedEvents = [
    "Vinter Kick-Off: 5-A Side Football",
    "Drop the Beat",
    "Nalla Otrainga da Reel-uh!",
    "Acoustic Nirvana",
    "Chordially Yours!"
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

  const handleSubmit = () => {
  const hasBlank = participants.some((p) => p.participantName.trim() === '');
      if(hasBlank)
        {alert('Participant Names can not be blank');
          return
        }
   else{
    axios
      .post('/vinterbash/updateTeamParticipants', {
        schoolId,
        schoolName,
        eventId,
        teamId: team.teamId,
        participants,
      })
      .then(() => {
        alert('Updated successfully');
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to update');
      });
   } 
  };

  return (
    <AnimatedPage>
    <Card sx={{ background: 'linear-gradient(135deg, #F37D00, #FEC000 )', borderRadius: '0.55rem', color: 'white', marginTop: '20px', mb: 3, }}>
      <CardContent>
        <Box sx={{ backgroundColor: 'white', borderRadius: '9px', width: 'fit-content', px: 2, py: 1, mb: 2, color: 'black',fontFamily: `'nevis', sans-serif` }}>
          <Typography fontSize={14}>{activeEvent}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{fontFamily: `'nevis', sans-serif`, fontWeight:'600'}}>
          Team {teamIndex}
        </Typography>

        {/* Participant fields */}
        {participants.map((p, index) => (
          <Box key={p.participantId} sx={{ mb: 1 }}>
            <h5 style={{ marginBottom: '4px' }}>{`Participant ${index + 1}`}</h5>
            {isEditing ? (
              <input
                type="text"
                value={p.participantName}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Type Candidate's Name"
                className="register_form"
              />
            ) : (
              <Typography sx={{fontFamily: `'nevis', sans-serif`, fontSize:'20px'}}>{`${p.participantName}`}</Typography>
            )}
          </Box>
        ))}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {!isEditing ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: 'white', color: 'black' }}
              onClick={() => setIsEditing(true)}
            >
              Edit Participants
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: 'white', color: 'black' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}

          {/* Show Add Team Member button only for allowed events */}
          {isEditing && allowedEvents.includes(activeEvent) && participants.length < maxMember && (
            <Button
              variant="contained"
              sx={{ color: 'black', backgroundColor: 'white' }}
              onClick={handleAddParticipant}
            >
              Add Team Member
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
    </AnimatedPage>
  );
};

export default RegisteredTeam;
