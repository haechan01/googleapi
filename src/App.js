
import './App.css';
import React, { useEffect }  from 'react';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script'
// const {google} = require('googleapis');
// const sheets = google.sheets('v4');

const CLIENT_ID = "736393651225-50s6ihtdjais7ss5mfr87l4q962j0g6u.apps.googleusercontent.com";
const API_KEY = 'AIzaSyAeUrWdUsbTSWmoXA1KcEYda2BGli2t9EE';
const SCOPES = 'https://www.googleapis.com/auth/drive'


function App() {
  useEffect(()=> {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
    };
    gapi.load('client:auth2', start);
  });
  function zerofill(i) {
    return (i<10 ? '0' : '')+ i; //10
  }
  function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = zerofill(date.getMonth()+1);
    const day = zerofill(date.getDate());
    return year + '-' + month +'-' + day;
  }
  function getTimeString(){
    const date = new Date();
    return date.toLocaleTimeString();
  }
  
  function createFile(tag) {
    
    var accessToken = gapi.auth.getToken().access_token;
    var fileName = tag+ " Notes " + getDateString()+' '+ getTimeString();

    alert(JSON.stringify(accessToken))
    fetch('https://sheets.googleapis.com/v4/spreadsheets',{
      method:"POST",
      headers: new Headers({'Authorization': 'Bearer '+ accessToken})
    }).then((res) =>{
      return res.json();
    }).then(function(val){
      console.log(val);
      console.log(val.docementId);
    });
    

  }
    
  
  return (
    <div className="App">
      <LoginButton/>
      <LogoutButton/>
      <button onClick = {()=>createFile('Document')}>Create Documents</button>
    </div>
  );
}

export default App;
