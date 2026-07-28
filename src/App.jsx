import { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
//Pages and components
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import CreatePlan from './pages/CreatePlan'
import CreateType from './pages/CreateType'
import NotFound from './pages/NotFound'
//Contexts
import CurrentUserContext from "./context/CurrentUserContext";

function App() {
  // State variables for context
  const [user, setUser] = useState();
  const [types, setTypes] = useState();
  const [planList, setPlanList] = useState();

  return (
    <CurrentUserContext.Provider value={[
		{userId: user, setUser: setUser},
		{planList: planList, setPlanList: setPlanList},
		{types: types, setTypes: setTypes}
	]}>
		<NavBar />
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/create" element={<CreatePlan distance={"0"} unit="mi"/>} />
			<Route path="/create/5k" element={<CreatePlan distance="5" unit="kl"/>} />
			<Route path="/create/10k" element={<CreatePlan distance="0" unit="kl"/>} />
			<Route path="/create/half" element={<CreatePlan distance={0} unit="mi"/>} />
			<Route path="/create/full" element={<CreatePlan distance={26} unit="mi"/>} />
			<Route path="/createType" element={<CreateType />} />	
			<Route path="*" element={<NotFound />} />
		</Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
