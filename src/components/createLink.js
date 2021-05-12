import React, { useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { useHistory } from 'react-router-dom';


const CreateLink = () => {
    const [isFormCreated, setIsFormCreated] = useState(false);
    const onClickEnableForm = () => setIsFormCreated(true);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [tokenUrl, setTokenUrl] = useState("");
    const { handleSubmit, register, formState: { errors } } = useForm();
    const history = useHistory();

   
    const onSubmit = () => {
        const fetchData = async () => {
            try {
                localStorage.setItem("userEmail", email);
                const res = await Axios.post('http://localhost:8000/service/createlink', { email, token});
                if (res.data) {
                    console.log("Link token created:" + res.data);
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
                const res = await Axios.post('http://localhost:8000/service/validatelink', { params: { email} });
                if (res.data) {
                    const validToken = res.data[0].token;
                    console.log("Get token :" + res.data[0].token);
                    const nominationUrl = 'http://localhost:3000/nominate/'+validToken;
                    window.localStorage.setItem("tokenlink", nominationUrl);
                    const linkUrl = window.localStorage.getItem("tokenlink");
                    
                    if( (validToken !== null) || ( validToken !== undefined) || ( validToken !== "")){
                        history.push(`/nominate/${validToken}`);
                    } else{
                        history.push('/errorPage');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData(); 
    }

    return (
        <div className="App">
            <h1>Create Link</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="linkForm inputForm">
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
                       {tokenUrl}
                    </div>
                }
            </form>
            
        </div>

    )
}

export default CreateLink