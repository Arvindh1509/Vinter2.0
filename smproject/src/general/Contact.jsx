import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Contact.css"; // Optional: Include custom styles if needed
import Navbar from "./Navbar";
import AnimatedPage from "../templates/AnimatedPage";
import bgImage from "../assets/vbash_bg.jpeg";

function Contact() {
  const [eventNames, setEventNames] = useState([]);

  useEffect(() => {
    axios
      .get("/vinterbash/getAllEvents")
      .then((response) => {
      const names = response.data.events.map((e) => e.eventName);
      setEventNames(names);
      console.log("Event Names:", names);
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
    <div
      className="vb-contact-page"
      style={{ "--vb-bg-image": `url(${bgImage})` }}
    >
      <h1 className="Contacttext">Our organizers are just a call away!</h1>

      <h1 className="Contact">Event Organizers:</h1>
      <div className="contactgrid">
      {eventNames.includes("Brand New Day: The First Frame") && (
          <ContactCard name="Srivasthan S" event="Brand New Day: The First Frame" number="9600673224" />
        )}
        {eventNames.includes("Heritage Quest - 2026") && (
          <ContactCard name="R.Srinidhi" event="Heritage Quest - 2026" number="9487996690" />
        )}
        {eventNames.includes("The Triquizzard Tournament 6.0") && (
          <ContactCard name="Adithya.R" event="The Triquizzard Tournament 6.0" number="9943389128" />
        )}
        
        {eventNames.includes("Acoustic Nirvana") && (
          <ContactCard name="Harish Narayan R" event="Acoustic Nirvana" number="7904625596" />
        )}
        {eventNames.includes("Kaapé D Art") && (
          <ContactCard name="Barath Srinivas" event="Kaapé D Art" number="9486400146" />
        )}
        {eventNames.includes("Imitation game") && (
          <ContactCard name="Subhashree" event="Imitation game" number="9600672110" />
        )}
        {eventNames.includes("வாயுள்ள பிள்ளை பிழைத்துக் கொள்ளும்") && (
          <ContactCard name="Yasvanth Rishi S" event="வாயுள்ள பிள்ளை பிழைத்துக் கொள்ளும்" number="9790438181" />
        )}
        {eventNames.includes("முடிவு இங்கே! கதை எங்கே?") && (
          <ContactCard name="Deepikaa" event="முடிவு இங்கே! கதை எங்கே?" number="9865486084" />
        )}
        {eventNames.includes("Ar(T)elic!") && (
          <ContactCard name="Neeraja" event="Ar(T)elic!" number="9789313057" />
        )}
        
        {eventNames.includes("Naa ready dhan varava?") && (
          <ContactCard name="Prithuvi" event="Naa ready dhan varava?" number="9342640410" />
        )}
        {eventNames.includes("Vinter Chess Tournament - 2026") && (
          <ContactCard name="M. Anirudh" event="Vinter Chess Tournament - 2026" number="7550178882" />
        )}
        {eventNames.includes("Vinter CTF – 2026") && (
          <ContactCard name="Vetrithirumagan V" event="Vinter CTF – 2026" number="9047778161" />
        )}
        {eventNames.includes("Cubing") && (
          <ContactCard name="Akshay Kumar BA" event="Cubing" number="8754925976" />
        )}
        {eventNames.includes("Vinter Bowl-Out: Turf Cricket") && (
          <ContactCard name="Acchudan" event="Vinter Bowl-Out: Turf Cricket" number="9361497517" />
        )}
        {eventNames.includes("Vinter Kick-Off: 5-A Side Football") && (
          <ContactCard name="Aakash Charan" event="Vinter Kick-Off: 5-A Side Football" number="9150195165" />
        )}
        {eventNames.includes("The One - Mr and Ms Vinterbash") && (
          <ContactCard name="Jay Shrinivaas" event="The One - Mr and Ms Vinterbash" number="9087476555" />
        )}
        {eventNames.includes("Chordially yours") && (
          <ContactCard name="Ekanath NC" event="Chordially yours" number="8015764279" />
        )}
        {eventNames.includes("Screenplay") && (
          <ContactCard name="Tejasve Rengarajan" event="Screenplay" number="8610893934" />
        )}
        {eventNames.includes("CIPHER") && (
          <ContactCard name="Janani" event="CIPHER" number="9943407111" />
        )}
        {eventNames.includes("Signal & Noise") && (
          <ContactCard name="Kaavia" event="Signal & Noise" number="7395898802" />
        )}
        {eventNames.includes("Vinter Premiere League - Auction") && (
          <ContactCard name="Srivatsan V" event="Vinter Premiere League - Auction" number="9489780407" />
        )}
        {eventNames.includes("Vector VOID") && (
          <ContactCard name="Srivathsan Sriram" event="Vector VOID" number="6374465443" />
        )}
        {eventNames.includes("Aththinthom!") && (
          <ContactCard name="Shridhanya" event="Aththinthom!" number="8667733907" />
        )}
        {eventNames.includes("Sakkarapongalukku vadacurry") && (
          <ContactCard name="Prajesh Krishna MB" event="Sakkarapongalukku vadacurry" number="7548843662" />
        )}
        {eventNames.includes("Arangam Adhiratumae") && (
          <ContactCard name="Prithuvi" event="Arangam Adhiratumae" number="9342640410" />
        )}
        {eventNames.includes("Thirai @180°") && (
          <ContactCard name="Srivathsan Sriram" event="Thirai @180°" number= "6374465443" />
        )}
      </div>

      <h1 className="Contact">Overall Coordinators:</h1>
      <div className="contactgrid">
        <ContactCard name="Srivasthan" number="7010184600" />
        <ContactCard name="Amruthavarshan" number="7010089170" />
        <ContactCard name="Arvindh Lakshman" number="8300475270" />
      </div>

      <h1 className="Contact">Technical Coordinators:</h1>
      <div className="contactgrid">
      <ContactCard name="Arvindh Lakshman" number="8300475270" />
        <ContactCard name="Shrihari" number="8220532903" />
      </div>
    </div>
    </AnimatedPage>
  );
}

export default Contact;