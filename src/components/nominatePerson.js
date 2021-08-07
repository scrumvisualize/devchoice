import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const options = [
    { key: 'Aaron', key1:"some@test.com", id: 1},
    { key: 'Bader', id: 2},
    { key: 'Crots', id: 3},
    { key: 'Dan', id: 4},
    { key: 'Elep', id: 5},
    { key: 'Pal', id: 6},
    { key: 'Quilt', id: 7}
  ];

const NominatePerson = () => {

    const maxOptions = 3;
    const [selectedOption, setSelectedOption] = useState([]);

    const handleTypeSelect = (e) => {
        const copy = [...selectedOption];
        copy.push(e);
        setSelectedOption(copy);
    };

    const handleTypeRemove = (e) => {
        const copy = [...selectedOption];
        let index = copy.indexOf(e);
        copy.splice(index, 1);
        setSelectedOption(copy);
    };

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
                <Multiselect
                    onSelect={handleTypeSelect}
                    onRemove={handleTypeRemove}
                    options={selectedOption.length + 1 === maxOptions ? [] : options}
                    displayValue="key"
                    showCheckbox={true}
                    emptyRecordMsg={"Maximum nominees selected !"}
                />
            </div>
            <div className="nominateButton">
                <input type="button" value="Next" onClick={onNominate}/>
            </div>
            
            
        </div>

        
    )
}

export default NominatePerson