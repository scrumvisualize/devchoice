import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { useGoogleLogin  } from 'react-google-login';
import { refreshToken } from '../utils/refreshToken';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const history = useHistory();
    const { state: { toLocation = "/dashboard" } = {} } = useLocation();

    const onSuccess = (res) =>{
        console.log("Login successfully",res.profileObj);
        const email = res.profileObj.email;
        const image = res.profileObj.imageUrl;
        setUserEmail(email);
        window.localStorage.setItem("loginEmail", email);
        window.localStorage.setItem("userImage", image);
        refreshToken(res);
        history.replace(toLocation);
    }
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login !`
        );
    };
    const {signIn} = useGoogleLogin ({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    })


    return (
        <div className="App">
            <h1>Login</h1>
            <div className="loginForm part1">
                <button onClick={signIn}>
                    <img src="images/google.png" className="loginG"/>
                    <span className="loginText">Sign in</span>
                </button><br></br><br></br>
                <div className="loginDevchoice">
                </div>
            </div>
            <div loginForm part2>
                <img src="images/devchoice.PNG" className="loginAward"/>
                {/*<span className="loginbanner">*/}
                {/*    <pre>Dev Choice Awards !</pre>*/}
                {/*</span>*/}
            </div>
        </div>

    )
}

export default Login;