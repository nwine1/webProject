import { useContext, useEffect, useState } from "react"
import {supabase} from "../lib/supabaseClient";
import PlanListDisplay from "../components/PlanListDisplay";
import CurrentUserContext from "../context/CurrentUserContext"


function UserHomePage() {
	const [userData, planData, typesData] = useContext(CurrentUserContext); // sets plan data and types data 
																			// Reads plan data
	const user = JSON.parse(sessionStorage.getItem("login user"));
	
	useEffect(() => {
        async function fetchTypes() {
            const {data, error} = await supabase
                .from('TYPES')
                .select('title, type_id')
                .order('type_id', {ascending: true})
                .in('user_id', ["*", user])
            if (error) {
                alert(error.message);
            } else {
                //console.log("UserHomePage TYPES data:", data);
				typesData.setTypes(data);
            }
        } //fetchTypes

        fetchTypes();
    }, []);

	useEffect( () => {
		async function fetchPlans() {
			const {data, error} = await supabase
				.from('PLANS_SUMMARY')
				.select('plan_id, name, distance, units, duration, start_date, end_date')
				.eq('user_id', user);
			if (error) {
				alert(error.message);
			} else {
				//console.log("UserHomePage plan data: ", data);
				planData.setPlanList(data);
			}
		}// fetchPlans
		fetchPlans();
	}, []);

	return <>
			{(planData.planList && planData.planList.length > 0) 
				? <PlanListDisplay planList={planData.planList}/> 
				: <p><br/><em>No Plans Created</em></p>}
		   </>
}

export default UserHomePage
