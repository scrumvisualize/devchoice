import React, { useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Axios from "axios";
import {Link, useHistory} from 'react-router-dom';


const CreateLink = () => {
    const [isFormCreated, setIsFormCreated] = useState(false);
    const onClickEnableForm = () => setIsFormCreated(true);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [tokenUrl, setTokenUrl] = useState("");
    const [errorDisplay, setErrorDisplay] = useState("");
    const [helperText, setHelperText] = useState('');
    const { handleSubmit, register, formState: { errors } } = useForm();
    const history = useHistory();

   useEffect(()=>{
       const linkUrl = window.localStorage.getItem("tokenlink");
       setTokenUrl(linkUrl);
   })
    const onSubmit = () => {
        const fetchData = async () => {
            try {
                localStorage.setItem("userEmail", email);
                const res = await Axios.put('https://devchoice.simproedge.com/api/service/createlink', { email, token});
                if (res.data) {
                    console.log("Link token created:" + res.data);
                    setEmail("");
                    setToken("");
                    const successMessage = res.data.message;
                    setHelperText(successMessage);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData(); 
    }

    const validateLink = () =>{
        const fetchData = async () => {
            try {
                const email = localStorage.getItem("userEmail");
                const res = await Axios.post('https://devchoice.simproedge.com/api/service/validatelink', { params: { email} });
                if (res.data) {
                    const validToken = res.data;
                    console.log("Get token :" + res.data);
                    const nominationUrl = 'http://localhost:3000/nominate/'+validToken;
                    window.localStorage.setItem("tokenlink", nominationUrl);
                    if( (validToken !== null) || ( validToken !== undefined) || ( validToken !== "")){
                        history.push(`/nominate/${validToken}`);
                    } else{
                        history.push('/errorPage');
                    }
                }
            } catch (e) {
                localStorage.removeItem("tokenlink");
                setErrorDisplay(e.response.data.message);
            }
        }
        fetchData(); 
    }

    return (
        <div className="App">
            <div className="leftNavItem">
                <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="linkForm inputForm">
                <span className="headerLink"><h1>Create a link</h1></span>
                <div className="inputField" >
                    <input name="email" 
                    placeholder="email" 
                    type="text" 
                    value={email}
                    {...register('email',{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="loginErrorTextFormat">{errors.email && <p>{errors.email.message}</p>}</span> 
                </div>
                <div className="inputField" >
                    <input placeholder="token" 
                    name="token" 
                    type="text" 
                    value={token}
                    {...register('token',{
                        required: "Token is required"
                      })}
                    onChange={(e) => setToken(e.target.value)}
                    />
                    <span className="loginErrorTextFormat">{errors.token && <p>Input is not valid</p>}</span> 
                </div>
                <span className="getlinkbutton">
                    <input type="submit"/>
                </span><br></br>
                <span className="getlinkbutton">
                    <button type="button" onClick={validateLink}>Get Link</button>
                </span>
                {
                <div className="linkdetails nominationlink">
                    <pre>{tokenUrl}</pre>
                </div>

                }
                <div className="errorDetails">
                       {errorDisplay}
                </div>
                <label>
                    <span className="loginValidationText">{helperText}</span>
                </label>
            </form>
            
        </div>

    )
}

export default CreateLink