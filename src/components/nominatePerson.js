import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const NominatePerson = () => {
  const employees = [
    {
      name: "Dwight Schrute",
      email: "dwight@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Pamela Beesly",
      email: "pamela@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Jim Halpert",
      email: "jim@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Andrew Bernard",
      email: "andy@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Michael Scott",
      email: "michael@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Creed Bratton",
      email: "creed@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Angela Martin",
      email: "angela@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Kelly Kapoor",
      email: "kelly@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Ryan Howard",
      email: "ryan@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Oscar Martinez",
      email: "oscar@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Phyllis Vance",
      email: "phyllis@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
    {
      name: "Meredith Palmer",
      email: "meredith@gmail.com",
      image:
        "https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png",
    },
  ];

  return (
    <div className="nominate-panel">
      <div className="employee-list-panel">
        <h1>Employee list</h1>
        <textarea
          className="search-name"
          placeholder="Search employee by name..."
        ></textarea>
        <div className="employee-list">
          {employees.map((employee, index) => (
            <div className="employee-details" key={index}>
              <img src={employee.image}></img>
              <div>{employee.name}</div>
              <div>{employee.email}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="shortlist-panel">
        <h1>Shortlisted employees</h1>
        <div className="shortlist">
          <div className="employee-details">
            <img src="https://findicons.com/files/icons/1580/devine_icons_part_2/512/account_and_control.png"></img>
            <div>Amy Dubanowski</div>
            <CancelIcon className="remove-icon" />
            <EditIcon className="edit-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominatePerson;
