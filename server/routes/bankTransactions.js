const express = require('express');
const router = express.Router();

const BankTransaction = require('../models/bankTransaction');

router.route('/')
  .get((req, res) => {
    BankTransaction.find({}, (err, transactions) => {
      res.status(err ? 400 : 200).send(err || transactions);
    });
  })
  .post((req, res) => {
    BankTransaction.create(req.body, (err, newTransaction) => {
    //   res.status(err ? 400 : 200).send(err || newTransaction);
    // });
      if(err) {
        return res.status(400).send(err);
      }
      BankTransaction.find({}, (err, transactions) => {
        res.status(err ? 400 : 200).send(err || transactions);
      });
    });
  });

router.route('/:id')
  .get((req, res) => {
    BankTransaction.findById(req.params.id, (err, transaction) => {
      res.status(err ? 400 : 200).send(err || transaction);
    });
  })
  .delete((req, res) => {
    BankTransaction.findByIdAndRemove(req.params.id, err => {
      if(err) {
        return res.status(400).send(err);
      }
      BankTransaction.find({}, (err, transactions) => {
        res.status(err ? 400 : 200).send(err || transactions);
      });
    });
  })
  .put((req, res) => {
    BankTransaction.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, transaction) => {
      if(err) {
        return res.status(400).send(err);
      }
      BankTransaction.find({}, (err, transactions) => {
        res.status(err ? 400 : 200).send(err || transactions);
      });
    });
  })

module.exports = router;
