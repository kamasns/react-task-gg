import React, {useState, useEffect} from 'react';
import './style.scss';
import NavTabs from './Components/NavTabs/NavTabs';
import Accordion from "./Components/Accordion/Accordion";

function App() {
   const [data, setData] = useState([]);
   const [dataLoaded, setDataLoaded] = useState(false);
   const [error, setError] = useState(null);
   const [categoryData, setCategoryData] = useState([]);
   const [activeTab, setActiveTab] = useState(null);
   const [navItems, setNavItems] = useState([]);

   const getData = () => {
      fetch('dataset.json')
         .then(res => res.json())
         .then(res => {
               setData(res);
            },
            (error) => {
               console.log(error);
               setError(`Issue code: ${error}`);
            })
   }
   useEffect(() => {
      getData();
   }, [])

   const datasetWithType = data.filter(dataType => typeof dataType.type === 'string'); //check if dataset has type property
   const datasetTypes = datasetWithType.map(type => type.type);
   const uniqueTypes = new Set(datasetTypes);  //List of unique types
   const firstCategory = uniqueTypes.values().next().value; // first of type

   //update states when data is loaded
   useEffect(() => {
      setNavItems([...uniqueTypes]);
      setActiveTab(firstCategory);
      setCategoryData(data.filter((catData) => catData.type === firstCategory));
      setDataLoaded(true);
   }, [data])

   const clickHandler = (e) => {
      setActiveTab(e.target.innerText);
      setCategoryData(data.filter((catData) => catData.type === e.target.innerText));
   };

   if (error) {
      return<div>Cannot fetch data. {error}</div>
   } else if (!dataLoaded) {
      return <div>Loading...</div>;
   } else {
      return (
         <div className="App">
            <NavTabs
               navItems={navItems}
               clickHandler={clickHandler}
               activeTab={activeTab}/>
            <Accordion content={categoryData}/>
         </div>
      );
   }
}

export default App;
