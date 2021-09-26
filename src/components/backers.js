import React, { useRef, useEffect, useState } from "react";
import {Link} from "react-router-dom";


const Backers = () => {


    return (
        <div className="App">
            <div className="leftNavItem">
                <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
            </div>
            <h2>Backers & Supporters</h2>
                <section class="card-container">
                <div class="card">
                    <i class="fas fa-paint-brush"></i>
                    <img src="images/google.png"></img>
                    <p> I was motivated to create a DevChoice system for simPRO.
                        I have successfully created a working prototype to help the nomination process.
                    </p>
                    <p>
                        I have choosed Reactjs framework for front end, Express for server side and Axios for making res calls.
                    </p>
                </div>

                <div class="card">
                    <i class="fas fa-desktop"></i>
                    <img src="images/google.png"></img>
                    <p>
                        Char helps with his excellent coding skills at times
                        provides better solutions.
                    </p>
                </div>
            </section>

        </div>
    )
}
export default Backers;