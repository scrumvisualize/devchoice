import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useGoogleLogout } from 'react-google-login';
const moment = require('moment');

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
        //maxWidth: "500px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    form: {
        fontfamily: "Georgia",
        padding: "20px",
        width: "20%",
        maxWidth: "500px",
        background: "#f4f7f8"
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
        color: "#8a97a0"
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
        borderRadius: "5px"
    },
    label: {
        color: "#161717",
        textAlign: "center",
        fontSize: "18px",
        paddingLeft: "35px"
    },
    p: {
        color: "#161717",
        textAlign: "center",
        fontSize: "18px",

    }
}));
const Dashboard = props => {
    const [nominationList, setNominationList] = useState([]);
    const [nominationCount, setNominationCount] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [teamwiseNomination, setTeamwiseNomination] = useState([]);
    const [dashboardView, setDashboardView] = useState([]);
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const [displayWinner, setDisplayWinner] = useState([]);
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const classes = useStyles();

    const isMounted = useRef(false);
    const history = useHistory();


    const handleChange = event => {
        setSearchTerm(event.target.value);
    };


    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    useEffect(() => {
        const userImage = window.localStorage.getItem("userImage");
        setImage(userImage);
    })

    useEffect(() => {
        const results = nominationList.filter(nomination =>
            nomination.nomineename.toLowerCase().includes(searchTerm.toLowerCase()) || nomination.nomineename.toUpperCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm, nominationList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominations');
                if (isMounted.current) {
                    setNominationList(res.data);
                    console.log("Nomination data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/displaywinner');
                if (isMounted.current) {
                    setDisplayWinner(res.data);
                    console.log("Get winner data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominationcount');
                if (isMounted.current) {
                    setNominationCount(res.data);
                    console.log("Nomination count data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/teamwisenomination');
                if (isMounted.current) {
                    setTeamwiseNomination(res.data);
                    console.log("Team wise nomination from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem("loginEmail");
            try {
                const res = await Axios.get('http://localhost:8000/service/dashboardview', { email });
                if (isMounted.current) {
                    setDashboardView(res.data);
                    setLoginUserEmail(email);
                    console.log("Allow nom data to view for created user:" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const confirmWinner = () => {
        const fetchData = async () => {
            const email = emailText;
            const name = nameText;
            try {
                const res = await Axios.post('http://localhost:8000/service/confirmwinner', { email, name });
                if (isMounted.current) {
                    console.log("Send winner data:" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }

    const onLogoutSuccess = (res) => {
        localStorage.removeItem("loginEmail");
        localStorage.removeItem("userImage");
        history.push("/");
        console.log("Logged out successfully !");
    }

    const onFailure = () => {
        console.log("Handle failure cases !")
    }
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    })

    const teams = teamwiseNomination.reduce((teams, team) => {
        if (!teams[team.nomineeteam]) teams[team.nomineeteam] = [];
        teams[team.nomineeteam].push(team.nomineename);
        return teams;
    }, {});


    return (
        <div className="App">
            <div className="navbar-nav">
                <div className="leftNavItem">
                    <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                    <a><Link to={'/createLink'} className="nav-link"> <b>Create Link</b> </Link></a>
                </div>
                <div className="profileImage">
                    <img src={image}></img>
                    <span className="dropdown-content">
                        <a href="" onClick={signOut}>Logout</a>
                    </span>
                </div>
            </div>
            <label>
                <div className="nominationsearch_Home">
                    <div className="nominationsearch_Icon">
                        <img alt="" src="/images/search.png"></img>
                    </div>
                    <input type="text" className="nomination_Home_Input" placeholder="search nominations..." value={searchTerm} onChange={handleChange} />
                </div>
            </label>
            <div className="container">
                <div className="column-1 box">
                    <h3>Menu</h3>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/createLink')}>Create Link</span>
                    </div>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/nominationList')}>Nomination List</span>
                    </div>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/manageNominees')}>Manage Nominees</span>
                    </div>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/nominatePerson')}>Nominate Person</span>
                    </div>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/backers')}>Backers & Supporters</span>
                    </div>
                </div>
                <div className="column-2 box"> 
                    <div className="leveldown">
                        <div className="container">
                            <div className="space_1 tile">
                                <h3>Nomination Winners</h3>
                                {
                                    !displayWinner.length && (<div className="nonominationdata">No winners to display !</div>)
                                }
                                {
                                    displayWinner.sort((a, b) => moment(b.createdAt) - moment(a.createdAt)).map(data => (
                                        <div key={data.id} className="oldwinner">
                                            <div className="winnerIcon">
                                                <img src="/images/trophy1.png"></img>
                                                <span key={data.winner} className="winner name">{data.winner}</span>
                                                <span key={data.createdAt} className="winner date">{moment(data.createdAt).format('DD-MMM-YYYY')}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="space_1 tile">
                                <h3>Nominations Count</h3>
                                {
                                    !nominationCount.length && (<div className="nonominationdata">No nominations count to display !</div>)
                                }
                                <div className="grid-container">

                                    {
                                        nominationCount.map(data => (
                                            <div key={data.id}>
                                                <div onClick={() => { setOpen(!open); setEmailText(data.nomineeemail); setNameText(data.nomineename) }} className="count badge" >
                                                    <span className="badgenumber" value={data.count} key={data.count}>{data.EmailCount}</span>
                                                    <span className="countname" key={data.nomineename} onClick={() => setNameText(data.nomineename)}>{data.nomineename}</span>
                                                    <span hidden={true} key={data.nomineeemail}>{data.nomineeemail}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="space_1 tile">
                                <h3>Teamwise Nominations</h3>
                                <div className="grid-container">
                                    {
                                        Object.entries(teams).map(([team, names]) => (
                                            <div key={team} className="team-1">
                                                <h5>{team}</h5>
                                                {
                                                    !names.length && (<div className="nonominationdata">No teamwise nominations to display !</div>)
                                                }
                                                {names.map((name) => (
                                                    <span key={name} className="data-1">
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="levelmain">
                    <h3>Nominated members</h3>
                        
                        {
                            !nominationList.length && (<div className="dashboarddata">Sorry, no nominations to display !</div>)
                        }

                        <div className="grid-container">
                            {
                                searchResults.map(data => (
                                    <div key={data.id} className="nomination item grid-item">
                                        <div className="nominateIcon">
                                            <img src="/images/nominate_icon.PNG"></img>
                                        </div>
                                        <span className="">
                                            <label key={data.nomineename}><b>{data.nomineename}</b></label>
                                        </span>
                                        <span className="">
                                            <p key={data.reason}>{data.reason}</p>
                                        </span>
                                        {/*<div className="nominatedby user">*/}
                                        {/*    <span key={data.nominatedby}>Nominated by: {data.nominatedby}</span>*/}
                                        {/*</div>*/}
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div> 
            </div>
            <div className="bottom level">
                <h3>@Copyright Vin</h3>
            </div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                className={classes.modal}>
                <form className={classes.form}>
                    <label className={classes.label}>Please confirm <b>{nameText}</b> as the winner ?</label>
                    <input className={classes.submit} type="submit" value="Confirm" onClick={confirmWinner} />
                </form>
            </Modal>
        </div>
    )
}

export default Dashboard;