import { useContext, useEffect, useState } from "react"
import {supabase} from "../lib/supabaseClient";
import PlanListDisplay from "../components/PlanListDisplay";
import CurrentUserContext from "../context/CurrentUserContext"


function UserHomePage() {
	const [userData, planData, typesData] = useContext(CurrentUserContext);

	const user = sessionStorage.getItem("login user")
	
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
                console.log("data:", data);
				typesData.setTypes(data);
            }
        } //fetchTypes

        fetchTypes();
    }, []);

	useEffect( () => {
		async function fetchPlans() {
			const {data, error} = await supabase
				.from('PLANS')
				.select('name, distance, units, start_date, end_date')
				.eq('user_id', user);
			if (error) {
				alert(error.message);
			} else {
				console.log("plan data: ", data);
				planData.setPlanList(data);
			}
		}// fetchPlans
		fetchPlans();
	}, []);

	console.log(planData);	
	return <>{(planData.planList && planData.planList.length > 0) 
			? <PlanListDisplay planList={planData.planList}/> 
			: <p><br/><em>No Plans Created</em></p>} </>
}

export default UserHomePage
