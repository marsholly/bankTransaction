import React, { Component } from 'react';
import TransactionTable from './TransactionTable'

export default class App extends Component {
  constructor() {
    super();
    this.selectStyle = this.selectStyle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputDescriptionChange = this.onInputDescriptionChange.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);

    this.state = {
      description: '',
      text: 0,
      style: '',
      transactions: []
      // balance: 0
    }
  }

  selectStyle(event){
    this.setState({style: event.target.value});
  }

  onInputChange(event){
    this.setState({text: event.target.value});
  }

  onInputDescriptionChange(event){
    this.setState({description: event.target.value});
  }

  addTransaction(event){
    event.preventDefault();
    let money = this.state.text;
    let newDescription = this.state.description;
    let newStyle = this.state.style;
    let newTransaction = {
      description: newDescription,
      style: newStyle,
      money: money
    };
    fetch('/api/bankTransactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(newTransaction => {
      console.log('newTransaction:',newTransaction);
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateTransaction(id, transactionUpdate) {
    fetch(`/api/bankTransactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionUpdate),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(transactions => {
      this.setState({transactions});
    })
    .catch(err => {
      console.log('err:', err);
    })
  }

  deleteTransaction(id){
    fetch(`/api/bankTransactions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => {
      console.log('err:', err);
    })
  }

  componentDidMount() {
    fetch('/api/bankTransactions')
      .then(res => res.json())
      .then(transactions => {
        transactions.forEach(transaction =>{
          if(transaction.style === 'debit'){
            transaction.debit = +transaction.money;
            transaction.credit = 0;
          }else{
            transaction.credit = +transaction.money;
            transaction.debit = 0;
          }
        })
        // balance = debitBalance - creditBalance;
        // transaction.balance = balance;
        this.setState({transactions});
      })
      .catch(err => {
        throw err;
      })
  }


  render(){
    return(
      <div className='container'>
        <div className = 'row text-center' >
          <h1>Banking App</h1>
        </div>
        <div className ='row'>
          <div className = 'col-md-6'>
            <h4>Please select a transaction, and input a value.</h4>
            <form>
              <input type="radio" name= "typle" value="debit" onClick={this.selectStyle}/> Debit &nbsp;
              <input type="radio" name= "typle" value="credit" onClick={this.selectStyle}/> Credit <br/>
              <span>Value: </span><input type="text" id="inputText" value={this.state.text} onChange={this.onInputChange}/>&nbsp;
              <span>For: </span><input type="text" id="inputText" value={this.state.description} onChange={this.onInputDescriptionChange}/>
              <button className ='btn btn-primary' onClick={this.addTransaction}>Add</button>
            </form>
          </div>
          <div className= 'col-md-6'>
          Total
          </div>
        </div>
        <div className= 'container'>
          <TransactionTable transactions={this.state.transactions} updateTransaction={this.updateTransaction} deleteTransaction={this.deleteTransaction}/>
        </div>
      </div>
    )
  }
}
