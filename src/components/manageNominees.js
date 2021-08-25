import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Papa from 'papaparse';
import {Link} from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ManageNominees = () => {
    const [manageNominees, setManageNominees] = useState([]);
    const [file, setFile] = useState(null);
    const form = useRef(null);
    const isMounted = useRef(false);
    const [state, setState] = React.useState({
        activateNomination: false
    });
    const { control, register, handleSubmit} = useForm()
    const [showCalender, setShowCalender] = useState(false);



    useEffect(()=> {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
           // const email = localStorage.getItem("loginEmail");
            try {
                const res = await Axios.get('http://localhost:8000/service/nomineeslist');
                setManageNominees(res.data);
                console.log("Get the list of nominees :" + res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const submitForm = async (e) => {
        //e.preventDefault();
        if (file == null) {
            alert("Please choose a valid csv file !");
        } else {
            const formData = new FormData(form.current);
            let fileArr = [];
            for (let i = 0; i < file.length; i++) {
                fileArr.push(file[i]);
            }
            formData.append('file', fileArr);
            const res = Axios.put("http://localhost:8000/service/managenominees", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    // successfully uploaded response
                    console.log("Status of Upload: " + res.status);
                })
                .catch((error) => {
                    // error response
                });
        }
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if(event.target.checked){
            setShowCalender(true);
        } else {
            setShowCalender(false);
        }

    };
    const onSave = () => {
        alert("Hello");
    }

    return (
        <div>
            <form ref={form} onSubmit={submitForm} encType="multipart/form-data">
                <div className="leftNavItem">
                    <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                </div>
                <div className="upload_header">
                    <h2>Manage Nominees</h2>
                </div>

                <div className="managenominees">
                <table data-cy="Manage_Nominees">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Given Name</th>
                    <th>Email</th>
                    <th>Access</th>
                    {manageNominees.map(row => {
                        return (
                            <tr>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.access}</td>
                            </tr>
                        );
                    })}
                </table>
                </div>
                <div className="employee_data">
                    <input type="file" name="file" onChange={(e) => setFile(e.target.files)}/>
                    <button data-cy="Upload">Upload</button>
                </div>
                <div className="toggleSwitch">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Admin Activity</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={state.activateNomination} onChange= {handleChange} name="activateNomination" />
                                   }
                                label="Activate Nomination"
                            />
                        </FormGroup>
                    </FormControl>

                    <div className="row">
                        { showCalender ?
                           <>
                           <div className="column">
                            <Controller
                            control={control}
                            name='from-date'
                            render={({ field }) => (
                            <DatePicker
                            placeholderText='Select date'
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                            />
                            )}/>
                           </div>
                               <div className="column">
                            <Controller
                                control={control}
                                name='to-date'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                    />
                                )}
                            />
                           </div>
                               <input type="button" value="Save" onClick={onSave}/>
                           </>
                            :
                            <></>
                        }

                    </div>


                </div>
            </form>
        </div>
    )
}

export default ManageNominees