import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Papa from "papaparse";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from "react-datepicker";

//using material UI
//https://material-ui.com/components/pickers/
//https://material-ui.com/components/cards/
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { notify } from "../utils/helperFunctions/HelperFunctions";
import { toast } from "react-toastify";
import { TextField, Icon } from "@material-ui/core";

const clockSVG = (
  <svg
    version='1.1'
    id='Capa_1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    x='0px'
    y='0px'
    viewBox='0 0 612 612'
    style={{ enableBackground: "new 0 0 512 512" }}
    xmlSpace='preserve'
    fill='#707070'
  >
    <g>
      <g>
        <path
          d='M347.216,301.211l-71.387-53.54V138.609c0-10.966-8.864-19.83-19.83-19.83c-10.966,0-19.83,8.864-19.83,19.83v118.978
c0,6.246,2.935,12.136,7.932,15.864l79.318,59.489c3.569,2.677,7.734,3.966,11.878,3.966c6.048,0,11.997-2.717,15.884-7.952
C357.766,320.208,355.981,307.775,347.216,301.211z'
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d='M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.833,256-256S397.167,0,256,0z M256,472.341
c-119.275,0-216.341-97.066-216.341-216.341S136.725,39.659,256,39.659c119.295,0,216.341,97.066,216.341,216.341
S375.275,472.341,256,472.341z'
        />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);
