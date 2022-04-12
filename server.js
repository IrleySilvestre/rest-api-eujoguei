const customExpress = require("./config/customExpress");

const PORT = process.env.PORT || 3000;

const connection = require("./db/connection");
const tables = require("./db/tables");

const app = customExpress();

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
