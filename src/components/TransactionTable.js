import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class TransactionTable extends Component {
  constructor() {
    super();

    this.startEdit = this.startEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);

    this.state = {
      editingId: null,
      editDescriptionInput: '',
      editStyle: '',
      editMoney: 0,
      showModal: false
    }
  }

  startEdit(transaction) {
    this.openModal();
    this.setState({
      editingId: transaction._id,
      editDescriptionInput: transaction.description,
      editMoney: transaction.money,
      editStyle: transaction.style
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  saveEdit(id) {
    let description = this.state.editDescriptionInput;
    let money = this.state.editMoney;
    let style = this.state.editStyle;
    let newTransaction = {
      description,
      money,
      style
    };

    this.props.updateTransaction(id, newTransaction);
    this.setState({editingId: null});
    this.closeModal();
  }


  cancelEdit() {
    this.setState({editingId: null});
    this.closeModal();
  }

  deleteTransaction(transaction){
    let id = transaction._id
    this.props.deleteTransaction(id);
  }

  render() {
    const { transactions } = this.props;
    if(!transactions) {
      return null;
    }

    let rows = transactions.map(transaction => {
      return (
        <tr key={transaction._id}>
          <td>{transaction.transactionDate}</td>
          <td>{transaction.description}</td>
          <td>-{transaction.debit}</td>
          <td>+{transaction.credit}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary btn-xs"
              onClick={() => this.startEdit(transaction)}
            >
              <span className="glyphicon glyphicon-edit"></span>
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-xs"
              onClick={() => this.deleteTransaction(transaction)}
            >
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Time</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="radio" name= "typle" value="debit" onClick={e=>{this.setState({editStyle: e.target.value})}}/> Debit &nbsp;
            <input type="radio" name= "typle" value="credit" onClick={e=>{this.setState({editStyle: e.target.value})}}/> Credit <br/>
            <span>Value: </span><input type="text" value={this.state.editMoney} onChange={e => {this.setState({editMoney: e.target.value}) }}/>&nbsp;
            <span>Description: </span><input type="text" value={this.state.editDescriptionInput} onChange={e => {this.setState({editDescriptionInput: e.target.value}) }}/><br/>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={() => this.saveEdit(this.state.editingId)}>Save</Button>
            <Button onClick={this.cancelEdit}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
