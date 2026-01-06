import mysql from "mysql2/promise";

// const db = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export default db;


const dbConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    console.log("Connected to MySQL database!");
    return connection;  // Return the connection object for further use
  } catch (error) {
    console.log( error)
  }
};

export default dbConnection;