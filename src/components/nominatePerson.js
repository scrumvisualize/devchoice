import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const options = [
    { key: 'Axe', id: 1},
    { key: 'Bags', id: 2},
    { key: 'Coat', id: 3},
    { key: 'Drum', id: 4},
  ];

const NominatePerson = () => {

    //multiselectRef  = useRef();
    const onNominate = () => {
        alert("hello")
        // ...
    };

  
    return (
        <div className="App">
            
            <div className="navbar-nav">
            
                <div className="leftNavItem">
                    <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                </div>
            </div>
            <h1>Nominate Person</h1>
            <div className="nomineeSelectBox">
                <Multiselect options={options} 
                displayValue="key"
                showCheckbox={true}
                />
            </div>
            <div className="nominateButton">
                <input type="button" value="Next" onClick={onNominate}/>
            </div>
            
            
        </div>

        
    )
}

export default NominatePerson