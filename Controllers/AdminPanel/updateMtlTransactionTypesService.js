const express = require("express");
const pool = require("../../dbConnection");
const Joi = require("joi");
const router = express.Router();

router.put("/:transaction_type_id", async (req, res, next) => {
  const transactionTypeId = req.params.transaction_type_id;
  const schema = Joi.object({
    transactionTypeId: Joi.number().min(0),
    lastUpdateDate: Joi.string().required(),
    lastUpdatedBy: Joi.number().required(),
    creationDate: Joi.string().required(),
    createdBy: Joi.number().required(),
    transactionTypeName: Joi.string().max(88).required(),
    description: Joi.string().max(240),
    transactionActionId: Joi.number().required(),
    transactionSourceTypeId: Joi.number().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    console.log(validation.error.message);
    res.status(400).send("Invalid inputs");
  } else {
    const {
      lastUpdateDate,
      lastUpdatedBy,
      creationDate,
      createdBy,
      transactionTypeName,
      description,
      transactionActionId,
      transactionSourceTypeId,
      transactionTypeId,
    } = req.body;

    await pool.query(
      "UPDATE mtl_transaction_types SET last_update_date = $1,last_updated_by = $2,creation_date=$3,created_by=$4,transaction_type_name=$5,description=$6,transaction_action_id=$7,transaction_source_type_id=$8 WHERE transaction_type_id =$9 ",
      [
        lastUpdateDate,
        lastUpdatedBy,
        creationDate,
        createdBy,
        transactionTypeName,
        description,
        transactionActionId,
        transactionSourceTypeId,
        transactionTypeId,
      ],
      (error, result) => {
        try {
          if (error) throw error;

          res
            .status(200)
            .json(
              `MltTransactionType modified with transactionTypeId: ${transactionTypeId}`
            );
        } catch (err) {
          next(err);
        }
      }
    );
  }
});

module.exports = router;
