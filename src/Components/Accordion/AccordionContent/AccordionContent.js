import React, {useState} from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";

const AccordionContent = ({appType, title, isActive}) => {
   const [active, setActive] = useState(isActive);

   {/* replace author: null or author.name: null to empty string*/}
   const tableRows = appType.map(tr => (
         <tr key={tr.id}>
            <td className='app-name'>
               <Link to={`/#${tr.app.split(" ").join("-")}`}>{tr.app ? tr.app : ''}</Link>
            </td>
            <td className='author'>
               <Link to={`/#${tr.app.split(" ").join("-")}`}>{tr.author && tr.author.name ? tr.author.name : ''}</Link>
            </td>
            <td className='version'>
               <Link to={`/#${tr.app.split(" ").join("-")}`}>{tr.version ? tr.version : ''}</Link>
            </td>
         </tr>
      )
   )

   return (
      <div className='accordion-item'>
         <button className='accordion-header' onClick={() => setActive(!active)}>
            {title}
            <span className={`accordion-icon ${active ? 'open' : 'close'} `}/>
         </button>
         {active
            ? <div className="accordion-body">
               <Router>
                  <table>
                     <thead>
                     <tr>
                        <th className='app-name'>Application name</th>
                        <th className='author'>Author</th>
                        <th className='version'>Version</th>
                     </tr>
                     </thead>
                     <tbody>
                     {tableRows}
                     </tbody>
                  </table>
               </Router>
            </div>
            : null
         }
      </div>
   );
};

export default AccordionContent;
