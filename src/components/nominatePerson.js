import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const options = [
    { key: 'Aaron', id: 1},
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
    const [nomRegister, setNomRegister] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


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
        // immutating state (best practice)
        const updateList = nomRegister.map((item) => {
            return { ...item };
        });
        //delete the specific array case depends on the id
        updateList.splice(index, 1);
        setNomRegister(updateList);
    };

    const sendNomination = () => {
        console.log("Arry has: "+JSON.stringify(nomRegister));
    };

    const handleChange = (e, i) => {
        const { name, value } = e.target;
        // immutating state (best practice)
        const updateList = nomRegister.map((item) => {
            return { ...item };
        });
        //change the specific array case depends on the id
        updateList[i] = { ...updateList[i], name: name, reason: value };
        setNomRegister(updateList);
    };
  
    return (
        <div className="App">
            <div className="navbar-nav">
                <div className="leftNavItem">
                    <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                </div>
            </div>
            <h1>Nominate a person</h1>
            <div className="nomineeSelectBox">
                <div id="dialog2" className="triangle_down1"/>
                <div className="arrowdown">
                    <Multiselect
                        onSelect={handleTypeSelect}
                        onRemove={handleTypeRemove}
                        options={selectedOption.length + 1 === maxOptions ? [] : options}
                        displayValue="key"
                        showCheckbox={true}
                        emptyRecordMsg={"Maximum nominees selected !"}
                    />

                </div>
            </div>
            <form onSubmit={handleSubmit(sendNomination)}>
            <div className="nomineesSelectedList">
                <h4>Selected Nominees</h4>
                {selectedOption.map((x, i) =>
                    <div key={i}>
                        <div className="row eachrecord">
                        <div className="column" >
                            <label className="nomlabel">{x[i].key} <b>>></b></label>
                        </div>
                        <input
                            required type='textarea'
                            placeholder="Please provide reason for nomination.."
                            key={i}
                            id={i}
                            name={x[i].key}
                            className='nomineechoosed'
                            onChange={(e) => handleChange(e, i)}
                        />
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="buttongroup">
                        <input id="Submit" type="submit" value="Submit"/>
                        <input id="Cancel" type="button" value="Cancel"/>
                    </div>

                </div>
            </div>
            </form>
        </div>

        
    )
}

export default NominatePerson