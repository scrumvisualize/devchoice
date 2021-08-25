import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const NominatePerson = () => {
  const [option, setOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [nomRegister, setNomRegister] = useState([{}]);
  const [helperText, setHelperText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const history = useHistory();
  const [selectedValues, setSelectedValues] = useState([{}]);
  const refSelect = useRef(null);
  const [submittedNominees, setSubmittedNominees] = useState([{}]);
  const [maxOptions, setMaxOptions] = useState(0); //A.H-making maxOption dynamic because we don't the length of data from submittednominations
  const [openDialog, setOpenDialog] = useState(false); //A.H dialog confirmation
  const [validationMsgs, setValidationMsgs] = useState([true, true, true]);
  const [showOptions, setShowOptions] = useState(false); //A.H  toogle between show/hide option on checkbox
  //A.H
  useEffect(() => {
    if (maxOptions === 0) setShowOptions(false);
    else setShowOptions(true);
  }, [selectedOption, maxOptions]);

  //  verify textarea & maximum limit & submit withtout selectoption before open dialog
  const handleClickOpenDialog = () => {
    const updateList = [...validationMsgs];

    if (selectedOption.length === 0 && showOptions) {
      //if we want submit without choosing a nomniation & not achieve maximum limit (we used showOptions to know if we got the limit or no)
      updateList[0] = false;
      setValidationMsgs(updateList);
    } else {
      updateList[0] = true;
      setValidationMsgs(updateList);
    }
    if (!showOptions && selectedOption.length === 0) {
      //if we achieve maximum limit
      updateList[1] = false;
      setValidationMsgs(updateList);
    } else {
      updateList[1] = true;
      setValidationMsgs(updateList);
    }
    if (selectedOption.length !== 0) {
      //text aread required and <245
      let ok = true;
      selectedOption.map((selectedOpt) => {
        if (
          !selectedOpt.reason ||
          selectedOpt.reason === "" ||
          selectedOpt.reason.length > 245
        )
          ok = ok && false;
        else ok = ok && true;
      });
      updateList[2] = ok;
      setValidationMsgs(updateList);
    }
    let textareaVerification = true;
    for (let index = 0; index < updateList.length; index++) {
      if (!updateList[index]) {
        textareaVerification = false;
        break;
      }
    }
    if (textareaVerification) setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    const userEmail = localStorage.getItem("loginEmail");
    setUserEmail(userEmail);
  });

  useEffect(() => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem("loginEmail");
      try {
        const res = await Axios.get(
          "http://localhost:8000/service/submittednominations",
          { userEmail }
        );
        const data1 = res.data;
        setSubmittedNominees(data1);
        setMaxOptions(3 - data1.length); //A.H-making maxOption dynamic because we don't the length of data from submittednominations
        console.log("Submitted nominations :" + JSON.stringify(data1));
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
          "http://localhost:8000/service/nomineeslist"
        );
        const data1 = res.data;

        setOption(data1);

        console.log("Get the list of nomineeslist :" + JSON.stringify(data1));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [maxOptions]);

  const handleTypeSelect = (e, i) => {
    const copy = [...selectedOption];
    copy.push(e[3 - maxOptions]); //A.H-fix error: select one more record it still console log the pre selected one
    setSelectedOption(copy);
    setMaxOptions((prevState) => prevState - 1); //A.H-making maxOption dynamic
  };

  const handleTypeRemove = (e) => {
    const copy = [...selectedOption];
    let index = copy.indexOf(e);
    copy.splice(index, 1);
    setSelectedOption(copy);
    setMaxOptions((prevState) => prevState + 1); //A.H-making maxOption dynamic

    // immutating state (best practice)
    const updateList = nomRegister.map((item) => {
      return { ...item };
    });
    //delete the specific array case depends on the id
    updateList.splice(index, 1);
    setNomRegister(updateList);
  };

  const sendNomination = () => {
    console.log("What the Array holds: " + JSON.stringify(nomRegister));
    const headers = {
      "Content-Type": "application/json",
    };
    const fetchData = async (nomRegister) => {
      try {
        const res = await Axios.post(
          "http://localhost:8000/service/nominateperson",
          { userEmail, nomRegister },
          headers
        );
        if (res.data) {
          console.log("Print data:" + res.data);
          const successMessage = res.data.message;
          setHelperText(successMessage);
          const updateList = selectedOption.map((item) => {
            return { ...item, reason: "" };
          });
          setSelectedOption(updateList);
          setNomRegister(updateList);
        }
      } catch (e) {
        console.log(e);
        setNomRegister(reset);
        setHelperText(e.message);
        //history.push('/errorPage');
        const updateList = selectedOption.map((item) => {
          return { ...item, reason: "" };
        });
        setSelectedOption(updateList);
        setNomRegister(updateList);
      }
    };
    fetchData(nomRegister);
  };

  option.forEach((option) => {
    option.displayValue = option.firstName + "\t" +option.lastName + "\t" + option.email;
    submittedNominees.forEach((item) => {
      if (item.nomineeemail === option.email) {
        item.displayValue = item.nomineename + "\t" + item.nomineeemail;
      }
    });
  });

  const handleChange = (e, i) => {
    const { name, email, value } = e.target;

    // immutating state (best practice)
    const updateList = selectedOption.map((item) => {
      return { ...item };
    });
    // console.log(updateList, "updateList");
    // const select_Email = selectedOption.map((item) => {
    //   return item.email;
    // });

    //change the specific array case depends on the id //email:emailList[i],
    updateList[i] = {
      name: name,
      email: updateList[i].email,
      reason: value,
    };
    setSelectedOption(updateList);
    setNomRegister(updateList);
  };

  //A.H- cancel the selection and clear the field.
  const handleCancel = () => {
    // refSelect.current.resetSelectedValues();
    // setSelectedOption([]);
    // setNomRegister([]);
    // setMaxOptions();
    // setShowOptions(false);
    window.location.reload(false); //resetSelectedValues will reset all options even the disabled ones so the best choice here is to reload page
  };
  // A.H close the dialog after submit
  useEffect(() => {
    if (helperText === "Nomination submitted successfully !") {
      handleCloseDialog();
      setSelectedOption([]);
      setNomRegister([]);
    }
  }, [helperText]);
  //   console.log(selectedOption, "selectedOption");
  return (
    <div className='App'>
      <div className='navbar-nav'>
        <div className='leftNavItem'>
          <a>
            <Link to={"/dashboard"} className='nav-link'>
              {" "}
              <b>Dashboard</b>{" "}
            </Link>
          </a>
        </div>
      </div>
      <h1>Nominate a person</h1>
      <div className='nomineeSelectBox'>
        <div id='dialog2' className='triangle_down1' />
        <div className='arrowdown'>
          <Multiselect
            ref={refSelect}
            onSelect={(e) => handleTypeSelect(e, selectedOption.length)}
            onRemove={handleTypeRemove}
            options={!showOptions ? [] : option} //A.H toogle
            displayValue='displayValue'
            disablePreSelectedValues={true}
            selectedValues={submittedNominees}
            showCheckbox={true}
            emptyRecordMsg={"Maximum nominees selected !"}
          />
        </div>
      </div>
      {/* A.H NP-5 */}
      <div className='nominationcount'>{3 - maxOptions}</div>
      <form>
        <div className='nomineesSelectedList'>
          <h4>Selected Nominees</h4>
          {selectedOption.map((x, i) => (
            <div key={i}>
              <div className='row eachrecord'>
                <div className='column'>
                  <label className='nomlabel'>
                    {x?.name} <b>>></b>
                  </label>
                </div>
                <input
                  required
                  type='textarea'
                  placeholder='Please provide reason for nomination..'
                  key={i}
                  id={i}
                  name={x?.name}
                  value={x?.reason}
                  className='nomineechoosed'
                  maxLength='245'
                  onChange={(e) => handleChange(e, i)}
                />
              </div>
            </div>
          ))}
          <div className='row'>
            <div className='buttongroup'>
              <input
                id='Submit'
                type='button'
                value='Submit'
                onClick={handleClickOpenDialog}
              />
              <input
                id='Cancel'
                type='button'
                value='Cancel'
                onClick={handleCancel}
              />
            </div>
          </div>
        </div>
      </form>
      {/* A.H dialog confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Nomination will be submitted, click on submit to confirm !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(sendNomination)}
            color='primary'
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <span className='nominationValidationText'>{helperText}</span>
      {!validationMsgs[1] ? (
        <span className='nominationValidationText'>
          Sorry, nomination has exceeded the maximum limit!
        </span>
      ) : !validationMsgs[0] ? (
        <span className='nominationValidationText'>
          You must select a nomination
        </span>
      ) : (
        !validationMsgs[2] && (
          <span className='nominationValidationText'>
            Reason for nomination is required & less than 245 characters!
          </span>
        )
      )}
    </div>
  );
};

export default NominatePerson;
