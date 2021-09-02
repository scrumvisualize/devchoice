const moment = require("moment");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");
const results = [];
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const linkTokenSchema = require("./server/models/linktoken");
const nominationSchema = require("./server/models/nominations");
const nominationWinnerSchema = require("./server/models/nominationwinner");
const manageNomineesSchema = require("./server/models/managenominees");
const nominationSessionSchema = require("./server/models/nominationsession");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const { get } = require("http");
const mattermost_token = process.env.REACT_APP_MATTERMOST_TOKEN;
const channel_Id = process.env.REACT_APP_MATTERMOST_CHANNEL_ID;

let currentDate = moment().format("YYYY-MM-DD hh:mm");

const app = express();
const port = 8000;

const DB_NAME = "devchoice";
const DB_PORT = 3306;
const DB_USERNAME = "admin"; //root
const DB_PASSWORD = "C@rnagieMe11on";
const DB_HOST = "127.0.0.1";
const DB_DIALECT = "mysql";
const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: DB_POOL,
  port: DB_PORT,
});

const LinkTokenModel = linkTokenSchema(sequelize, DataTypes);
const NominationModel = nominationSchema(sequelize, DataTypes);
const NominationWinnerModel = nominationWinnerSchema(sequelize, DataTypes);
const ManageNomineesModel = manageNomineesSchema(sequelize, DataTypes);
const NominationSessionModel = nominationSessionSchema(sequelize, DataTypes);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The below define the folder location and storage of file using multer. File will be saved
// with field name, date stamp and extension and then upload variable will have the below information.

app.use(express.static(path.join(__dirname, "public")));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/csv");
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

/* csvFilter variable created, but not working*/
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("text/csv")) {
    cb(null, true);
  } else {
    cb("Please upload a csv file", false);
  }
};
var upload = multer({ storage: storage });

/* This is used try different upload variable setting with multer, but not working*/
// var upload = multer({
//   dest: 'public/csv/',
//   fileFilter: function (req, file, cb) {
//     file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false)
//   }
// })


