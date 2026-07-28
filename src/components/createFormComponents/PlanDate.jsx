import {Form,  Row, Col} from "react-bootstrap"
import { useContext, useRef } from "react"
import  CreatePlanContext from "../../context/CreateFormContext"

function PlanDate() {
	const [form, functions] = useContext(CreatePlanContext);

	return <Row className="align-items-left">
				<Form.Group as={Row} id="raceDate">
					<Form.Label column sm={2}>Race Date:</Form.Label>
					<Col sm={2}>
						<Form.Control type="date" 
							value={form.date} 
							onChange={(e) => functions.setDate(e.target.value)} />
					</Col>
				</Form.Group>
		</Row>

}

export default PlanDate
