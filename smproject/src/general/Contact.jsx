import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Contact.css"; // Optional: Include custom styles if needed
import Navbar from "./Navbar";
import AnimatedPage from "../templates/AnimatedPage";

function Contact() {
  const [eventNames, setEventNames] = useState([]);

  useEffect(() => {
    axios
      .get("/vinterbash/getAllEvents")
      .then((response) => {
        setEventNames(response.data.eventNames);
        console.log("Event Names:", response.data.eventNames);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const ContactCard = ({ name, event, number }) => (
    <div className="contactCard">
      <h1>{name}</h1>
      {event && <h2>{event}</h2>}
      <h3>{number}</h3>
    </div>
  );

  return (
    <AnimatedPage>
    <div>
      <h1 className="Contacttext">Our organizers are just a call away!</h1>

      <h1 className="Contact">Event Organizers:</h1>
      <div className="contactgrid">
      {eventNames.includes("DOOMSDAY: The Final Frame") && (
          <ContactCard name="Srivasthan" event="DOOMSDAY: The Final Frame" number="7010184600" />
        )}
        {eventNames.includes("Vinter Goal-Rush: FIFA '25") && (
          <ContactCard name="Arvindh Lakshman" event="Vinter Goal-Rush: FIFA '25" number="83004 75270" />
        )}
        {eventNames.includes("The Triquizzard Tournament 5.O") && (
          <ContactCard name="Srinivasa Raghavan" event="The Triquizzard Tournament 5.O" number="88254 08754" />
        )}
        
        {eventNames.includes("Acoustic Nirvana") && (
          <ContactCard name="Shyam Sundar" event="Acoustic Nirvana" number="8531829818" />
        )}
        {eventNames.includes("Nalla Otrainga da Reel-uh!") && (
          <ContactCard name="Jay Shrinivaas" event="Nalla Otrainga da Reel-uh!" number="9087476555" />
        )}
        {eventNames.includes("Imitation Game") && (
          <ContactCard name="Sabarish" event="Imitation Game" number="9688031731" />
        )}
        {eventNames.includes("Unnai Kaanathu..!!") && (
          <ContactCard name="Jayavarshini" event="Unnai Kaanathu..!!" number="9345758850" />
        )}
        {eventNames.includes("Drop the Beat") && (
          <ContactCard name="Dhixitha" event="Drop the Beat" number="6381066216" />
        )}
        {eventNames.includes("Ar(T)elic!") && (
          <ContactCard name="Neeraja" event="Ar(T)elic!" number="9789313057" />
        )}
        
        {eventNames.includes("Koodu Vittu Koodu") && (
          <ContactCard name="Harshita Sri" event="Koodu Vittu Koodu" number="9344544395" />
        )}
        {eventNames.includes("Time Traveller's Theatre") && (
          <ContactCard name="Subhashree" event="Time Traveller's Theatre" number="9600672110" />
        )}
        {eventNames.includes("Ctrl + Alt + Decrypt") && (
          <ContactCard name="Sundar Kumar" event="Ctrl + Alt + Decrypt" number="6379255328" />
        )}
        {eventNames.includes("No Time To Solve") && (
          <ContactCard name="Akshay Kumar" event="No Time To Solve" number="8754925976" />
        )}
        {eventNames.includes("Vinter Bowl-Out: Turf Cricket") && (
          <ContactCard name="Acchudan" event="Vinter Bowl-Out: Turf Cricket" number="9487473532" />
        )}
        {eventNames.includes("Vinter Kick-Off: 5-A Side Football") && (
          <ContactCard name="Kishanth" event="Vinter Kick-Off: 5-A Side Football" number="7598858465" />
        )}
        {eventNames.includes("Coronation: Mr. & Ms. Vinterbash") && (
          <ContactCard name="Megavarnan" event="Coronation: Mr. & Ms. Vinterbash" number="8270401198" />
        )}
        {eventNames.includes("Chordially Yours!") && (
          <ContactCard name="Sai Shravan" event="Chordially Yours!" number="8903293249" />
        )}
      </div>

      <h1 className="Contact">Overall Coordinators:</h1>
      <div className="contactgrid">
        <ContactCard name="Srivasthan" number="7010184600" />
        <ContactCard name="Amruthavarshan" number="7010089170" />
      </div>

      <h1 className="Contact">Technical Coordinators:</h1>
      <div className="contactgrid">
      <ContactCard name="Arvindh Lakshman" number="8300475270" />
        <ContactCard name="Shrihari" number="8220532903" />
        <ContactCard name="Jayavanth" number="9080832022" />
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Contact;
