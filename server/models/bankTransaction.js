const mongoose = require('mongoose');

const bankTransactionSchema = new mongoose.Schema({
  description: {type: String},
  style: {type: String, required: true, enum:['debit', 'credit']},
  money: {type: Number, required: true},
  transactionDate: {type: Date, default: Date.now, required: true}
});


const BankTransaction = mongoose.model('BankTransaction', bankTransactionSchema);

module.exports = BankTransaction;
