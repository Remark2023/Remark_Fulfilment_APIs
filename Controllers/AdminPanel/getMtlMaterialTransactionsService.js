const express = require("express");
const pool = require("../../dbConnection");
const router = express.Router();

router.get("/", async (req, res, next) => {
  await pool.query(
    "SELECT * FROM mtl_material_transactions ",

    (error, result) => {
      try {
        if (error) throw error;

        res.status(200).json(result.rows);
      } catch (err) {
        next(err);
      }
    }
  );
});

module.exports = router;
