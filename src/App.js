import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';

import Transaction from './components/transaction';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memo: "The best place",
      date: moment(),
      amount: 1232,
    }

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Transaction memo={this.state.memo}
          amount={this.state.amount}
          date={this.state.date}
          onAmountChange={(amount)=>{this.setState({amount:amount})}}
          onMemoChange={(memo)=>{this.setState({memo:memo})}}
          onDateChange={(date)=>(this.setState({date:date}))}
           />

      </div>
    );
  }
}

export default App;
