const mysql = require("mysql");
const chalk = require("chalk");

// Локальное подключение к MySQL базе данных
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "linux_{}",
  user: "root",
  database: "roga_kopyta",
  host: "localhost",
  port: 3306,
  charset: "utf8_general_ci"
});

let db = {};

// Запросы / Queries
db.getAllRepresentatives = _ => {
  return new Promise((resolve, reject) => {
    const perPage = 4;
    pool.query("SELECT * FROM representatives", (err, results) => {
      if (err) {
        console.error(chalk.red.bold(`\n${err}`));
        return reject(err);
      }

      console.log(chalk.green.bold(`\nFetch all representatives [Success]`));
      return resolve(results);
    });
  });
};

// Запрос для одной компании
db.getSingleRepresentative = representativeId => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM representatives WHERE id = ?",
      [representativeId],
      (err, results) => {
        if (err) {
          console.error(chalk.red.bold(`\n${err}`));
          return reject(err);
        }

        console.log(
          chalk.green.bold(`\nFetch a single representative [Success]`)
        );
        return resolve(results[0]);
      }
    );
  });
};

// Добавить нового представителя
db.addRepresentative = ({ createdAt, firstName, lastName, companyId }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO representatives(createdAt, firstName, lastName, companyId) VALUES(?, ?, ?, ?)",
      [createdAt, firstName, lastName, companyId],
      (err, result) => {
        if (err) {
          console.error(chalk.red.bold(`\n${err}`));
          return reject(err);
        }

        console.log(chalk.green.bold(`\nAdd a new representative [Success]`));
        return resolve(result);
      }
    );
  });
};

// Обновляем существующего представителя
db.updateRepresentative = (representativeId, newInfo) => {
  return new Promise((resolve, reject) => {
    // Find if a representative exists
    pool.query(
      "SELECT * FROM representatives WHERE id = ?",
      [representativeId],
      (err, rowDataPacket) => {
        if (err) {
          console.error(
            chalk.red.bold(`\nNo Represenative with ID: ${representativeId}\n`)
          );
          return reject(err);
        }

        // Деструктурируем объект RowDataPacket
        const {
          id,
          createdAt,
          firstName,
          lastName,
          companyID
        } = rowDataPacket[0];

        // Проверяем если какие-то поля не были заполнены
        // если нет то просто задаём старое значение
        let newCreatedAt = newInfo.createdAt,
          newFirstName = newInfo.firstName,
          newLastName = newInfo.lastName,
          newCompanyID = newInfo.companyID;

        if (!newCreatedAt) {
          newCreatedAt = createdAt;
        }

        if (!newFirstName) {
          newFirstName = firstName;
        }

        if (!newLastName) {
          newLastName = lastName;
        }

        if (newCompanyID === null || !newCompanyID) {
          newCompanyID = companyID;
        }

        // Обновляем значения
        pool.query(
          "UPDATE representatives SET createdAt = ?, firstName = ?, lastName = ?, companyId = ? WHERE id = ?",
          [newCreatedAt, newFirstName, newLastName, newCompanyID, id],
          (err, result) => {
            if (err) {
              console.error(chalk.red.bold(`\n${err}`));
              return reject(err);
            }

            console.log(
              chalk.green.bold(`\nUpdate a representative ${id} [Success]`)
            );
            return resolve(result);
          }
        );
      }
    );
  });
};

// Реализация поиска (по имени или фамилии)
db.findRepresentative = (firstName, lastName) => {
  return new Promise((resolve, reject) => {
    if (firstName) {
      pool.query(
        "SELECT * FROM representatives WHERE firstName = ?",
        [firstName],
        (err, result) => {
          if (err) {
            console.error(chalk.red.bold(`\n${err}`));
            return reject(err);
          }

          console.log(`\nFind a representative ${firstName} success`);
          return resolve(result);
        }
      );
    } else {
      pool.query(
        "SELECT * FROM representatives WHERE lastName = ?",
        [lastName],
        (err, result) => {
          if (err) {
            console.error(chalk.red.bold(`\n${err}`));
            return reject(err);
          }

          console.log(`\nFind a representative ${lastName} success`);
          return resolve(result);
        }
      );
    }
  });
};

// Фильтр по компании
// db.filterByCompany = _ => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "SELECT * FROM representatives r LEFT JOIN companies c ON c.companyID = r.companyID",
//       (err, result) => {
//         if (err) {
//           console.error(chalk.red.bold(`\nError filtering by company...`));
//           return reject(err);
//         }

//         console.log(chalk.green.bold(`\nFilter by company [Success]`));
//         console.log(result);
//         return resolve(result);
//       }
//     );
//   });
// };

// Вывести все компании
db.getCompanies = _ => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM companies", (err, companies) => {
      if (err) {
        console.error(chalk.red.bold(`\nError fetching all companies ${err}`));
        return reject(err);
      }

      console.log(chalk.green.bold("\nFetch all companies [Success]"));
      return resolve(companies);
    });
  });
};

// Добваить компанию
db.addCompany = ({ name }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO companies(createdAt, name) VALUES(now(), ?)",
      [name],
      (err, result) => {
        if (err) {
          console.error(chalk.red.bold(`\nError adding a company: ${err}`));
          return reject(err);
        }

        console.log(chalk.green.bold(`\nAdd a new company [Success]`));
        return resolve(result);
      }
    );
  });
};

module.exports = db;
