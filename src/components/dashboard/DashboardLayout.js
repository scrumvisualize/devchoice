import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
//import { useGoogleLogout } from "react-google-login";

import styled from "@emotion/styled";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { Box, Container, Grid } from "@material-ui/core";

import NominationWinnersBox from "./NominationWinnersBox";
import TeamwiseNominationsBox from "./TeamwiseNominationsBox";
import NominationsCountBox from "./NominationsCountBox";
import NominatedMembersBox from "./NominatedMembersBox";
import ChartBox from "./ChartBox";

const moment = require("moment");

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const DashboardLayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
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
  const [enableNominatePersonTab, setEnableNominatePersonTab] = useState("");

  const isMounted = useRef(false);
  const history = useHistory();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    const userImage = window.localStorage.getItem("userImage");
    setImage(userImage);
  });

  useEffect(() => {
    const results = nominationList.filter(
      (nomination) =>
        nomination.nomineename
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        nomination.nomineename.toUpperCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, nominationList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          "http://localhost:8000/service/nominations"
        );
        if (isMounted.current) {
          setNominationList(res.data);
          console.log("Nomination data from server :" + res.data);
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
          "http://localhost:8000/service/displaywinner"
        );
        if (isMounted.current) {
          setDisplayWinner(res.data);
          console.log("Get winner data from server :" + res.data);
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
          "http://localhost:8000/service/nominationcount"
        );
        if (isMounted.current) {
          setNominationCount(res.data);
          console.log("Nomination count data from server :" + res.data);
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
          "http://localhost:8000/service/teamwisenomination"
        );
        if (isMounted.current) {
          setTeamwiseNomination(res.data);
          console.log("Team wise nomination from server :" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("loginEmail");
      try {
        const res = await Axios.get(
          "http://localhost:8000/service/dashboardview",
          { email }
        );
        if (isMounted.current) {
          setDashboardView(res.data);
          setLoginUserEmail(email);
          console.log("Allow nom data to view for created user:" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const confirmWinner = () => {
    const fetchData = async () => {
      const email = emailText;
      const name = nameText;
      try {
        const res = await Axios.post(
          "http://localhost:8000/service/confirmwinner",
          { email, name }
        );
        if (isMounted.current) {
          console.log("Send winner data:" + res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    setOpen(false);
  };

  const {onLogoutSuccess} = (res) => {
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("userImage");
    history.push("/");
    console.log("Logged out successfully !");
  };

  const onFailure = () => {
    console.log("Handle failure cases !");
  };
  // const { signOut } = useGoogleLogout({
  //   clientId,
  //   onLogoutSuccess,
  //   onFailure,
  // });

  const teams = teamwiseNomination.reduce((teams, team) => {
    if (!teams[team.team]) teams[team.team] = [];
    teams[team.team].push(team.nomineename);
    return teams;
  }, {});

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        onLogoutSuccess={onLogoutSuccess}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <DashboardSidebar
        imageProfile={image}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Box
              sx={{
                backgroundColor: "background.default",
                minHeight: "100%",
                py: 3,
              }}
            >
              <Container maxWidth={false}>
                <Grid container spacing={3}>
                  <Grid item lg={4} sm={12} xl={4} xs={12}>
                    <NominationWinnersBox displayWinner={displayWinner} />
                  </Grid>
                  <Grid item lg={4} sm={12} xl={4} xs={12}>
                    <NominationsCountBox
                      nominationCount={nominationCount}
                      openDialog={() => setOpen(true)}
                      closeDialog={() => setOpen(false)}
                      open={open}
                      setEmailText={setEmailText}
                      setNameText={setNameText}
                      nameText={nameText}
                      confirmWinner={confirmWinner}
                    />
                    {console.log(open)}
                  </Grid>
                  <Grid item lg={4} sm={12} xl={4} xs={12}>
                    <TeamwiseNominationsBox teams={teams} />
                  </Grid>
                  <Grid item lg={4} md={12} xl={4} xs={12}>
                    <NominatedMembersBox
                      nominationList={nominationList}
                      searchResults={searchResults}
                      searchTerm={searchTerm}
                      handleChange={handleChange}
                      sx={{ height: "100%" }}
                    />
                  </Grid>
                  <Grid item lg={8} sm={12} xl={8} xs={12}>
                    <ChartBox />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
