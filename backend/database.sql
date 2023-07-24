CREATE TABLE user (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
    roles VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO
user (username , email, hashedPassword, roles)
VALUES
(
  'Lilian',
  'lilian@gmail.com',
  '$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A',
  'admin'
),
(
  'Jeff',
  'jeff@gmail.com',
  '$argon2id$v=19$m=65536,t=5,p=1$+8QKgBU+Z7zr2EVICuFDOg$74Nu7DWmpa/+VW7543Xm28gd+ATVrhtCV2lAakJ4i+A',
  'user'
);

CREATE TABLE budget (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL (10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE expense (
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  budget_id int(11) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  FOREIGN KEY (budget_id) REFERENCES budget(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;