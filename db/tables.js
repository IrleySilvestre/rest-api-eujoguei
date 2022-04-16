class Tables {
  initTables(connection) {
    this.connection = connection;
    this.createTableUsers();
  }

  createTableUsers() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(45) NOT NULL,
            email varchar(45) DEFAULT NULL,
            password varchar(45) NOT NULL,
            created varchar(45) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY email_UNIQUE (email));

        `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table users checked");
      }
    });
  }
}

module.exports = new Tables();