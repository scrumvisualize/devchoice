import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import Papa from 'papaparse';
import {Link} from "react-router-dom";


const ManageNominees = () => {
    const [uploadFile, setUploadFile] = React.useState();
    const [manageNominees, setManageNominees] = useState([]);
    const [file, setFile] = useState(null);
    const form = useRef(null);
    const isMounted = useRef(false);

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
            const res = Axios.post("http://localhost:8000/service/managenominees", formData, {
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

    return (
        <div>
            <form ref={form} onSubmit={submitForm} encType="multipart/form-data">
                <div className="leftNavItem">
                    <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                </div>
                <div className="upload_header">
                    <h1>Upload Nominees</h1>
                </div>

                <div className="managenominees">
                <table data-cy="Manage_Nominees">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Access</th>
                    {manageNominees.map(row => {
                        return (
                            <tr>
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
            </form>
        </div>
    )
}

export default ManageNominees