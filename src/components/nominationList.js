import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

//Materiel UI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import { notify } from "../utils/helperFunctions/HelperFunctions";
import { toast } from "react-toastify";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //maxWidth: "500px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    fontfamily: "Georgia",
    padding: "20px",
    width: "20%",
    maxWidth: "500px",
    background: "#f4f7f8",
  },
  area: {
    width: "100%",
    background: "rgba(234, 234, 250,.1)",
    border: "none",
    borderRadius: "4px",
    fontSize: "15px",
    outline: "0",
    padding: "10px",
    margin: "1em auto",
    boxSizing: "border-box",
    backgroundColor: "#e8eeef",
    color: "#8a97a0",
  },
  submit: {
    color: "#FFF",
    margin: "1em auto",
    background: "#1abc9c",
    fontSize: "18px",
    textAlign: "center",
    fontStyle: "normal",
    width: "50%",
    border: "1px solid #16a085",
    borderWidth: "1px 1px 3px",
    marginBottom: "10px",
    padding: "10px",
    marginLeft: "90px",
    borderRadius: "5px",
  },
  label: {
    color: "#161717",
    textAlign: "center",
    fontSize: "18px",
    paddingLeft: "35px",
  },
  p: {
    color: "#161717",
    textAlign: "center",
    fontSize: "18px",
  },
}));

const NominationList = () => {
  toast.configure();
  const [nominationGroup, setNominationGroup] = useState({});
  const [winnerName, setWinnerName] = useState("");
  const [winnerDetails, setWinnerDetails] = useState("");
  const [open, setOpen] = useState(false);

  const uniqueName = [];
  const classes = useStyles();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    let newGroup = {};
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          "http://localhost:8000/service/nominationgroup"
        );
        if (isMounted.current) {
          for (const elem of res.data) {
            const key = elem.nomineeFirstName + " " + elem.nomineeLastName;
            if (!newGroup.hasOwnProperty(key)) {
              newGroup[key] = {
                createdAt: "",
                reason: [],
              };
            }
            newGroup[key].reason.push(elem.reason);
            newGroup[key].createdAt = elem.createdAt;
          }
          setNominationGroup(newGroup);
          console.log("Nomination data from server :" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const postWinner = () => {
    console.log(winnerName, winnerDetails);
    if (!winnerName || !winnerDetails) {
      notify(
        "You must choose winner name and fill in winner details..",
        toast,
        "error"
      );
    } else {
      const fetchData = async () => {
        try {
          const res = await Axios.post(
            "http://localhost:8000/service/publishwinner",
            { winnerName, winnerDetails }
          );
          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
      notify("Done", toast, "success");
      setOpen(false);
    }
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div className='App'>
      <div className='leftNavItem'>
        <a>
          <Link to={"/dashboard"} className='nav-link'>
            {" "}
            <b>Dashboard</b>{" "}
          </Link>
        </a>
      </div>
      <h2 className='header'>
        <b>Nomination List</b>
      </h2>
      <div className='wrap'>
        <div id='sidebar-left'>
          <th>Nominee name</th>
        </div>
        <div id='main-content'>
          <th>Reason for Nomination</th>
        </div>
        <div id='sidebar-right'>
          <th>Date</th>
        </div>
      </div>

      {Object.keys(nominationGroup).map((nomineename) => (
        <div className='wrap'>
          <div key={nomineename} id='sidebar-left'>
            {nomineename}
          </div>
          <div id='main-content'>
            {nominationGroup[nomineename].reason.map((desc) => (
              <li key={desc} className='nomlistdata'>
                <li>{desc}</li>
              </li>
            ))}
          </div>
          <div key={nominationGroup[nomineename].createdAt} id='sidebar-right'>
            {moment(nominationGroup[nomineename].createdAt).format(
              "DD-MMM-YYYY"
            )}
          </div>
          <hr></hr>
        </div>
      ))}
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Publish Winner
      </button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogTitle id='alert-dialog-title'>Publish Winner</DialogTitle>

          <DialogContentText id='alert-dialog-description'>
            Winner name and details will be published to Mattermost..!
          </DialogContentText>
          <DialogContentText
            style={{ textAlign: "center", margin: "30px 0px" }}
          >
            <TextField
              id='outlined-basic'
              label='Winner Name'
              variant='outlined'
              onChange={(e) => setWinnerName(e.target.value)}
            />
          </DialogContentText>
          <DialogContentText
            style={{ textAlign: "center", margin: "30px 0px" }}
          >
            <TextField
              style={{ width: "100%" }}
              id='outlined-multiline-static'
              label='Winning Details'
              multiline
              rows={4}
              defaultValue=''
              variant='outlined'
              onChange={(e) => setWinnerDetails(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button color='primary' autoFocus onClick={postWinner}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className={classes.modal}
      >
        <form className={classes.form}>
          <div className='inputField'>
            <input
              placeholder='name'
              name='winnername'
              type='text'
              onChange={(e) => setWinnerName(e.target.value)}
            />
          </div>
          <div className='inputField'>
            <textarea
              name='description'
              placeholder='winning details'
              onChange={(e) => setWinnerDetails(e.target.value)}
            />
          </div>
          <input
            className='publishbtn'
            type='submit'
            value='Publish'
            onClick={postWinner}
          />
        </form>
      </Modal> */}
    </div>
  );
};
export default NominationList;
