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
                    <img src="images/simpro.PNG"></img>
                    <p> 
                      While working in simPRO, I was interested in developing a system for 
                      Devchoice awards using Reactjs, Express, Axios, Sequelize and Mysql.
                      I have tried my level best to complete the small project for simPRO.
                      Regards Vinod 
                    </p>
                    
                </div>
            </section>
            {/* <div className="footerLevel">
                <Footer></Footer>
            </div> */}
        </div>
    )
}
export default Backers;