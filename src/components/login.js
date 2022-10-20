import React, { useRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
//import { useGoogleLogin } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { refreshToken } from "../utils/refreshToken";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const {
    state: {
      toLocation = props.role == "admin" ? "/dashboard" : "/nominatePerson",
    } = {},
  } = useLocation();

  const onSuccess = (res) => {
    console.log("Login successfully", res.profileObj);
    const email = res.profileObj.email;
    const image = res.profileObj.imageUrl;
    setUserEmail(email);
    window.localStorage.setItem("loginEmail", email);
    window.localStorage.setItem("userImage", image);
    refreshToken(res);
    history.replace(toLocation);
  };
  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login !`);
  };
  // const { credentialResponse } = GoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: "offline",
  // });

  const googleSuccess =  async (res) => {  
    console.log('auth.js-googlesuccess-res',res)  
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`)
      .then(res => res.json())
      .then(response => {
        console.log('user Info=',response);
        // console.log("Login successfully", response.profileObj);
        const email = response.email;
        const image = response.picture;
        setUserEmail(email);
        window.localStorage.setItem("loginEmail", email);
        window.localStorage.setItem("userImage", image);
        refreshToken(response);
        history.replace(toLocation);
      })
      .catch(error => console.log(error));    
  };

  const googleError = (error) => {
    console.log('google signin failed-error',error)
}
  return (
    <GoogleOAuthProvider clientId="740899161638-po8ijsehts17h0k6ve34d0jur8ska6p5.apps.googleusercontent.com">
      <div className='App'>
      <h2>Login</h2>
      <div className='loginForm part1'>
        {/* <button onClick={signIn}>
          <img src='images/google.png' className='loginG' />
          <span className='loginText'>Sign in</span>
        </button> */}
        <GoogleLogin
          onSuccess={googleSuccess}
          onError={googleError}
        />
        <br></br>
        <br></br>
        <div className='loginDevchoice'></div>
      </div>
      <div loginForm part2>
        <img src='images/onlineaward.jpg' className='loginAward' />
        <span className="loginbanner">
        <pre><h2>Dev Choice Awards</h2></pre>
        </span>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
