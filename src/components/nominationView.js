import React, {useEffect, useRef, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import {
    Heart as HeartIcon
} from "react-feather";
const moment = require("moment");



const NominationView = () => {
    const [nominationView, setNominationView] = useState([]);
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => (isMounted.current = false);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get(
                    "http://localhost:8000/service/nominations"
                );
                if (isMounted.current) {
                    setNominationView(res.data);
                    console.log("Nomination data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const saveLikes = () =>{
        alert("hello");
    }
    return (
        <div className="App">
            <div className='leftNavItem'>
                <a>
                    <Link to={"/dashboard"} className='nav-link'>
                        {" "}
                        <b>Dashboard</b>{" "}
                    </Link>
                </a>
            </div>
            <h2>Nomination View</h2>
            {!nominationView.length && (
                <div className='dashboarddata'>
                    Sorry, No nominations data to display..!
                </div>
            )}
            <div className="row">
                {
                  nominationView.map((item, i) =>(
                        <div key={item} className="nominationRecord">
                            <img src="images/trophy1.png"/>
                            <span key={item.nomineeFirstName} className="datarecord">{item.nomineeFirstName}</span>
                            <span key={item.nomineeLastName} className="datarecord">{item.nomineeLastName}</span>
                            <span key={item.reason} className="datarecord">{
                                item.reason.length <= 20
                                    ? item.reason
                                    : `${item.reason.substr(0, 20)}...`
                            }</span>
                            <span className="datarecord" key={item.createdAt}>{moment(item.createdAt).format('DD-MMM-YYYY')}</span>
                            <span className="likeButton" onClick={saveLikes}>
                               <HeartIcon/>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}
export default NominationView;