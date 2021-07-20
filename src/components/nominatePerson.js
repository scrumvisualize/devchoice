import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import CancelIcon from "@material-ui/icons/Cancel";

const options = [
  { key: "Axe", id: 1 },
  { key: "Bags", id: 2 },
  { key: "Coat", id: 3 },
  { key: "Drum", id: 4 },
];

const NominatePerson = () => {
  return (
    <div className="nominate-panel">
      <div className="employee-list-panel">
        <h1>Employee list</h1>
        <div className="employee-list">
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <div>amy_dubanowski@gmail.com</div>
          </div>
        </div>
      </div>
      <div className="shortlist-panel">
        <h1>Shortlisted employees</h1>
        <div className="shortlist">
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <CancelIcon className="remove-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominatePerson;
