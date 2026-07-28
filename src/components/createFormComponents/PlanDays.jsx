import { Form } from "react-bootstrap"
import { useContext } from "react"
import PlanOneDay from './PlanOneDay'
import CreatePlanContext from "../../context/CreateFormContext";

function PlanDays() {
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	return <div style={{textAlign:'left'}}>
		<ul>
			{days.map((day) => {
					return <li key={day}>
							<PlanOneDay day={day} ix={days.indexOf(day)}/>
						  </li>
				})
			}
			</ul>
		</div>
}
export default PlanDays
