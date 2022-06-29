
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
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
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
    var fileName = tag+ " " + getDateString()+' '+ getTimeString();
    
    fetch('https://sheets.googleapis.com/v4/spreadsheets',{
      method:"POST",
      headers: new Headers({'Authorization': 'Bearer '+ accessToken})
      
    }).then((res) =>{
      return res.json();
    }).then(function(val){
      changeTitle(val.spreadsheetId)
      writeContents(val.spreadsheetId)
      console.log(val);
      console.log(val.spreadsheetId);
      alert(val.spreadsheetUrl)
    });
    function changeTitle(SPREADSHEETID) {
      var title = fileName
      //var replacement = 'hey'
      var spreadsheetId= SPREADSHEETID
      var requests = [];
      // Change the spreadsheet's title.
      requests.push({
        updateSpreadsheetProperties: {
          properties: {
            title: title
          },
          fields: 'title'
        }
      });

      // Find and replace text.
      // requests.push({
      //   findReplace: {
      //     find: find,
      //     replacement: replacement,
      //     allSheets: true
      //   }
      // });
      // Add additional requests (operations) ...

      var batchUpdateRequest = {requests: requests}

      gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: batchUpdateRequest
      }).then((response) => {
        //var findReplaceResponse = response.result.replies[1].findReplace;
        //console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
      });
    }

    function writeContents(spreadsheetId) {
      var values = [
        [
          '기업명',	'담당자연락처',	'담당자',	'보내시는분',	'받으시는분',	'주소',	'연락처',	'종류',	'배송방식'
        ],
        [
          '박훈',	'010-0000-0000',	'홍길동',	'삼화회계법인 남궁진',	'삼화회계법인',	'서울시 강남구 봉은사로 407, 6층 (삼성동, 삼화빌딩)', 	'010-9937-7930',	'2본CF',	'직배'
        ],
        [
          '박훈',	'010-0000-0000',	'홍길동',	'삼화회계법인 남궁진',	'심을두 전무',	'서울특별시 송파구 마천로16 한성나이스빌 202호', 	'010-7101-1496',	'4본CWBM',	'직배'
        ],
        ];
        var body = {
          values: values
        };
        var row_length = values.length
        gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: spreadsheetId,
          range: 'A1'+':I'+row_length,
          valueInputOption: 'RAW',
          resource: body
        }).then((response) => {
          var result = response.result;
          console.log(`${result.updatedCells} cells updated.`);
        });
    }

  }
    
  
  return (
    <div className="App">
      <LoginButton/>
      <LogoutButton/>
      <button onClick = {()=>createFile('New Spreadsheet')}>Create Documents</button>
    </div>
  );
}

export default App;

