import { useContext, useEffect,useRef, useState } from "react"
import {Col, Container, Card, Button, Form, Row } from "react-bootstrap"
import {supabase} from "../lib/supabaseClient";
import CurrentUserContext from "../context/CurrentUserContext";
import LoginForm from "../components/LoginForm"

function RegisterForm() {
	const usernameRef = useRef();
	const pw1Ref = useRef();
	const pw2Ref = useRef();
	

	function submitRegistration() {
		let u = usernameRef.current.value;
		if (!u) {
			alert("Must supply username to register!");
			return;
		}
		if (u === "*") {
			alert("Invalid username!");
			return;
		}    
		let pw1 = pw1Ref.current.value;	
		let pw2 = pw2Ref.current.value;	
		if (!pw1 || !pw2) {
			alert("Must supply password and confirm password!");
			return;
		}
		if (pw1 !== pw2) {
			alert("Passwords do not match!");
			return;
		}
		registerUser(u, pw1)
	}

	async function registerUser(u, p) {
		/*
		const {data, error} await supabase
			.from('USERS')
			.

		*/
		alert("User registration failed");
	}

	function cancelRegister() {
		usernameRef.current.value = "";
		pw1Ref.current.value = "";
		pw2Ref.current.value = "";
	}

	return <Card>
			<Card.Title>Create new account</Card.Title>
			<Card.Body>
			<Form>
				<Form.Control placeholder="Username" id="username" ref={usernameRef}/>
				<br/>
				<Form.Control placeholder="Password" id="password" type="password" ref={pw1Ref}/>
				<br/>
				<Form.Control placeholder="Confirm Password" id="confirm password" type="password" ref={pw2Ref}/>
			</Form>
			<br/>
			<Row>
				<Col>
					<Button onClick={()=>cancelRegister()} >Cancel</Button>
				</Col>
				<Col>
					<Button onClick={() => submitRegistration()}>Submit</Button>
				</Col>
			</Row>
			</Card.Body>
		</Card>
}
export default RegisterForm
