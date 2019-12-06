const express = require("express");

const db = require("../db");

const router = express.Router();

// Получить весь список представителей
router.get("/", async (req, res) => {
  try {
    let representatives = [];

    if (req.query.firstName) {
      representatives = await db.findRepresentative(req.query.firstName, null);
    }

    if (req.query.lastName) {
      representatives = await db.findRepresentative(null, req.query.lastName);
    }

    if (req.query.filter) {
      representatives = await db.filterByCompany();
    }

    // TODO: Закончить filterByCompany
    if (!req.query.firstName && !req.query.lastName && !req.query.filter) {
      representatives = await db.getAllRepresentatives();
    }

    res.json({ representatives });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

// Получить одну компанию
router.get("/:representativeId", async (req, res) => {
  try {
    let representative = await db.getSingleRepresentative(
      req.params.representativeId
    );
    res.json({ representative });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

// Добавить нового представителя
router.post("/", async (req, res) => {
  try {
    let representative = await db.addRepresentative(req.body);
    res.json(representative);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

// Обновить существующего представителя
router.put("/:representativeId", async (req, res) => {
  try {
    let updated = await db.updateRepresentative(
      req.params.representativeId,
      req.body
    );
    res.json({ updated });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

module.exports = router;
