import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Signin from './Components/Signin'


function App() {
  return (
	<BrowserRouter>
	<Routes>
		<Route path='/' element={<Home/>}/>
		<Route path='/signup' element={<Signup/>}/>
		<Route path='/login' element={<Signin/>}/>
	</Routes>
	</BrowserRouter>
  )
}

export default App