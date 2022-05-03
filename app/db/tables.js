class Tables {
  initTables(connection) {
    this.connection = connection;
    this.createTableRoles();
    this.createTableUsers();
    this.createTableFunctionality();
    this.createTableActions();
    this.createTableRolesHasFunctionality();
    this.createTableFunctionalityHasActions();
    this.createTablePerfil();
    this.createTableAdrress();
  }

  createTableRoles() {
    const sql = `
        CREATE TABLE IF NOT EXISTS roles (
             id INT NOT NULL AUTO_INCREMENT,
              name VARCHAR(45) NOT NULL,
              description VARCHAR(255) NULL,
              PRIMARY KEY (id),
              UNIQUE INDEX id_UNIQUE (id) ,
              UNIQUE INDEX name_UNIQUE (name));
              `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Roles checked");
      }
    });
  }

  createTableUsers() {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(45) NOT NULL,
      email VARCHAR(45) NULL DEFAULT NULL,
      password VARCHAR(255) NOT NULL,
      created DATETIME NOT NULL,
      fk_roles INT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX email_UNIQUE (email),
      INDEX fk_users_roles_idx (fk_roles),
      CONSTRAINT fk_users_roles
        FOREIGN KEY (fk_roles)
        REFERENCES roles (id));

        `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table users checked");
      }
    });
  }

  createTableFunctionality() {
    const sql = `
    CREATE TABLE IF NOT EXISTS functionality (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(255) NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ) ,
    UNIQUE INDEX description_UNIQUE (name ) )
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table functionality checked");
      }
    });
  }

  createTableActions() {
    const sql = `
    CREATE TABLE IF NOT EXISTS actions (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(45) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX name_UNIQUE (name));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Actions checked");
      }
    });
  }

  createTableRolesHasFunctionality() {
    const sql = `
    CREATE TABLE IF NOT EXISTS roles_has_functionality (
      fk_roles INT NOT NULL,
      fk_functionality INT NOT NULL,
      PRIMARY KEY (fk_roles, fk_functionality),
      INDEX fk_roles_has_functionality_functionality1_idx (fk_functionality ) ,
      INDEX fk_roles_has_functionality_roles1_idx (fk_roles ) ,
      CONSTRAINT fk_roles_has_functionality_roles1
        FOREIGN KEY (fk_roles)
        REFERENCES roles (id),
      CONSTRAINT fk_roles_has_functionality_functionality1
        FOREIGN KEY (fk_functionality)
        REFERENCES functionality (id));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table RolesHasFunctionality checked");
      }
    });
  }

  createTableFunctionalityHasActions() {
    const sql = `
    CREATE TABLE IF NOT EXISTS functionality_has_actions (
      fk_functionality INT NOT NULL,
      fk_actions INT NOT NULL,
      has_permition TINYINT NOT NULL DEFAULT 1,
      PRIMARY KEY (fk_functionality, fk_actions),
      INDEX fk_functionality_has_actions_actions1_idx (fk_actions),
      INDEX fk_functionality_has_actions_functionality1_idx (fk_functionality),
      CONSTRAINT fk_functionality_has_actions_functionality1
        FOREIGN KEY (fk_functionality)
        REFERENCES functionality (id),
      CONSTRAINT fk_functionality_has_actions_actions1
        FOREIGN KEY (fk_actions)
        REFERENCES actions (id));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table TableFunctionalityHasActions checked");
      }
    });
  }
  createTablePerfil() {
    const sql = `
    CREATE TABLE IF NOT EXISTS perfil (
      id INT NOT NULL AUTO_INCREMENT,
      photo VARCHAR(45) NULL,
      instagran VARCHAR(45) NULL,
      facebook VARCHAR(45) NULL,
      linkedin VARCHAR(45) NULL,
      website VARCHAR(45) NULL,
      fk_users INT NOT NULL,
      PRIMARY KEY (id),
      INDEX fk_perfil_users1_idx (fk_users),
      CONSTRAINT fk_perfil_users1
        FOREIGN KEY (fk_users)
        REFERENCES users (id));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Perfil checked");
      }
    });
  }
  createTableAdrress() {
    const sql = `
    CREATE TABLE IF NOT EXISTS adrress (
      id INT NOT NULL AUTO_INCREMENT,
      cep VARCHAR(45) NOT NULL,
      logradouro VARCHAR(45) NOT NULL,
      complemento VARCHAR(45) NULL,
      bairro VARCHAR(45) NOT NULL,
      cidade VARCHAR(45) NULL,
      uf VARCHAR(45) NULL,
      ibge VARCHAR(45) NULL,
      fk_perfil INT NOT NULL,
      numero INT NULL,
      PRIMARY KEY (id),
      INDEX fk_adrress_perfil1_idx (fk_perfil),
      CONSTRAINT fk_adrress_perfil1
        FOREIGN KEY (fk_perfil)
        REFERENCES perfil (id))
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Address checked");
      }
    });
  }
}

module.exports = new Tables();
