import React, { useEffect, useState, useRef } from 'react';
import {timeSortFunction} from './parseData';

function Lineup(props) {
	return (
		<div className="lineup-wrapper">
	        {props.stages.map(stage => <Stage name={stage} data={props.data} mySchedule={props.mySchedule} editSchedule={props.editSchedule} />)}
	    </div>
	);
}

function Stage(props) {

	const [acts, setActs] = useState([]);

	useEffect(() => {
		let tempActs = props.data.filter(act => act.stage === props.name);
		tempActs.sort(timeSortFunction);
		setActs(tempActs);
	}, [props.data]);

	return (
		<div className="stage-wrapper">
			<h2>{props.name}</h2>
			{acts.map(item => <Artist data={item} mySchedule={props.mySchedule} editSchedule={props.editSchedule}/>)}
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