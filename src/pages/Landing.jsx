import { useContext, useEffect, useState } from "react"
import CurrentUserContext from "../context/CurrentUserContext"
import UserHomePage from "./UserHomePage"
import LoginHomePage from "./LoginHomePage"

function Landing() {
	let user = useContext(CurrentUserContext)[0].userId;
	if (!user) user = sessionStorage.getItem("login user");
	
	console.log("landing page user: ", user);
	
	return <>{user ? <UserHomePage/> : <LoginHomePage/>}</>
}
export default Landing
