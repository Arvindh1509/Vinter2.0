// server.js or index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000; // or any port you like

// Middleware
app.use(cors()); // allow requests from any origin (dev)
app.use(bodyParser.json()); // to parse JSON bodies

// Dummy database (for testing)
const schools = {
  "Vageesha": {
    password: "123456",  // expected password
    events: ["FIFA Goal Rush", "Triquizzard","Code Rush", "Tech Talk"],
    eventsReg:["FIFA Goal Rush", "Triquizzard"],
    schoolId:1
  },
  "KNMS": {
    password: "abcdef",
    eventsReg: ["Code Rush", "Tech Talk"],
    events: ["FIFA Goal Rush", "Triquizzard","Code Rush", "Tech Talk"],
    fullyRegistered: 2,
    partiallyRegistered: 0,
    notRegistered: 13,
    schoolId:2,
    regTeams:[
         {
        eventId: "cu1",
        eventName: "Triquizzard",
        teams: [
            {
                teamId: "101cu1t1",
                teamName: "Santhanam cu1 t1",
                participants: [
                    {
                        participantId: "101cu1t1p1",
                        participantName: "Shrihari S"
                    },
                    {
                        participantId: "101cu1t1p1",
                        participantName: "Arvindh S"
                    },
                    {
                        participantId: "101cu1t1p1",
                        participantName: "jayavanth S"
                    }
                ]
            },{
                teamId: "101cu1t1",
                teamName: "Santhanam cu1 t1",
                participants: [
                    {
                        participantId: "101cu1t1p1",
                        participantName: "Shrihari S"
                    },
                    {
                        participantId: "101cu1t1p1",
                        participantName: "Arvindh S"
                    },
                    {
                        participantId: "101cu1t1p1",
                        participantName: "jayavanth S"
                    }
                ]
            }
        ]
    }
    
    ],
participants:[
    {
        participantName: "Arun K",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Keerthana R",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Meera S",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Vijay A",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Sneha M",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Arun K",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Keerthana R",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Meera S",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Vijay A",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Sneha M",
        eventName: "Chordially Yours!"
    },
    {
        participantName: "Shrihari S",
        eventName: "No time to Solve"
    },
    {
        participantName: "Shrihari S",
        eventName: "No time to Solve"
    }
]
}
};


// API Endpoint
app.post('/vinterbash/validate', async(req, res) => {
    try{
  const { schoolName, password } = req.body;

  const school = schools[schoolName];

  if (!school) {
    return res.status(404).json({ error: "School not found" });
  }

  if (school.password !== password) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Success
  return res.json({
    schoolName,
    events: school.events,
    schoolId:school.schoolId,
    eventsReg:school.eventsReg
  });
  console.log('returned the data');
  
}
catch(error){
    console.error("Error Accessing")
}
});

app.post('/vinterbash/add_team',async(req,res)=>{
    try {
        const { teamName,p1,p2,p3,activeEvent,schoolId } = req.body;
        console.log(req.body);
        
   // Success
  return res.send('Successfully Pushed the data');
 
    } catch (error) {
         console.error("Error Sending")
    }
})

app.post('/vinterbash/eventTeams',async(req,res)=>{
    try {
        const { schoolName, activeEvent } = req.body;

  if (!schoolName || !activeEvent) {
    return res.status(400).json({ error: "Missing schoolName or activeEvent" });
  }

  const school = schools[schoolName];
  if (!school) {
    return res.status(404).json({ error: "School not found" });
  }

  const regTeams = school.regTeams || [];

  // Find if the event is already registered
  const matchingEvent = regTeams.find(e => e.eventName === activeEvent);

  if (matchingEvent) {
    return res.status(200).json(matchingEvent); // return existing registered team
  } else {
    // Return empty structure for UI to show registration form
    return res.status(200).json({
      eventName: activeEvent,
      eventId: null,
      teams: []
    });
  }
    } catch (error) {
        console.log(error);
        
    }
})

app.post('/vinterbash/updateTeamParticipants',async(req,res)=>{
    try {
        console.log(req.body);
        return res.send('updated successfully')
        
    } catch (error) {
        console.log(error);
        
    }
})

app.post('/vinterbash/registeredEvents',async(req,res)=>{
    try {
        const {schoolName}=req.body;
        const school=schools[schoolName];
        return res.json({
             fullyRegistered: school.fullyRegistered,
             partiallyRegistered: school.partiallyRegistered,
             notRegistered:school.notRegistered
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/vinterbash/eventParticipantMap',async(req,res)=>{
    try {
        const {schoolName}=req.body;
        const school=schools[schoolName];

        return res.json({
            participants:school.participants
        })
    } catch (error) {
        
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
