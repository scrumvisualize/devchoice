import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { useHistory } from 'react-router-dom';


const Nominate = () => {

    const { token } = useParams();
    const [formRegister, setRegister] = useState({ _id: "", nomineename: "", email: "", nomineeteam: "", description: "", nominatedby: ""});
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [helperText, setHelperText] = useState('');
    const history = useHistory();

    const onChange = (e) => {
        e.persist();
        setRegister({ ...formRegister, [e.target.name]: e.target.value });
    }
    const initialState = {
        _id:"",
        nomineename: "",
        email: "",
        nomineeteam: "",
        description: "",
        nominatedby: ""
    };
    const onSubmit = () => {
        reset(initialState);
        const fetchData = async () => {
            try {
                const res = await Axios.post('https://devchoice.simproedge.com/api/service/nominateperson', formRegister);
                if (res.data) {
                    console.log("Link token created:" + res.data);
                    const successMessage = res.data.message;
                    setHelperText(successMessage);
                    reset(initialState);
                    setRegister({...initialState});
                }
            } catch (e) {
                console.log(e);
                history.push('/errorPage');
            }
        }
        fetchData();
    }

    return (
        <div className="App">
            <h1>Nominate Person</h1>
            <form onSubmit={handleSubmit(onSubmit)}  className="linkForm inputForm" >
                <div className="inputField" >
                    <input name="nomineename" 
                    placeholder="nominate a person" 
                    type="text" 
                    {...register('nomineename',{
                        required: "Nominate a person is required !",
                        pattern: {
                          value: /^[a-zA-Z\s]/,
                          message: "Invalid name !"
                        }
                      })
                    }
                      onChange={onChange}
                    /> 
                </div>
                <span className="nominateError"><pre>{errors.nomineename && errors.nomineename.message}</pre></span>
                <div className="inputField" >
                    <input name="email" 
                    placeholder="nominee email" 
                    type="text" 
                    {...register('email',{
                        required: "Nominee email is required !",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                           message: "Invalid email address !"
                        }
                      })}
                      onChange={onChange}
                    />
                </div>
                <span className="nominateError"><pre>{errors.email && errors.email.message}</pre></span>
                <div className="inputField" >
                    <input name="nomineeteam"
                           placeholder="nominee team"
                           type="text"
                           {...register('nomineeteam',{
                               required: "Nominee team is required !",
                               pattern: {
                                   value: /^[a-zA-Z\s]/,
                                   message: "Invalid team name !"
                               }
                           })
                           }
                           onChange={onChange}
                    />
                </div>
                <span className="nominateError"><pre>{errors.nomineeteam && errors.nomineeteam.message}</pre></span>
                <div className="inputField" >
                    <textarea name="description" 
                    placeholder="reason for nomination"
                    {...register('description',{
                        required: "Reason for nomination is required !",
                        pattern: {
                            value: /^[a-zA-Z,.!""\s]{10,1000}$/,
                            message: "Min of 10 or not more than 1000 characters !"
                        }
                      })}
                      onChange={onChange}
                    />
                </div>
                <span className="nominateError"><pre>{errors.description && errors.description.message }</pre></span>
                <div className="inputField nominatedby" >
                    <input name="nominatedby" 
                    placeholder="nominated by" 
                    type="text" 
                    {...register('nominatedby',{
                        required: "Nominated by is required !",
                        pattern: {
                          value: /^[a-zA-Z\s]{2,30}$/,
                          message: "Invalid name !"
                        }
                      })}
                      onChange={onChange}
                    /> 
                </div>
                <span className="nominateError"><pre>{errors.nominatedby && errors.nominatedby.message}</pre></span>
                <span className="getlinkbutton">
                    <input type="submit"/>
                </span><br></br><br></br>
                <label>
                    <span className="loginValidationText">{helperText}</span>
                </label>
            </form>
        </div>
    )
}

export default Nominate