import React from 'react';
import { GoogleLogin, GoogleLogout} from 'react-google-login';

const clientId = "736393651225-50s6ihtdjais7ss5mfr87l4q962j0g6u.apps.googleusercontent.com"

function Logout() {

    const onSuccess = () =>{
        console.log("Log out successful!")
    }

    return (
        <div id = "signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess = {onSuccess}
            />
        </div>
    )
}



export default Logout;