//materiel UI stuff
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
const ManageNominees = () => {
  toast.configure();

  const [manageNominees, setManageNominees] = useState([]);
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const isMounted = useRef(false);
  const [state, setState] = React.useState({
    activateNomination: false,
  });
  const { control, register, handleSubmit } = useForm();
  const [showCalender, setShowCalender] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false); //toogle expand Down/Up
  const [selectedDateStart, setSelectedDateStart] = useState(
    new Date(Date.now())
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date(Date.now()));
  const [userEmail, setUserEmail] = useState("");

  const handleDateStartChange = (date) => {
    setSelectedDateStart(date);
  };
  const handleDateEndChange = (date) => {
    setSelectedDateEnd(date);
  };
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const email = localStorage.getItem("loginEmail");
      try {
        const res = await Axios.get(
          "http://localhost:8000/service/nomineeslist"
        );
        setManageNominees(res.data);
        console.log("Get the list of nominees :" + res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (e) => {
    //e.preventDefault();
    if (file == null) {
      alert("Please choose a valid csv file !");
    } else {
      const formData = new FormData(form.current);
      let fileArr = [];
      for (let i = 0; i < file.length; i++) {
        fileArr.push(file[i]);
      }
      formData.append("file", fileArr);
      const res = Axios.put(
        "http://localhost:8000/service/managenominees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => {
          // successfully uploaded response
          console.log("Status of Upload: " + res.status);
        })
        .catch((error) => {
          // error response
        });
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      setShowCalender(true);
      handleExpandClick(); //toogle expand Down/Up
      //MN6-2
      const fetchData = async () => {
        try {
          const res = await Axios.put(
             "http://localhost:8000/service/activeStatus",
              "active"
          );
          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    } else {
      setShowCalender(false);
      handleExpandClick(); //toogle expand Down/Up
      //MN6-5
      const fetchData = async () => {
        try {
          const res = await Axios.put(
            "http://localhost:8000/service/activeStatus",
            "inactive"
          );
          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  };
  const onSave = () => {
    //Validation dates
    if (
      selectedDateStart > selectedDateEnd ||
      !selectedDateStart ||
      !selectedDateEnd
    )
      notify("You must select a correct dates", toast, "error");
    else {
      //MN6-1
      //Axios all
      //selectedDateStart =>Nomination start date
      //selectedDateEnd  =>Nomination end date
      //userEmail => loginUserEmail
      // you can choose expanded or showCalender
      //expanded= showCalender = true (active) => show calendar
      //expanded= showCalender = false (inactive) => hide calendar
      const fetchData = async () => {
        try {
          const res = await Axios.post(
            "http://localhost:8000/service/createnominationsession",
            { userEmail, selectedDateStart, selectedDateEnd, expanded }
          );
          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
      notify("New session has been saved", toast, "success");
    }
  };

  //loginUserEmail like the nominatePerson
  useEffect(() => {
    const userEmail = localStorage.getItem("loginEmail");
    setUserEmail(userEmail);
  });

  //toogle expand Down/Up
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <form ref={form} onSubmit={submitForm} encType='multipart/form-data'>
        <div className='leftNavItem'>
          <a>
            <Link to={"/dashboard"} className='nav-link'>
              {" "}
              <b>Dashboard</b>{" "}
            </Link>
          </a>
        </div>
        <div className='upload_header'>
          <h2>Manage Nominees</h2>
        </div>

        <div className='managenominees'>
          <table data-cy='Manage_Nominees'>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Given Name</th>
            <th>Email</th>
            <th>Access</th>
            {manageNominees.map((row) => {
              return (
                <tr>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.access}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className='employee_data'>
          <input
            type='file'
            name='file'
            onChange={(e) => setFile(e.target.files)}
          />
          <button data-cy='Upload'>Upload</button>
        </div>
        {/* Card & datapicker */}
        <Card className={classes.root} style={{ margin: "50px auto 0px " }}>
          <CardHeader title='Admin Activity' />
          <CardMedia
            className={classes.media}
            image='https://i.ibb.co/bzCBRZd/admin.jpg'
            title='admin'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              Admin activity section will allow admin user to create a valid
              nomination session by clicking the toggle nomination button and saving
              the details.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <FormControl component='fieldset'>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.activateNomination}
                      onChange={handleChange}
                      name='activateNomination'
                    />
                  }
                  label='Activate Nomination'
                />
              </FormGroup>
            </FormControl>
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <div style={{ textAlign: "center" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ width: "50%" }}
                    disableToolbar
                    variant='inline'
                    format='yyyy/MM/dd'
                    margin='normal'
                    id='date-picker-inline'
                    label='Nomination start date'
                    value={selectedDateStart}
                    onChange={handleDateStartChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />

                  <KeyboardTimePicker
                    style={{ width: "50%" }}
                    margin='normal'
                    id='time-picker'
                    label='Nomination start time'
                    value={selectedDateStart}
                    onChange={handleDateStartChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    keyboardIcon={<Icon>{clockSVG}</Icon>}
                  />

                  <KeyboardDatePicker
                    style={{ width: "50%" }}
                    disableToolbar
                    variant='inline'
                    format='yyyy/MM/dd'
                    margin='normal'
                    id='date-picker-inline'
                    label='Nomination End date'
                    value={selectedDateEnd}
                    onChange={handleDateEndChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    style={{ width: "50%" }}
                    margin='normal'
                    id='time-picker'
                    label='Nomination end time'
                    value={`${selectedDateEnd
                      .toISOString()
                      .slice(0, 10)}T17:30`}
                    onChange={handleDateEndChange}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    keyboardIcon={<Icon>{clockSVG}</Icon>}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  variant='outlined'
                  color='primary'
                  style={{ marginTop: "22px" }}
                  onClick={onSave}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Collapse>
        </Card>
        {/* <div className='toggleSwitch'>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Admin Activity</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.activateNomination}
                    onChange={handleChange}
                    name='activateNomination'
                  />
                }
                label='Activate Nomination'
              />
            </FormGroup>
          </FormControl>

          <div className='row'>
            {showCalender ? (
              <>
                <div className='column'>
                  <Controller
                    control={control}
                    name='from-date'
                    render={({ field }) => (
                      <DatePicker
                        placeholderText='Select date'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                    )}
                  />
                </div>
                <div className='column'>
                  <Controller
                    control={control}
                    name='to-date'
                    render={({ field }) => (
                      <DatePicker
                        placeholderText='Select date'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                    )}
                  />
                </div>
                <input type='button' value='Save' onClick={onSave} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default ManageNominees;
