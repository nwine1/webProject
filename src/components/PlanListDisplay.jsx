import { Accordion , Button, Container, Row, Col } from "react-bootstrap";


function PlanListDisplay(props) {
	console.log("PlanListDisplay: ", props);
	let planIx = 0;
	let planDisplay = props.planList ?
			 (props.planList.map((plan) =>  {
				let units = (plan.units === "kl") ? "Kilometers" : "Miles"
				let headerText = `${plan.name}: ${plan.distance} ${units}`

				return <Col key={plan.plan_id}>
						 <Accordion>
							<Accordion.Item eventKey={planIx++}>	
								<Accordion.Header>{headerText}</Accordion.Header>
								<Accordion.Body align="left">
									<ul>
										<li>{`${plan.duration} week plan`}</li>
										<li>{`Start Date: ${plan.start_date}`}</li>
										<li>{`End Date: ${plan.end_date}`}</li>
									</ul>	
									<Button onClick={() => navToSelected(plan.plan_id)}>Open Plan</Button>
								</Accordion.Body>
							</Accordion.Item>	
						</Accordion>
					</Col>

			})
		)
	: <h3>"Loading plans..."</h3>;

	return <Container>
			<h2>Plan List</h2>
				<Row>
					{planDisplay}
				</Row>
		</Container>


}
export default PlanListDisplay
