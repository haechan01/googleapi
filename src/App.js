import logo from './logo.svg';
import './App.css';
import React, { useEffect }  from 'react';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script'


const CLIENT_ID = "736393651225-50s6ihtdjais7ss5mfr87l4q962j0g6u.apps.googleusercontent.com";
const API_KEY = 'AIzaSyCtRM9wRFBrt32eroP9L8NbF3pm3mMxyCw';
const SCOPES = "https://www.googleapis.com/auth/drive"



function App() {
  useEffect(()=> {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };
  })
  function createFile(tag) {
    alert(JSON.stringify(tag))
    var accessToken = gapi.auth.getToken().access_token;

    fetch('https://docs.googleapis.com/v1/documents',{
      method:"POST",
      headers: new Headers({'Authorization': 'Bearer'+accessToken})
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
      <button onClick = {()=>createFile('CPTS 223')}>Create CPTS 223 Notes</button>
    </div>
  );
}

export default App;
