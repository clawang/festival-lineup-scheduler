import React, { useEffect, useState, useRef } from 'react';
import {idsToSchedule, findConflicts, splitActs, findGaps, findArtistsWithinTime} from './parseData';
import pin from './images/pin.png';

function Schedule(props) {

	const [schedule, setSchedule] = useState([]);
	const [conflicts, setConflicts] = useState({});
	const [gaps, setGaps] = useState({});

	useEffect(() => {
		let tempSched = idsToSchedule(props.mySchedule, props.data);
		let tempConflicts = findConflicts(tempSched);
		let tempGaps = findGaps(tempSched);
		console.log(tempGaps);
		setSchedule(tempSched);
		setConflicts(tempConflicts);
		setGaps(tempGaps);
	}, [props.mySchedule]);

	const createSchedule = () => {
		let rows = [];
		schedule.forEach((act, i) => {
			if(gaps.hasOwnProperty(i)) {
				rows.push(<Gap 
					key={gaps[i][0].concat(gaps[i][1])}
					data={gaps[i]} 
					allActs={props.data} 
					editSchedule={props.editSchedule} />);
			}
			if(act.conflict && conflicts.hasOwnProperty(i)) {
				rows.push(<Conflict data={conflicts[i]} editSchedule={props.editSchedule} />);
			} else if(!act.conflict) {
				rows.push(<ScheduleItem data={act} />);
			}
		});
		if(schedule.length <= 0) {
			rows.push(<p>Nothing here yet.</p>);
		}
		return rows;
	}

	return (
		<div className="schedule-wrapper">
			<h2>Your Schedule</h2>
			{createSchedule()}
		</div>
	);
}

function Conflict(props) {

	const split = () => {
		const firstAct = props.data[0];
		const secondAct = props.data[1];
		splitActs(firstAct, secondAct);
	}

	return (
		<div className="conflict-wrapper">
			<h3>These two acts conflict:</h3>
			<div className="conflict-acts-wrapper">
				<Act data={props.data[0]} context={1} editSchedule={props.editSchedule} />
				<Act data={props.data[1]} context={1} editSchedule={props.editSchedule} />
			</div>
			<button onClick={split}>See both</button>
		</div>
	);
}

function Gap(props) {

	const [artists, setArtists] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		let tempArtists = findArtistsWithinTime(props.data[0], props.data[1], props.allActs);
		setArtists(tempArtists);
	}, [setArtists]);

	return (
		<div className="gap-wrapper">
			<h3>There's a gap in your schedule.</h3>
			{artists.length > 0 ?
				<div>
					<p>Here are some artists playing within this time.</p>
					<div className={"gap-artists-wrapper" + (open ? ' open' : '')}>
						{artists.map(act => <Act data={act} editSchedule={props.editSchedule} />)}
					</div>
					<a onClick={() => setOpen(!open)}>{open ? 'Collapse' : 'See All →'}</a>
				</div>
				:
				<p>Maybe get some food or something idgaf</p>
			}
		</div>
	);
}

function ScheduleItem(props) {
	return (
		<div className="schedule-item-wrapper">
			<p>{props.data.startTime} - {props.data.endTime}</p>
			<h3>{props.data.name}</h3>
			<div className="schedule-item-location">
				<img src={pin} />
				<h4>{props.data.stage}</h4>
			</div>
		</div>
	);
}

function Act(props) {

	const handleClick = (e) => {
		props.editSchedule(props.data.id);
	}

	return (
		<div className="act-wrapper" onClick={handleClick} style={{cursor: 'pointer'}}>
			<p>{props.data.startTime} - {props.data.endTime}</p>
			<h3>{props.data.name}</h3>
			<div className="act-location">
				<img src={pin} />
				<h4>{props.data.stage}</h4>
			</div>
			<a className="action">{props.context ? 'Remove' : 'Add'}</a>
		</div>
	);
}

export default Schedule;