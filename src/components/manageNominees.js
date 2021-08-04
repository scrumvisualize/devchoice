import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import Papa from 'papaparse';


const ManageNominees = () => {
    const [uploadFile, setUploadFile] = React.useState();
    const [csvData, setCsvData] = useState([]);

    const csvFile = "csv/contacts1.csv";
    const onChange = (e) => {
        e.persist();
        setCsvData({ ...csvData, [e.target.name]: e.target.value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        const dataArray = new FormData();
        dataArray.append("uploadFile", uploadFile);
        Axios.put("http://localhost:8000/service/managenominees", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // successfully uploaded response
      })
      .catch((error) => {
        // error response
      });
        // Papa.parse(csvFile, {
        //     download: true,
        //     header: true,
        //     skipEmptyLines: true,
        //     complete: data => {
        //         setCsvData(data.data);
        //     }
        // });
        //console.log(csvData);
    };


    return (
        <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
                <h1>Upload Data</h1>
                <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
                <input type="submit"/>
                <div className="managenominees">
                <table>
                    {csvData.map(row => {
                        return (
                            <tr>
                                <td>{row.Name}</td>
                                <td>{row.Email}</td>
                            </tr>
                        );
                    })}
                </table>
                </div>
            </form>
        </div>
    )
}

export default ManageNominees