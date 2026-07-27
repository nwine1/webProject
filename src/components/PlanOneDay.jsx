import {Col, Row, Form} from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import {supabase} from "../lib/supabaseClient";
import CreatePlanContext from "../context/CreateFormContext";
import CurrentUserContext from "../context/CurrentUserContext";

function PlanOneDay(props) {

	const [form, functions] = useContext(CreatePlanContext);
	const [userData, planData, typesData] = useContext(CurrentUserContext);
	const ix = props.ix;
	
	// Fetch applicable types from database:
	/*
    useEffect(() => {
        async function fetchTypes() {
            const {data, error} = await supabase
                .from('TYPES')
                .select('title, type_id')
                .order('type_id', {ascending: true})
                .in('user_id', ["*", currentUser])
            if (error) {
                alert(error.message);
            } else {
                console.log("data:", data);
                typesData.setTypes(data);
            }
        } //fetchTypes

        fetchTypes();
    }, []);

	*/
	// Map type options object retrieved from supabase to dropdown menu
	let typeSelections = <option key={0}>Loading</option>;
	if (typesData.types) {
		typeSelections = Object.keys(typesData.types).map((type_id) => {
		return <option key={type_id} >{typesData.types[type_id].title}</option>;

	}); 
	}

	// Update the relevant weekday with selected day type
	function updateDay(e) {
		let value = e.target.value;
		let tempDays = [... form.dayArray];

		tempDays[ix] = value;
		functions.setDayArray(tempDays);	
	}

	return	<Form.Group as={Row} className="mb-3" controlId="day">
				<Form.Label column sm={2} >{props.day}: </Form.Label>
				<Col sm={2}>
				<Form.Select sm={1} value={form.dayArray[ix]} onChange={(e)=>updateDay(e)}>
					{typeSelections}
				</Form.Select>
				</Col>
			</Form.Group>
}
export default PlanOneDay
