class Tables {
  initTables(connection) {
    this.connection = connection;
    // this.createSchema();
    this.createTableUsers();
    this.createTableRoles();
    this.createTableUserRoles();
  }
  createSchema() {
    this.connection.query("CREATE SCHEMA `eu-paguei`", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("data base criada");
      }
    });
  }

  createTableUsers() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(45) NOT NULL,
            email varchar(45) DEFAULT NULL,
            password varchar(255) NOT NULL,
            created DATETIME NOT NULL,
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
  createTableRoles() {
    const sql = `
        CREATE TABLE IF NOT EXISTS roles (
             id INT NOT NULL AUTO_INCREMENT,
              name VARCHAR(45) NOT NULL,
              PRIMARY KEY (id),
              UNIQUE INDEX id_UNIQUE (id) ,
              UNIQUE INDEX name_UNIQUE (name));`;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Roles checked");
      }
    });
  }
  createTableUserRoles() {
    const sql = `CREATE TABLE IF NOT EXISTS users_roles (
      fk_users_id INT NOT NULL,
      fk_roles_id INT NOT NULL,
        PRIMARY KEY (fk_users_id, fk_roles_id),
        INDEX fk_users_has_roles_roles1_idx (fk_roles_id ) ,
        INDEX fk_users_has_roles_users1_idx (fk_users_id ) ,
        CONSTRAINT fk_users_has_roles_users1
          FOREIGN KEY (fk_users_id)
          REFERENCES users (id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION,
        CONSTRAINT fk_users_has_roles_roles1
          FOREIGN KEY (fk_roles_id)
          REFERENCES roles (id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table User_Roles checked");
      }
    });
  }
}

module.exports = new Tables();
