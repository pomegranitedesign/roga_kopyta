const express = require("express");
const chalk = require("chalk");
const cors = require("cors");

const representativesRouter = require("./routes/representativesRouter");
const companiesRouter = require("./routes/companiesRouter");

const app = express();
const port = process.env.port || 5000;

// Активируем поддержку "bodyParser"
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Methods", "PUT, DELETE")
    .header("Access-Control-Allow-Headers", "*");
  next();
});

// CORS
// app.use(cors());

// API иаршруты
app.use("/api/representatives", representativesRouter);
app.use("/api/companies", companiesRouter);

// Запускаем сервер
app.listen(port, _ =>
  console.log(chalk.yellow.bold(`Server is running on port: ${port}`))
);
