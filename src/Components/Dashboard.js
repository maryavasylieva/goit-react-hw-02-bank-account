import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import Balance from './Balance';
import TransactionHistory from './TransactionHistory';
import Controls from './Controls';

const shortid = require('shortid');

class Dashboard extends Component {
  state = { transactions: [], balance: 0 };

  toAddTransaction = transaction => {
    const newTransaction = {
      id: shortid.generate(),
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      ...transaction,
    };

    this.setState(state => ({
      transactions: [...state.transactions, newTransaction],
      balance:
        newTransaction.type === 'Deposit'
          ? state.balance + Number(newTransaction.amount)
          : state.balance - Number(newTransaction.amount),
    }));
  };

  toDeposit = arr =>
    arr
      .filter(el => el.type === 'Deposit')
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

  toWithdraw = arr =>
    arr
      .filter(el => el.type === 'Withdraw')
      .reduce((acc, cur) => acc + Number(cur.amount), 0);

  render() {
    const { transactions, balance } = this.state;
    return (
      <div className={styles.dashboard}>
        <Controls balance={balance} toAddTransaction={this.toAddTransaction} />
        <Balance
          balance={balance}
          withdraw={this.toWithdraw(transactions)}
          deposit={this.toDeposit(transactions)}
        />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
