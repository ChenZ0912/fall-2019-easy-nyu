import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import CourseDisplay from './components/courseDisplay';
import ProfessorDisplay from './components/professorDisplay'
import Home from './components/home';
import CourseDetail from './components/courseDetail'
import ProfessorProfile from './components/professorProfile'
import UserProfile from './components/userProfile'

function App() {
	return (
		<Router>
			<Route exact path="/course" component={CourseDisplay}></Route>
			<Route exact path="/professor" component={ProfessorDisplay}></Route>
			<Route exact path="/" component={Home}></Route>
			<Route exact path="/course/:id" component={CourseDetail} />
			<Route exact path="/professor/:id" component={ProfessorProfile} />
			<Route exact path="/userprofile/:id" component={UserProfile} />
		</Router>
	);
}

export default App;