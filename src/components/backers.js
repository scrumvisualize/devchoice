import React, { useRef, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Footer from "./footer";


const Backers = () => {


    return (
        <div className="App">
            <div className="leftNavItem">
                <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
            </div>
                <section class="card-container">
                <div class="card">
                    <i class="fas fa-paint-brush"></i>
                    <img src="images/google.png"></img>
                    <p> 
                      I was curious to create a DevChoice system for simPRO. 
                    </p>
                    
                </div>
            </section>
            <div className="footerLevel">
                <Footer></Footer>
            </div>
        </div>
    )
}
export default Backers;