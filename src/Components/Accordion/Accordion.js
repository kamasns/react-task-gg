import React from 'react';
import AccordionContent from "./AccordionContent/AccordionContent";

const Accordion = ({content}) => {

   //Mature App which version not starts with 0
   const matureApp = content.filter((app) => app.version ? app.version[0] !== "0" : false);

   //Beta App which version starts with 0
   const betaApp = content.filter((app) => app.version ? app.version[0] === "0" : false);

   return (
      <div className="accordion">
        <AccordionContent appType={matureApp} title='Mature Applications' isActive='true'/>
        <AccordionContent appType={betaApp} title='Beta Applications'/>
      </div>
   );
};

export default Accordion;
