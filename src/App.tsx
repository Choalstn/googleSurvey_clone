import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateForm from './Pages/CreateForm';
import Result from './Pages/Result';
import Preview from './Pages/Preview';
import Header from './Components/Header';

function App() {
	return (
		<>
			<Header />
			<div className="body">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<CreateForm />} />
						<Route path="preview" element={<Preview />} />
						<Route path="/result" element={<Result />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
