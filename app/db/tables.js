class Tables {
  initTables(connection) {
    this.connection = connection;
    this.createTableRoles();
    this.createTableUsers();
    this.createTableTypyPhone();
    this.createTableActions();
    this.createTableFunctionality();
    this.createTableFunctionalityHasActions();
    this.createTablePerfil();
    this.createTablePhones();
    this.createTableAdrress();
  }

  createTableRoles() {
    const sql = `
       CREATE TABLE IF NOT EXISTS roles (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NOT NULL,
            description VARCHAR(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ),
            UNIQUE INDEX name_UNIQUE (name ));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Roles checked");
      }
    });
  }

  createTableTypyPhone() {
    const sql = `
       CREATE TABLE IF NOT EXISTS typy_phone (
        id INT NOT NULL AUTO_INCREMENT,
        description VARCHAR(45) NOT NULL,
        PRIMARY KEY (id));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Type_Phone checked");
      }
    });
  }

  createTableUsers() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NULL DEFAULT NULL,
            email VARCHAR(45) NULL DEFAULT NULL,
            password VARCHAR(255) NULL DEFAULT NULL,
            id_role INT NULL,
            created DATETIME NULL,
            PRIMARY KEY (id),
            UNIQUE INDEX email_UNIQUE (email ASC),
            INDEX fk_users_roles1_idx (id_role ASC),
            CONSTRAINT fk_users_roles1
                FOREIGN KEY (id_role)
                REFERENCES roles (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);
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
        description VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX id_UNIQUE (id ),
        UNIQUE INDEX description_UNIQUE (name ));
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
            UNIQUE INDEX name_UNIQUE (name ));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Actions checked");
      }
    });
  }

  createTableFunctionalityHasActions() {
    const sql = `
        CREATE TABLE IF NOT EXISTS functionality_has_actions (
            id_functionality INT NOT NULL,
            id_action INT NOT NULL,
            has_permition TINYINT NOT NULL DEFAULT '1',
            id_role INT NOT NULL,
            PRIMARY KEY (id_functionality, id_action, id_role),
            INDEX fk_functionality_has_actions_actions1_idx (id_action ),
            INDEX fk_functionality_has_actions_functionality1_idx (id_functionality ),
            INDEX fk_functionality_has_actions_roles1_idx (id_role ),
            CONSTRAINT fk_functionality_has_actions_actions1
                FOREIGN KEY (id_action)
                REFERENCES actions (id),
            CONSTRAINT fk_functionality_has_actions_functionality1
                FOREIGN KEY (id_functionality)
                REFERENCES functionality (id),
            CONSTRAINT fk_functionality_has_actions_roles1
                FOREIGN KEY (id_role)
                REFERENCES roles (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);
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
            photo VARCHAR(45) NULL DEFAULT NULL,
            instagran VARCHAR(45) NULL DEFAULT NULL,
            facebook VARCHAR(45) NULL DEFAULT NULL,
            linkedin VARCHAR(45) NULL DEFAULT NULL,
            website VARCHAR(45) NULL DEFAULT NULL,
            id_user INT NOT NULL,
            birth_dt DATE NULL,
            PRIMARY KEY (id),
            INDEX fk_perfil_users1_idx (id_user ),
            CONSTRAINT fk_perfil_users1
                FOREIGN KEY (id_user)
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
            complemento VARCHAR(45) NULL DEFAULT NULL,
            bairro VARCHAR(45) NOT NULL,
            cidade VARCHAR(45) NULL DEFAULT NULL,
            uf VARCHAR(45) NULL DEFAULT NULL,
            ibge VARCHAR(45) NULL DEFAULT NULL,
            id_perfil INT NOT NULL,
            numero INT NULL DEFAULT NULL,
            PRIMARY KEY (id),
            INDEX fk_adrress_perfil1_idx (id_perfil ),
            CONSTRAINT fk_adrress_perfil1
                FOREIGN KEY (id_perfil)
                REFERENCES perfil (id));
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Phones checked");
      }
    });
  }

  createTablePhones() {
    const sql = `
       CREATE TABLE IF NOT EXISTS phones (
            id INT NOT NULL AUTO_INCREMENT,
            number VARCHAR(45) NULL,
            id_type_phone INT NOT NULL,
            id_perfil INT NOT NULL,
            PRIMARY KEY (id, id_type_phone, id_perfil),
            INDEX fk_phones_typy_phone1_idx (id_type_phone ),
            INDEX fk_phones_perfil1_idx (id_perfil ),
            CONSTRAINT fk_phones_typy_phone1
                FOREIGN KEY (id_type_phone)
                REFERENCES typy_phone (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_phones_perfil1
                FOREIGN KEY (id_perfil)
                REFERENCES perfil (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table Phones checked");
      }
    });
  }
}

module.exports = new Tables();
