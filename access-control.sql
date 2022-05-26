-- MySQL Script generated by MySQL Workbench
-- Sat Apr 30 07:05:14 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eu-joguei
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `fk_roles` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_roles_idx` (`fk_roles` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`fk_roles`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `functionality`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `functionality` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `description_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roles_has_functionality`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles_has_functionality` (
  `fk_roles` INT NOT NULL,
  `fk_functionality` INT NOT NULL,
  PRIMARY KEY (`fk_roles`, `fk_functionality`),
  INDEX `fk_roles_has_functionality_functionality1_idx` (`fk_functionality` ASC) VISIBLE,
  INDEX `fk_roles_has_functionality_roles1_idx` (`fk_roles` ASC) VISIBLE,
  CONSTRAINT `fk_roles_has_functionality_roles1`
    FOREIGN KEY (`fk_roles`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roles_has_functionality_functionality1`
    FOREIGN KEY (`fk_functionality`)
    REFERENCES `functionality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `functionality_has_actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `functionality_has_actions` (
  `fk_functionality` INT NOT NULL,
  `fk_actions` INT NOT NULL,
  `has_permition` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`fk_functionality`, `fk_actions`),
  INDEX `fk_functionality_has_actions_actions1_idx` (`fk_actions` ASC) VISIBLE,
  INDEX `fk_functionality_has_actions_functionality1_idx` (`fk_functionality` ASC) VISIBLE,
  CONSTRAINT `fk_functionality_has_actions_functionality1`
    FOREIGN KEY (`fk_functionality`)
    REFERENCES `functionality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_functionality_has_actions_actions1`
    FOREIGN KEY (`fk_actions`)
    REFERENCES `actions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(45) NULL,
  `instagran` VARCHAR(45) NULL,
  `facebook` VARCHAR(45) NULL,
  `linkedin` VARCHAR(45) NULL,
  `website` VARCHAR(45) NULL,
  `fk_users` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_perfil_users1_idx` (`fk_users` ASC) VISIBLE,
  CONSTRAINT `fk_perfil_users1`
    FOREIGN KEY (`fk_users`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adrress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adrress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cep` VARCHAR(45) NOT NULL,
  `logradouro` VARCHAR(45) NOT NULL,
  `complemento` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NULL,
  `uf` VARCHAR(45) NULL,
  `ibge` VARCHAR(45) NULL,
  `fk_perfil` INT NOT NULL,
  `numero` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adrress_perfil1_idx` (`fk_perfil` ASC) VISIBLE,
  CONSTRAINT `fk_adrress_perfil1`
    FOREIGN KEY (`fk_perfil`)
    REFERENCES `perfil` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `functionality` (`name`, `description`) VALUES ('Gerenciar Usuarios', 'Gerenica cadastro de usuarios do sistema');
INSERT INTO `functionality` (`name`, `description`) VALUES ('Gerenciar Grupos de Acesso', 'Gerencia cadastro de grupos de acesso do sistema');
INSERT INTO `functionality` (`name`, `description`) VALUES ('Gerenciar permissoes', 'Gerenica permicoes de acesso');

INSERT INTO `actions` (`name`) VALUES ('Listar');
INSERT INTO `actions` (`name`) VALUES ('Pesquisar');
INSERT INTO `actions` (`name`) VALUES ('Adicionar');
INSERT INTO `actions` (`name`) VALUES ('Atualizar');
INSERT INTO `actions` (`name`) VALUES ('Excluir');

INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '1', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '2', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '3', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '4', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '5', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '1', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '2', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '3', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '4', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '5', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '1', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '2', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '3', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '4', '1', '4');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '5', '1', '4');

INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '1', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '2', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '3', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '4', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '5', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '1', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '2', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '3', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '4', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '5', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '1', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '2', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '3', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '4', '1', '3');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '5', '1', '3');

INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '1', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '2', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '3', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '4', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '5', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '1', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '2', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '3', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '4', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '5', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '1', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '2', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '3', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '4', '1', '2');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '5', '1', '2');

INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '1', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '2', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '3', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '4', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('1', '5', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '1', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '2', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '3', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '4', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('2', '5', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '1', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '2', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '3', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '4', '1', '1');
INSERT INTO `functionality_has_actions` (`id_functionality`, `id_action`,`has_permition`, `id_role`) VALUES ('3', '5', '1', '1');

INSERT INTO `roles` (`name`, `description`) VALUES ('Administrador', 'Grupo para usuarios com acesso  administrativo');
INSERT INTO `roles` (`name`, `description`) VALUES ('Vendas', 'Grupo para usarios do departaemto de vendas');
INSERT INTO `roles` (`name`, `description`) VALUES ('Financeiro', 'Grupo para os usuarios do departamento financeiro');
INSERT INTO `roles` (`name`, `description`) VALUES ('Master', 'Grupo para administrador geral do sistema');

SELECT f.name as Funcionalidade, a.name as Acao, fa.has_permition as permissao
FROM functionality f
INNER JOIN functionality_has_actions fa 
ON f.id = fa.fk_functionality
INNER JOIN actions a
ON a.id = fa.fk_actions;