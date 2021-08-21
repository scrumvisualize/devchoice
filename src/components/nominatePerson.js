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
    const [helperText, setHelperText] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm();
    const maxOptions = 3;
    const history = useHistory();
    const [selectedValues, setSelectedValues] = useState([{}]);
    const [submittedNominees, setSubmittedNominees] = useState([{}]);


    useEffect(()=>{
        const userEmail = localStorage.getItem("loginEmail");
        setUserEmail(userEmail);
    })

    useEffect(() => {
        const fetchData = async () => {
            const userEmail = localStorage.getItem("loginEmail");
            try {
                const res = await Axios.get('http://localhost:8000/service/submittednominations',{userEmail});
                const data1 = res.data;
                setSubmittedNominees(data1);
                console.log("Submitted nominations :" + (JSON.stringify(data1)));
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nomineeslist');
                const data1 = res.data;
                setOption(data1);
                console.log("Get the list of nomineeslist :" + (JSON.stringify(data1)));
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
        console.log("What the Array holds: "+JSON.stringify(nomRegister));
        const headers = {
            'Content-Type': 'application/json'
        };
        const fetchData = async (nomRegister) => {
            try {
                const res = await Axios.post('http://localhost:8000/service/nominateperson', {userEmail, nomRegister}, headers );
                if (res.data) {
                    console.log("Print data:" + res.data);
                    const successMessage = res.data.message;
                    setHelperText(successMessage);
                    const updateList = selectedOption.map((item) => {
                        return { ...item, reason: "" };
                    });
                    setSelectedOption(updateList);
                    setNomRegister(updateList);
                }
            } catch (e) {
                console.log(e);
                setNomRegister(reset);
                setHelperText(e.message);
                //history.push('/errorPage');
                const updateList = selectedOption.map((item) => {
                    return { ...item, reason: "" };
                });
                setSelectedOption(updateList);
                setNomRegister(updateList);
            }
        }
        fetchData(nomRegister);
    };

    option.forEach(option=>{
         option.displayValue = option.name + "\t" + option.email;
        submittedNominees.forEach(item =>{
            if(item.nomineeemail === option.email){
                item.displayValue = item.nomineename + "\t" + item.nomineeemail;
            }
        });
    });

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
        updateList[i] = { ...updateList[i], name: name, email: select_Email, reason: value };
        setSelectedOption(updateList);
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
                        disablePreSelectedValues={true}
                        selectedValues={submittedNominees}
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
                            value={x?.reason}
                            className='nomineechoosed'
                            maxLength="250"
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
            <span className="nominationValidationText">{helperText}</span>
        </div>

    )
}

export default NominatePerson