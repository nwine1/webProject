import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function NavBar() {
	const [userData, planData, typesData] = useContext(CurrentUserContext);	

	function logoutUser() {
		sessionStorage.setItem("login user", "");
		userData.setUser("");
		planData.setPlanList("");
		typesData.setTypes("");	
	}
	 
	let user = sessionStorage.getItem("login user");

	let planList = planData.planList;
	console.log(planData);
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
				let unit = plan.unit;
				return <NavDropdown.Item>
					`${name} (${dist}${unit})`
				</NavDropdown.Item>
		});

	}

	return (
		<Navbar bg="primary" variant="light" expand="md">
			<Container>
				<Nav.Item>
					<Nav.Link as={Link} to="/">Home</Nav.Link>
				</Nav.Item>
				{user ? <>
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
					<Button onClick={() => logoutUser()}>Logout</Button>
				</Nav.Item>
		</>	:	<></>}
			</Container>
		</Navbar>
	)
}
export default NavBar
