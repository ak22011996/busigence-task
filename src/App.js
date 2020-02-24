import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileDrop from 'react-file-drop';

export default class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                dbDetail: ['database1', 'database2'],
                csvDetail: [],
                filereader: null
            }
        }
        handleDrop = (files, event) => {
            console.log(files, event);
			console.log('lp');
        }
        sqlLoginAuth = () => {
            var userName = document.getElementById('uname').value;
            var pass = document.getElementById('pass').value;
            var ip = document.getElementById('ip').value;
            document.getElementById('csvtab').style.backgroundColor = '#f1f1f1';
            document.getElementById('mysqltab').style.backgroundColor = '#ddd';
			console.log(userName);
            fetch('http://localhost:3001/sqlLoginAuth', {
                    method: 'POST',
                    headers: {
						'Access-Control-Allow-Origin': '*',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: userName,
                        userpass: pass,
                        ipaddress: ip
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if (res.response == 'success') {
						console.log(res.response);
                        document.getElementById('csvdetailid').style.display = 'none';
                        document.getElementById('dbdetailid').style.display = 'block';
                        this.state.dbDetail.push("AKS121");
                        this.setState({
                            loading: true
                        });
                    } else {
                        alert(res.response);
                    }
                })
        }

        handleFileRead = () => {
            const contents = this.filereader.result;
            console.log(contents);
        }
        handleCSVfile = (file) => {
            console.log(file.name);
            var filterCsvDetail = this.state.csvDetail;
            var isLoaded = false;
            for (var i = 0; i < filterCsvDetail.length; i++) {
                if (filterCsvDetail[i].name == file.name) {
                    isLoaded = true;
                    break;
                }
            }
            if (!isLoaded) {
                this.state.csvDetail.push({
                    name: file.name
                });
            }
            this.setState({
                loading: true
            });

            this.filereader = new FileReader();
            this.filereader.onloadend = this.handleFileRead;
            this.filereader.readAsText(file);
            document.getElementById('mysqltab').style.backgroundColor = '#f1f1f1';
            document.getElementById('csvtab').style.backgroundColor = '#ddd';
            document.getElementById('dbdetailid').style.display = 'none';
            document.getElementById('csvdetailid').style.display = 'block';
        }
        hideShow = (val) => {
            if (val == "csv") {
                document.getElementById('mysqltab').style.backgroundColor = '#f1f1f1';
                document.getElementById('csvtab').style.backgroundColor = '#ddd';
                document.getElementById('dbdetailid').style.display = 'none';
                document.getElementById('csvdetailid').style.display = 'none';
                document.getElementById('myFile').style.display = 'block';
                document.getElementById('sqllogin').style.display = 'none';
            }
            if (val == "mysql") {
                document.getElementById('csvtab').style.backgroundColor = '#f1f1f1';
                document.getElementById('mysqltab').style.backgroundColor = '#ddd';
                document.getElementById('csvdetailid').style.display = 'none';
                document.getElementById('dbdetailid').style.display = 'none';
                document.getElementById('myFile').style.display = 'none';
                document.getElementById('sqllogin').style.display = 'block';
            }
        }
	render() {
		return (
			<div className="mainDiv">
				<div className='formatselector'>
					<h3>1. Select Format</h3><hr/>
					<label className="container">MYSQL
						  <input type="radio" onClick={() =>this.hideShow("mysql")}  name="radio"/>
						  <span className="checkmark"></span>
					</label>
					<div id="sqllogin" style={{display: 'none'}}>
						<input type="text"  id='uname'  placeHolder="Username"/><br/>
						<input type="text"  id='pass'  placeHolder="Password"/><br/>
						<input type="text"  id='ip'  placeHolder="Ip Address"/><br/>
						<button onClick={() => this.sqlLoginAuth()}>Submit</button>
					</div>
					<hr/><label className="container">CSV
						  <input type="radio" onClick={() =>this.hideShow("csv")} name="radio"/>
						  <span className="checkmark"></span>
					</label>
					<input type="file" onChange={e =>this.handleCSVfile(e.target.files[0])} id="myFile"  style={{display: 'none'}}/><br></br>
				</div>
				<div className="sourceselector">
					<h3>2. Select Source</h3><hr/>
					<div className="sourceDiv">
						<div className="tablinks" id="mysqltab">MYSQL</div>
						<div className="tablinks" id="csvtab">CVS</div>
					</div>
					<div id="dbdetailid" style={{display : 'none'}}>
						{this.state.dbDetail.map((v)=>{
								return (<div className='search'>{v}</div>)
							})
						}
					</div>
					<div id="csvdetailid" style={{display : 'none'}}>
						{this.state.csvDetail.map((v)=>{
								return (<div className='search'>{v.name}</div>)
							})
						}
					</div>
				</div>
				<div className="visualclass">
				  <h3>3. Visuilzer</h3><hr/>
						<div id="reactfiledrop">
							<FileDrop onDrop={this.handleDrop}> D1</FileDrop>
						</div>
						<div id="reactfiledrop">
							<FileDrop onDrop={this.handleDrop}> D2</FileDrop>
						</div>
						<div id="reactfiledrop1">
							<FileDrop onDrop={this.handleDrop}> Join</FileDrop>
						</div>
						<div id="reactfiledrop1">
							<FileDrop onDrop={this.handleDrop}> Transform</FileDrop>
						</div>
						<div id="reactfiledrop1">
							<FileDrop onDrop={this.handleDrop}> Output File Type</FileDrop>
						</div> 
				</div>
				<div>
				  <h3>4. Preview</h3><hr/>
				</div>
			</div>      
		);
	}
}