/* This service is used to create valid nomination session and saved into NominationSession table */
app.post("/service/createnominationsession", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const startDate = req.body.selectedDateStart;
    const endDate = req.body.selectedDateEnd;
    const statusdata = req.body.expanded;
    const createSession = await NominationSessionModel.create({
      ...req.body,
      useremail: userEmail,
      nominationStartDate: startDate,
      nominationEndDate: endDate,
      status: statusdata
    });
    res.status(200).send(createSession);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to submit a nomination and will display invalid link if token expired */
app.post("/service/nominateperson", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const nomData = req.body.nomRegister;

    let latestRecord = await sequelize.query("SELECT status, nom.id FROM devchoice.nominationsession nom JOIN (SELECT MAX(id) AS id FROM devchoice.nominationsession) max on nom.id = max.id;");

    const data = nomData.map((item) => ({
      session_id: latestRecord[0][0].id,
      useremail: userEmail,
      nomineeemail: item.email,
      nomineeFirstName: item.name,
      nomineeLastName: item.lastName,
      nomineename: item.name,
      nomineeteam: item.team,
      reason: item.reason,
    }));
    const numberOfNominations = await NominationModel.count({
      where: { useremail: userEmail },
    });
    if (numberOfNominations <= 2) {
      const nominationData = await NominationModel.bulkCreate(data);
      res.status(200).json({ message: "Nomination submitted successfully !" });
    } else {
      res.status(202).json({
        message:
          "Sorry ! You have exceeded the maximum limit of nominations!",
      });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to get all nominations submitted by the login user:  */
app.get("/service/submittednominations", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const submittedNominationEmail = await NominationModel.findAll(
      {
        attributes: [
          "id",
          "nomineeemail",
          "nomineeFirstName",
          "nomineeLastName",
          "nomineename",
        ],
      },
      { where: { useremail: userEmail } }
    );
    res.status(200).send(submittedNominationEmail);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to post/update active status 1 or 0 into the nomination session table */
app.put("/service/activeStatus", async (req, res) => {
  try {
    const activeStatus = req.body.status;
    let latestRecord = await sequelize.query("SELECT status, nom.id FROM devchoice.nominationsession nom JOIN (SELECT MAX(id) AS id FROM devchoice.nominationsession) max on nom.id = max.id;");
    console.log("Get id record:" + latestRecord);
    const updateSession = await NominationSessionModel.update(
        {status: activeStatus},
        {
          where: {id: latestRecord[0][0].id}
        });
    console.log("Get update status:" + updateSession);
    res.status(200).send(updateSession);
  } catch (e) {
    res.status(500).json({fail: e.message});
  }
});



/* This service is used to get the 1 or 0 from nomination session table and pass back to frontend */
app.get("/service/getActiveStatus", async (req, res) => {
  try {
    let latestRecord = await sequelize.query("SELECT status, nom.id FROM devchoice.nominationsession nom JOIN (SELECT MAX(id) AS id FROM devchoice.nominationsession) max on nom.id = max.id;");
    const userEmail = req.query.userEmail;
    let recordId = latestRecord[0][0].id;
    const status = await sequelize.query(`SELECT status, id FROM devchoice.nominationsession where id=${recordId}`);
    res.status(200).send(status);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to display list of all nominations in the Dashboard under Recent nominations section: */
app.get("/service/nominations", async (req, res) => {
  try {
    let sessionId = await sequelize.query("SELECT status, nom.id FROM devchoice.nominationsession nom JOIN (SELECT MAX(id) AS id FROM devchoice.nominationsession) max on nom.id = max.id;");
    let nominationSessionId = await sequelize.query("SELECT distinct nominations.session_id FROM nominations LEFT JOIN nominationsession ON nominations.session_id = nominationsession.id;");
    if(sessionId[0][0].status == "1" && sessionId[0][0].id == nominationSessionId[0][0].session_id ){
      const nominationData = await NominationModel.findAll({
            attributes: [
              "nomineeemail",
              "nomineeFirstName",
              "nomineeLastName",
              "nomineename",
              "nomineeteam",
              "reason",
              "createdAt",
            ]},
          { where: { id: sessionId } }
      );
      res.status(200).send(nominationData);
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to display the count of nominations received for a nominee in the Dashboard under Nominations count section: */
app.get("/service/nominationcount", async (req, res) => {
  try {
    const data = await NominationModel.findAll({
      group: ["nomineeemail"],
      attributes: [
        "nomineeemail",
        "nomineename",
        [sequelize.fn("COUNT", "nomineeemail"), "EmailCount"],
      ],
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to display the teamwise names of the nominees : */
app.get("/service/teamwisenomination", async (req, res) => {
  try {
    const data = await NominationModel.findAll({
      attributes: ["nomineename", "nomineeteam"],
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to create and update token data while creating a link */
app.put("/service/createlink", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const tokenData = req.body.token;
    const data = userEmail + tokenData;
    let buff = new Buffer(data);
    let base64data = buff.toString("base64");
    let validUptoDate = moment().add(2, "days"); //replace 2 with number of days you want to add .toDate() and convert it to a Javascript Date Object if you like
    const tokenEmailRecord = await LinkTokenModel.count({
      where: { email: userEmail },
    });
    if (tokenEmailRecord == 0) {
      const linkTokenData = await LinkTokenModel.create({
        ...req.body,
        email: userEmail,
        token: base64data,
        createdAt: currentDate,
        expiredAt: validUptoDate,
      });
      res.status(200).json({ message: "Token created successfully !" });
    } else {
      const linkTokenData = await LinkTokenModel.update(
        {
          ...req.body,
          email: userEmail,
          token: base64data,
          createdAt: currentDate,
          expiredAt: validUptoDate,
        },
        { where: { email: userEmail } }
      );
      res.status(200).json({ message: "Token updated successfully !" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to validate the created link and display the page for nomination */
app.post("/service/validatelink", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const data = await LinkTokenModel.findAll(
      { attributes: ["token", "expiredAt"] },
      { where: { email: userEmail } }
    );
    const expiryDate = data[0].expiredAt;
    const formattedExpiryDate = moment(expiryDate).format("YYYY-MM-DD hh:mm");
    const tokenData = data[0].token;
    console.log("Get expiry date from table: " + formattedExpiryDate);
    var now = moment();
    var currentDate = moment(now).format("YYYY-MM-DD hh:mm");
    console.log("Get current date: " + currentDate);
    if (currentDate < formattedExpiryDate) {
      let tokendata = tokenData;
      res.status(200).send(tokendata);
    } else {
      res.status(404).json({
        message: "Nomination link expired, please create a new one..!",
      });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to get the email of the person who created token and dashboard should be available to that login only : */
app.get("/service/dashboardview", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const dashboardData = await LinkTokenModel.findAll(
      { attributes: ["email", "token"] },
      { where: { email: userEmail } }
    );
    res.status(200).send(dashboardData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to save the winner data into the nomination winner table : */
app.post("/service/confirmwinner", async (req, res) => {
  try {
    const winnerEmail = req.body.email;
    const winnerName = req.body.name;
    var data = { email: winnerEmail, winner: winnerName };
    const winnerData = await NominationWinnerModel.create(data);
    res.status(200).send(winnerData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to get the latest winner data from the nomination winner table : */
app.get("/service/displaywinner", async (req, res) => {
  try {
    const winnerEmail = req.body.email;
    const data = await NominationWinnerModel.findAll(
      { attributes: ["winner", "createdAt"] },
      { where: { email: winnerEmail } }
    );
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to group nomination based on name: */
app.get("/service/nominationgroup", async (req, res) => {
  try {
    const nominationGroup = await NominationModel.findAll({
      attributes: ["nomineename", "nomineeteam", "reason", "createdAt"],
    });
    res.status(200).send(nominationGroup);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to publish a winner to the mattermost site: */
app.post("/service/publishwinner", async (req, res) => {
  try {
    const winnerName = req.body.winnerName;
    const winnerDetails = req.body.winnerDetails;
    const mattermosttoken = mattermost_token;
    const res = await axios.post(
      "https://vinod.cloud.mattermost.com/api/v4/posts",
      {
        channel_id: channel_Id,
        message: `Congratulations...! ${winnerName} ${winnerDetails} ...!
      ![image](https://i.picsum.photos/id/452/4096/2722.jpg?hmac=VFr5l8FshPX1LW4DCpHm99QQgWMsHW5Lr70-6ZQZuFg)`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mattermosttoken}`,
        },
      }
    );
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to save the employees uploaded via csv file into database and populate the employees list into 
the nominate person screen */
app.put(
  "/service/managenominees",
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (req.file) {
        let filePath = req.file.path;
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", async () => {
            console.log(results);
            const allNominees = results.map((nominees) => {
              return {
                id: nominees.id,
                firstName: nominees.firstname,
                lastName: nominees.lastname,
                name: nominees.name,
                email: nominees.email,
              };
            });
            //SELECT COUNT(email) from devchoice.managenominees;
            const emailCount = await ManageNomineesModel.count({
              col: "email",
            });
            if (emailCount == 0) {
              await ManageNomineesModel.bulkCreate(allNominees);
              res
                .status(200)
                .json({ message: "Nominees inserted successfully !" });
            } else {
              await ManageNomineesModel.bulkCreate(allNominees, {
                updateOnDuplicate: ["firstName"],
                //{attributes: { exclude: ['createdAt'] },
                where: { id: ["id"] },
              });
              res
                .status(200)
                .json({ message: "Nominee records updated successfully !" });
            }
          });
      }
    } catch (e) {
      res.status(500).json({ fail: e.message });
    }
  }
);

/* This service is used get and display all employees in the manageNominees screen from the managenominees table */
app.get("/service/nomineeslist", async (req, res) => {
  try {
    const data = await ManageNomineesModel.findAll({
      attributes: ["id", "firstName", "lastName", "name", "email", "access"],
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, "Database issue.");
  }
})();
