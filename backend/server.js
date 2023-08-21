require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const rateLimit = require("./middleware/loginLimiter");

const PORT = process.env.PORT || 5000;


console.log(process.env.NODE_ENV);

app.use(logger);

app.use(cors(corsOptions));


app.use(rateLimit);

app.use(express.json());

// database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();
// Synchronize Database Schema (No Drop, No Alter)
db.sequelize.sync({ force: false, alter: true,  logging: true }).then(() => {
  console.log("Synchronize Database Schema (No Drop, No Alter)");
  initial(); // Run the initial function after schema synchronization
});

// routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

require("./routes/resRoutes")(app);

require("./routes/openaiRoutes")(app);


app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);




app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  
});


// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });

//     Role.create({
//       id: 2,
//       name: "moderator"
//     });

//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }


// Check if initialization has been done
let hasInitialized = false;

function initial() {
  if (!hasInitialized) {
    Role.findOne({ where: { name: "user" } }).then(role => {
      if (!role) {
        Role.create({ id: 1, name: "user" });
      }
    });

    Role.findOne({ where: { name: "moderator" } }).then(role => {
      if (!role) {
        Role.create({ id: 2, name: "moderator" });
      }
    });

    Role.findOne({ where: { name: "admin" } }).then(role => {
      if (!role) {
        Role.create({ id: 3, name: "admin" });
      }
    });

    hasInitialized = true;
  }
}
