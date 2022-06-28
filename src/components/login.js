import React from 'react';
import { GoogleLogin} from 'react-google-login';

const clientId = "736393651225-50s6ihtdjais7ss5mfr87l4q962j0g6u.apps.googleusercontent.com"

function Login() {
    const onSuccess = (res) => {
        console.log("Login success! current user", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("Login falied! current user", res);
    }


    return(
        <div id = "signInButton">
        <GoogleLogin
            clientId = {clientId}
            buttonText = "Login"
            onSuccess = {onSuccess}
            onFailure = {onFailure}
            cookiePolicy= {'single_host_login'}
            isSignedIn= {true}
        />
    </div>
    )
    
}

export default Login;