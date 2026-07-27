import {Col, Container, Card, Button, Form, Row } from "react-bootstrap"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

function LoginHomePage() {
	return <>
			<h1>Welcome!</h1>
			<br/>
			<Container>
			<Row>
				<Col xs={6}>
					<LoginForm/>
				</Col>
				<Col xs={6}>
					<RegisterForm/>
				</Col>
			</Row>
			</Container>
		</>
}
export default LoginHomePage
