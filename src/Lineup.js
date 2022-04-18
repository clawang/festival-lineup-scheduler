import React, { useEffect, useState, useRef } from 'react';
import {timeSortFunction} from './parseData';

const dayMap = {
	0: '04/22',
	1: '04/23',
	2: '04/24',
};

function Lineup(props) {

	const [day, setDay] = useState(0);

	return (
		<div>
			<div className="day-wrapper">
	          <button onClick={() => setDay(0)} className={day === 0 ? 'selected' : ''}>Friday</button>
	          <button onClick={() => setDay(1)} className={day === 1 ? 'selected' : ''}>Saturday</button>
	          <button onClick={() => setDay(2)} className={day === 2 ? 'selected' : ''}>Sunday</button>
	        </div>
			<div className="lineup-wrapper">
				<div className="lineup">
		        	{props.stages.map((stage, i) => <Stage key={i} name={stage} data={props.data} day={day} mySchedule={props.mySchedule} editSchedule={props.editSchedule} />)}
		    	</div>
	    	</div>
	    </div>
	);
}

function Stage(props) {

	const [acts, setActs] = useState([]);

	useEffect(() => {
		let tempActs = props.data.filter(act => act.stage === props.name && act.date === dayMap[props.day]);
		tempActs.sort(timeSortFunction);
		setActs(tempActs);
	}, [props.data, props.day]);

	return (
		<div className="stage-wrapper">
			<h2>{props.name}</h2>
			{acts.map(item => <Artist key={item.id} data={item} mySchedule={props.mySchedule} editSchedule={props.editSchedule}/>)}
		</div>
	);
}

function Artist(props) {

	const [schedule, setSchedule] = useState(props.mySchedule);

	useEffect(() => {
		setSchedule(props.mySchedule);
	}, [props.mySchedule])

	const handleClick = (e) => {
		props.editSchedule(props.data.id);
	}

	return (
		<div className={"artist-wrapper" + (schedule.hasOwnProperty(props.data.id) ? ' selected' : '')} onClick={handleClick}>
			<h3>{props.data.name}</h3>
			<p>{props.data.startTime} - {props.data.endTime}</p>
		</div>
	);
}

export default Lineup;