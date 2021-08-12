import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const NominatePerson = () => {
    const [option, setOption] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [nomRegister, setNomRegister] = useState([{}]);
    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();
    const maxOptions = 3;

    useEffect(() => {
        const fetchData = async () => {
            // const email = localStorage.getItem("loginEmail");
            try {
                const res = await Axios.get('http://localhost:8000/service/nomineeslist');
                const data1 = res.data;
                setOption(data1);
                console.log("Get the list of nominees :" + (JSON.stringify(res.data)));
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    const handleTypeSelect = (e, i) => {
        const copy = [...selectedOption];
        copy.push(e[i]);
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

    option.forEach(option=>{
        option.displayValue=option.name+"\t"+option.email;
    })

    const handleChange = (e, i) => {
        const { name, email, value } = e.target;

        // immutating state (best practice)
        const updateList = nomRegister.map((item) => {
            return { ...item };
        });

        const select_Email = selectedOption.map((item) => {
            return item.email;
        });

        //change the specific array case depends on the id //email:emailList[i],
        updateList[i] = { ...updateList[i], name: name, email: select_Email[i], reason: value };
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
                        onSelect={(e) => handleTypeSelect(e, selectedOption.length)}
                        onRemove={handleTypeRemove}
                        options={selectedOption.length + 1 === maxOptions ? [] : option}
                        displayValue="displayValue"
                        showCheckbox={true}
                        emptyRecordMsg={"Maximum nominees selected !"}
                    />

                </div>
            </div>
            <div className="nominationcount">
            </div>
            <form onSubmit={handleSubmit(sendNomination)}>
            <div className="nomineesSelectedList">
                <h4>Selected Nominees</h4>
                {selectedOption.map((x, i) =>
                    <div key={i}>
                        <div className="row eachrecord">
                        <div className="column" >
                            <label className="nomlabel">{x?.name} <b>>></b></label>
                        </div>
                        <input
                            required type='textarea'
                            placeholder="Please provide reason for nomination.."
                            key={i}
                            id={i}
                            name={x?.name}
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