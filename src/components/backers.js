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
                    <h1>VM</h1>
                    <img src="images/google.png"></img>
                    <p>
                        Vin is the main developer who spend his time to come up with developing the devchoice
                        system for sim.
                    </p>
                </div>

                <div class="card">
                    <i class="fas fa-desktop"></i>
                    <h1>CD</h1>
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