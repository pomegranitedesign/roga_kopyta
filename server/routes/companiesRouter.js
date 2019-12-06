const express = require("express");

const db = require("../db");

const router = express.Router();

// Получить список всех компаний
router.get("/", async (req, res) => {
  try {
    const companies = await db.getCompanies();
    res.send({ companies });
  } catch (err) {
    res.status(500);
  }
});

// Добавить новую компанию
router.post("/", async (req, res) => {
  try {
    const added = await db.addCompany(req.body);
    res.send({ companies });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
