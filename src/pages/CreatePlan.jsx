import {Container, Button, Form, Col, Row} from 'react-bootstrap'
import {React, useContext, useEffect, useState} from 'react'
import {useNavigate } from "react-router";
import {supabase} from "../lib/supabaseClient"
import PlanDist from '../components/PlanDist'
import PlanDays from '../components/PlanDays'
import PlanDate from '../components/PlanDate'
import CreatePlanContext from "../context/CreateFormContext";
/* props.distance
	props.unit */

const PLAN_MIN = 14;
const currentUser = "-";

function CreatePlan(props) {	
	const customPlan = (Number(props.distance) === 0); // this should be set on inital load and does not change

	// Form data state variables:
	const [distance, setDistance] = useState(props.distance);
	const [unit, setUnit] = useState(props.unit);
	const [date, setDate] = useState("");  // Race Date
	const [dayArray, setDayArray] = useState([0,0,0,0,0,0,0]);

	function checkInputs() {
		if (isNaN(Number(distance))) {
			return "Distance must be a valid number!";
		}

		if ((unit !== "mi") && (unit !== "kl")) {
			// don't think we can hit this with radio buttons, but to be safe
			return "Distance must have a unit (mi or kl)!";
		}

		let dateObj = Date.parse(date);
		let today = Date.now();
		if (isNaN(dateObj)) {
			return "Race date must be specified";
		}

		let daysToTarget = dateObj - today;
		if (daysToTarget < 0) {
			return "Race date cannot be in the past";	
		}	
		if (daysToTarget < PLAN_MIN) {
			return `Cannot build a plan less than ${PLAN_MIN} days long`;
			console.log(today);
		}
	
		if (dayArray.some((value) => {
					if (value === 0 || value === "") return true;
					
				})) {
			return "One or more days are missing a type";
		};	
		return;
	}
	
	function generatePlanFromInputs() {
		let errStr = checkInputs();
		if (errStr) {
			alert("Input errors found:\n" + errStr);
			return;
		}
		//TODO popup modal to input name
		alert("Plan created successfully!");

	}

	let	nav = useNavigate();
	function cancelForm() {
		alert("Plan cancelled");
		//return to homepage
		nav("/");
	}

	return (<>
		<CreatePlanContext.Provider value={[
				 // store form data in context:
				{ "distance": distance,
					"unit": unit,
					"date": date,
					"dayArray": dayArray
				},
				{ "setDistance": setDistance,
					"setUnit": setUnit,	
					"setDate": setDate,
					"setDayArray": setDayArray,
				}
			]}>
			<br/>
			<h3 align="left">Create new plan:</h3>
			<hr/>
			<h4 align="left">Race Information:</h4>
			<PlanDist custom={customPlan}/>
			<PlanDate/>
			<hr/>
			<h4 align="left">Day Planning:</h4>
			<PlanDays />
			<hr/>
			<Container>
				<Row>
					<Col>
						<Button 
							variant="secondary"
							onClick={() => cancelForm()}
						> CANCEL </Button>
					</Col>
					<Col>
						<Button 
							variant="success" 
							onClick={() => generatePlanFromInputs()}
						> CREATE </Button>
					</Col>
				</Row>
			</Container>
			<hr/>
		</CreatePlanContext.Provider>
	</>)
}

export default CreatePlan 
