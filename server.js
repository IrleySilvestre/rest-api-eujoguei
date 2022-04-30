const appConfig = require("./app/config/app.config");

const PORT = process.env.PORT || 3000;

const connection = require("./app/db/connection");
const tables = require("./app/db/tables");

const app = appConfig();

connection.connect((err) => {
  if (err) {
    console.log("error connectin to mysql: " + err.stack);
  } else {
    console.log("mysql connected as id:" + connection.threadId);
    tables.initTables(connection);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }
});
