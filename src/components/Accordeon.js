import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function Accordeon() {
  const Accordeon1 =
    "Pour voter, connectez-vous avec votre numéro de carte d'identité, acceptez les conditions d'utilisation, et suivez les instructions pour soumettre votre vote en toute sécurité.";
    const Accordeon2 =
    "Vos informations personnelles sont cryptées et stockées de manière sécurisée. Nous utilisons des technologies de pointe pour garantir la confidentialité et la sécurité de vos données.";
    const Accordeon3 =
    "Si vous rencontrez un problème, contactez notre équipe d'assistance via le bouton l'onglet Assistance sur la page d'accueil. Nous sommes là pour vous aider 24/7.";

  return (
    <div style={{ backgroundColor : "white", paddingTop : 60, paddingLeft : 80, paddingRight : 80, paddingBottom : 40}}>
        <h1 style ={{ color : 'black', fontWeight : 'bolder', fontSize : 30, paddingBottom: 20}}> Questions fréquentes</h1>
    <Accordion >
      <AccordionItem key="1" aria-label="Accordion 1" title="Comment puis-je voter sur cette plateforme ?" style={{ color : 'black', color : 'gray'}}>
        {Accordeon1}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Comment mes informations personnelles sont-elles protégées ?" style={{ color : 'black', color : 'gray'}}>
        {Accordeon2}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Que faire si je rencontre un problème lors du vote ?" style={{ color : 'black', color : 'gray'}}>
        {Accordeon3}
      </AccordionItem>
    </Accordion>
    </div>
  );
}
