// npm install of date library that will be logged to dot log files, date-fns considers performace more than moment
const { format } = require("date-fns");
// npm install of UUID(Universally Unique Identifiers) that will be logged to dot log files
const { v4: uuid } = require("uuid");

// This will bring in the "fs" or file structure global object no npm install required
const fs = require("fs");

// async, used in the logEvents function will make that function "Promise" to return something valid
// await, used in the try / catch block ensures that a function waits for a "Promise"
const fsPromises = require("fs").promises;

// Path module provides a way of working with file paths
const path = require("path");

// log events is promising to take the parameters from the emitter
// listener in routes and send that data to the try / accept block
// fileLineItem is the information that is written to the log file
const logEvents = async (msg, theStatusCode) => {
  const dateTime = `${format(new Date(), "MMM-dd-yyyy \tHH:mm:ss")}`;
  const fileLineItem = `${dateTime} \t${msg} \t${theStatusCode} \t${uuid()}`;

  // try catch block is used to evaluate if 1 there is a filefolder to place the line item, if is does exit
  // it will take the fileLineItem and append it to the awaiting file.  If it does not exit then the folder is created
  // the file is created then the data is appended to that file
  // catch will handle any error that occurs if the try fails

  try {
    if (theStatusCode === 503) {
      if (!fs.existsSync(path.join(__dirname, "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "logs"));
      }
      const fileName =
        `${format(new Date(), "yyyyMMdd")}` + "_503_Error_Events.log";
      await fsPromises.appendFile(
        path.join(__dirname, "logs", fileName),
        fileLineItem + "\n"
      );
    } else if (theStatusCode === 404) {
      if (!fs.existsSync(path.join(__dirname, "logs"))) {
        await fsPromises.mkdir(path.join(__dirname, "logs"));
      }
      const fileName =
        `${format(new Date(), "yyyyMMdd")}` + "_404_Error_Events.log";
      await fsPromises.appendFile(
        path.join(__dirname, "logs", fileName),
        fileLineItem + "\n"
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
