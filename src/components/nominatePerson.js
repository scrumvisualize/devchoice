import React, { useRef, useEffect, useState, createRef } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";

const NominatePerson = () => {
  const [hasScrollReachedBottom, setHasScrollReachedBottom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortListedEmps, setShortListedEmps] = useState([]);
  const [modalType, setModalType] = useState(1); //0 for confirm modal; 1 for add/edit nomination modal
  const [message, setMessage] = useState("");
  const [activeEmployee, setActiveEmployee] = useState({});
  const [nominees, setNominees] = useState([]);
  const [comments, setComments] = useState("");

  const empListRef = React.createRef();

  const onScroll = () => {
    let hasScrollReachedBottom;
    const distLeftToBottom = Math.floor(
      empListRef.current.scrollHeight - empListRef.current.scrollTop
    );
    const empListHeight = empListRef.current.clientHeight;

    if (distLeftToBottom === empListHeight) {
      hasScrollReachedBottom = true;
    } else {
      hasScrollReachedBottom = false;
    }
    setHasScrollReachedBottom(hasScrollReachedBottom);
  };

  const customStyles = {
    overlay: {
      backdropFilter: "blur(1px)",
      backgroundColor: "rgba(191, 191, 191, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "12px",
      height: "fit-content",
      width: "fit-content",
      minWidth: "25%",
      minHeight: "25%",
    },
  };

  const nomineeSelect = (nominee) => {
    setActiveEmployee(nominee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addNominee = () => {
    setNominees([
      ...nominees,
      { employee: activeEmployee, comments: comments },
    ]);
    setComments("");
    setActiveEmployee({});
    setIsModalOpen(false);
  };

  const commentChangedHandler = (e) => {
    setComments(e.target.value);
  };

  const editComment = () => {};

  const removeNominee = (email) => {
    const nomineeList = [...nominees];
    nomineeList.splice(
      nomineeList.findIndex((nominee) => nominee.employee.email === email),
      1
    );
    setNominees(nomineeList);
  };

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
    <>
      <div className="nominate-panel">
        <div className="employee-list-panel">
          <h1>Employee list</h1>
          <textarea
            className="search-name"
            placeholder="Search employee by name..."
          ></textarea>
          <div
            className={
              "employee-list " +
              (hasScrollReachedBottom ? "reached-bottom" : "")
            }
            onScroll={onScroll}
            ref={empListRef}
          >
            {employees.map((employee, index) => (
              <div
                className="employee-details"
                key={index}
                onClick={() => nomineeSelect(employee)}
              >
                <img src={employee.image}></img>
                <div>{employee.name}</div>
                <div>{employee.email}</div>
              </div>
            ))}
          </div>
          <div id="scroll-indicator"></div>
        </div>
        <div className="shortlist-panel">
          <div className="shortlist">
            <h1>Shortlisted employees</h1>
            {nominees.map((nominee, index) => (
              <div className="employee-details" key={index}>
                <img src={nominee.employee.image}></img>
                <div>{nominee.employee.name}</div>
                <CancelIcon
                  className="remove-icon"
                  onClick={() => removeNominee(nominee.employee.email)}
                />
                <EditIcon className="edit-icon" onClick={editComment} />
              </div>
            ))}
          </div>
          <div>
            <button className="confirm-button">Submit</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        type={modalType}
        message={message}
      >
        <CloseIcon className="close-icon" onClick={closeModal} />
        <div className="modal-content">
          {modalType ? (
            <>
              <div className="employee-name">
                Employee:
                <div>{activeEmployee.name}</div>
              </div>
              <div className="comments">
                Comments:
                <textarea
                  className="comments-input"
                  value={comments}
                  placeholder="Enter comments"
                  onChange={commentChangedHandler}
                ></textarea>
                <input />
              </div>
              <div className="interaction">
                <button className="confirm-button" onClick={addNominee}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="message">{message}</div>
              <button className="confirm-button">Confirm</button>
              <button className="cancel-button">Cancel</button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NominatePerson;
