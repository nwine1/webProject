import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function NavBar() {
	const [userData, planData, typesData] = useContext(CurrentUserContext);	// Clears values on logout
	let useNav = useNavigate();																		// Reads planList
	function logoutUser() {
		sessionStorage.setItem("login user", JSON.stringify(""));
		userData.setUser("");
		planData.setPlanList("");
		typesData.setTypes("");	
		useNav("/");
	}
	 
	let user = JSON.parse(sessionStorage.getItem("login user"));

	let planList = planData.planList;
	let planDropdown = <NavDropdown.Item>No plans defined</NavDropdown.Item>
	if (planList && planList.length > 0) {
		planDropdown = planList.filter((plan)=>{
				// For dropdown, only show current plans
				let end = plan.date;
				let today = Date.now;
				end = Date.parse(end);
				if (end < today) return false;
				return true;
			}).map((plan) => {
				let name = plan.name;
				let dist = plan.distance;
				let unit = plan.units;
				return <NavDropdown.Item key={plan.plan_id}>
					{`${name} (${dist}${unit === "kl" ? "K" : " Mi"})`}
				</NavDropdown.Item>
		});
	}

	return (
		<Navbar bg="primary" variant="dark" expand="md">
			<Container>
				<Nav.Item>
					<Nav.Link as={Link} to="/">Home</Nav.Link>
				</Nav.Item>
				{user ?
					 <>
						<NavDropdown title="My Plans" id="planList">
							{planDropdown}
						</NavDropdown>
						<NavDropdown title="Create New" id="createPlan">
							<NavDropdown.Item as={Link} to="/create/5k"> + 5K</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/create/10k"> + 10K</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/create/half"> + Half Marathon</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/create/full"> + Marathon</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/create"> + Custom</NavDropdown.Item>
						</NavDropdown>
						<Nav.Item>
							<Nav.Link as={Link} to="/createType" color="white">Add Custom Type</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Button onClick={() => logoutUser()}>Logout</Button>
						</Nav.Item>
					</>	
				: <></>}
			</Container>
		</Navbar>
	)
}
export default NavBar
