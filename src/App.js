import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './style.scss';
import lineup from './lineup.csv';
import {parseData, extractProp} from './parseData';
import Lineup from './Lineup';
import Schedule from './Schedule';
import bgGradientLeft from './images/homepage-gradient-hero-left.png';
import bgGradientRight from './images/homepage-gradient-hero-right.png';

function App() {

  const [data, setData] = useState([]);
  const [stages, setStages] = useState([]);
  const [mySchedule, setSchedule] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    csvJSON();
  }, [setData]);

  useEffect(() => {
    //console.log(mySchedule);
  }, [mySchedule]);

  const csvJSON = () => {
    fetch(lineup)
    .then(response => response.text())
    .then((str) => {
      let tempData = parseData(str);
      setData(tempData);
      let tempStages = extractProp("stage", tempData);
      setStages(tempStages);
      //console.log(tempData);
    });
  }

  const editSchedule = (id) => {
    let tempSchedule = {...mySchedule};
    if(tempSchedule.hasOwnProperty(id)) {
      delete tempSchedule[id];
    } else {
      tempSchedule[id] = id;
    }
    setSchedule(tempSchedule);
  }

  return (
    <div className="App">
      <div className="background">
        <img src={bgGradientLeft} id="bg1"/>
        <img src={bgGradientRight} id="bg2" />
      </div>
      <div className="content">
        <div className="day-header">
          <h1>Coachella Scheduler</h1>
        </div> 
        <div className="nav-wrapper">
          <button onClick={(e) => setPage(0)}>Lineup</button>
          <button onClick={(e) => setPage(1)}>My Schedule</button>
        </div>
        {page === 0 ?
          <Lineup stages={stages} data={data} mySchedule={mySchedule} editSchedule={editSchedule} />
          :
          <Schedule data={data} mySchedule={mySchedule} editSchedule={editSchedule} />
        }
      </div>
    </div>
  );
}

export default App;
