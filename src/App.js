import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
	
	render() {
		 return (
				<div className="mainDiv">
					<div className='formatselector'>
						<h3>1.Select Format</h3><hr/>
						<label className="container">MYSQL
							  <input type="radio" checked="checked" name="radio"/>
							  <span className="checkmark"></span>
						</label>
						<label className="container">CSV
							  <input type="radio" name="radio"/>
							  <span className="checkmark"></span>
						</label>
					</div>
					<div className="sourceselector">
					  <h3>2.Select Source</h3><hr/>
						  <button className="tablinks" onClick={'hello'}>MYSQL</button>
						  <button className="tablinks" onClick={'hello'}>CVS</button>
					
					</div>
					<div className="visualclass">
					  <h3>3.Visuilzer</h3><hr/>
						  <button className="tablinks" onClick={'hello'}>D1</button>
						  <button className="tablinks" onClick={'hello'}>D2</button>
					
					</div>
					
				</div>
		);
	}
}
