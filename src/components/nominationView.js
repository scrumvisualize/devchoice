import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Heart as HeartIcon } from "react-feather";
import "animate.css";

const moment = require("moment");

const NominationView = (props) => {
  const [nominationView, setNominationView] = useState([]);
  const [likes, setLikes] = useState(1);
  const [likeCount, setLikeCount] = useState(0);
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  /* To display count of likes from the nomination table for each nominee*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
            "http://localhost:8000/service/nominationlikes"
        );
        if (isMounted.current) {
          setLikeCount(res.data);
          console.log("Nomination likes count :" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
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

  const saveLikes = (email) => {
    const fetchData = async () => {
      setLikes(likes => likes + 1 );
      console.log("count of likes:"+ likes);
      const userEmail = localStorage.getItem("loginEmail");
      const params = {useremail: userEmail, nomineeEmail: email, likes: likes};
      try {
        const res = await Axios.put(
            "http://localhost:8000/service/nominationviewsavelikes", params);
        if (isMounted.current) {
          console.log("Like status :" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };
  return (
    <div className='App'>
      <div className='leftNavItem'>
        <a>
          <Link
            to={props.role ? "/nominatePerson" : "/dashboard"}
            className='nav-link'
          >
            <b>{props.role ? "Nominate Person" : "Dashboard"}</b>
          </Link>
        </a>
      </div>
      <h2>Nomination View</h2>
      {!nominationView.length && (
        <div className='dashboarddata'>
          Sorry, no nominations data to display !
        </div>
      )}
      <div className='row'>
        {nominationView.map((item, i) => (
          <div
            key={item}
            className={`nominationRecord animate__animated animate__fadeInUp animate__delay-${i}s`}
          >
            <img src='images/trophy1.png' />
            <span key={item.nomineeFirstName} className='datarecord'>
              {item.nomineeFirstName}
            </span>
            <span key={item.nomineeLastName} className='datarecord'>
              {item.nomineeLastName}
            </span>
            <span key={item.nomineeemail} className='emailhide'>
              {item.nomineeemail}
            </span>
            <span key={item.reason} className='datarecord'>
              {item.reason.length <= 20
                ? item.reason
                : `${item.reason.substr(0, 20)}...`}
            </span>
            <span className='datarecord' key={item.createdAt}>
              {moment(item.createdAt).format("DD-MMM-YYYY")}
            </span>
            <span className='likeButton' onClick={() => saveLikes(item.nomineeemail)}>
              <HeartIcon />

              {
                likeCount.map((likeCount) => (
                <span key={likeCount}>
                  {
                    item.nomineeemail === likeCount.nomineeemail ? likeCount.likes : (
                        null
                    )
                  }

                </span>
                ))
              }


            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NominationView;
