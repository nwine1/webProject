import { useContext, useEffect,useRef, useState } from "react"
import {Col, Container, Card, Button, Form, Row } from "react-bootstrap"
import {supabase} from "../lib/supabaseClient";
import CurrentUserContext from "../context/CurrentUserContext";

function LoginForm(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
	const userData = useContext(CurrentUserContext)[0];

	async function fetchUser(u, p) {
		const {data, error} = await supabase
			.from('USERS')
			.select('user_id')
			.eq('user_id', u)
			.eq('password', p);
		if (error) {
			alert(error.message);
		}
		else if (data.length !== 1 || data[0].user_id !== u) {
			alert("Invalid username/password!")
		} else {
			let user =  data[0].user_id;
			userData.setUser(user);
			sessionStorage.setItem("login user", JSON.stringify(user));
		}
	}
	

	function attemptLogin(username, password) {
        if (!username) {
            alert("Username must be provided!");
            return;
        }
        if (!password) {
            alert("Password must be provided!");
            return;
        }
        if (username === "*") {
            alert("Invalid username!");
            return;
        }
        fetchUser(username, password);
    }

    function cancelLogin() {
         usernameRef.current.value = "";
         passwordRef.current.value = "";
    }

	return <Card>
		<Card.Title>Login to Existing Account</Card.Title>
		<Card.Body>
		<Form>
			<Form.Control placeholder="Username" id="username" ref={usernameRef}/>
			<br/>
			<Form.Control placeholder="Password" id="password" type="password" ref={passwordRef}/>
			<br/>
			<br/>
			<Row>
				<Col xs={6}>
					<Button onClick={()=> cancelLogin()}>Cancel</Button>
				</Col>
				<Col xs={6}>
					<Button onClick={()=> attemptLogin(usernameRef.current.value, passwordRef.current.value) }>
						Login
					</Button>
				</Col>
			</Row>
		</Form>
		</Card.Body>
	</Card>
}
export default LoginForm
