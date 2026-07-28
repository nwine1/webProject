import {Col, Row, Form} from "react-bootstrap"
import { useContext } from "react"
import CreatePlanContext from "../../context/CreateFormContext"

function PlanDist(props) {
	const [form, functions] = useContext(CreatePlanContext);

	function toggleUnits(e) {
		if (e.target.id === "miRadio") functions.setUnit("mi");
		else functions.setUnit("kl");
	}

	return (<Form>
         <fieldset disabled={!(props.custom)}>
			<Row className="align-items-left">
				 <Form.Group as={Row} controlId="dist">
					 <Form.Label column sm={2}>Distance: </Form.Label>
					 <Col sm={2}>
						 <Form.Control 
							placeholder={form.distance}
							onChange={(e)=>functions.setDistance(e.target.value)}
						 />
					 </Col>
					  <Col sm={4}>
					<Form.Group>
						<Form.Check inline 
							type="radio"
							label="miles" 
							name="unitGroup" 
							id="miRadio" 
							aria-label="miles"
							defaultChecked={form.unit === "mi"}
							onChange={(e) =>toggleUnits(e)}
						/>
						<Form.Check inline 
							type="radio" 
							label="kilometers" 
							name="unitGroup" 
							id="klRadio"	
							aria-label="kilometers"
							defaultChecked={form.unit === "kl"}
							onChange={(e) => toggleUnits(e)}
						/>
					</Form.Group>
					</Col>
				 </Form.Group>
			</Row>
         </fieldset>
	</Form>)
}
export default PlanDist
