import React, { Component } from 'react';
import './App.css';

import Transaction from './components/transaction';

import {database} from './api/firebase';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      amounts: {}
    }
  }

  componentWillMount() {
    this.detailsRef = database.ref('details');
    this.detailsListener = this.detailsRef.on('value', snapshot=>{
      this.setState({details: snapshot.val()})
    })

    this.amountsRef = database.ref('amounts')
    this.amountsListener = this.amountsRef.on('value', snapshot=>{
      this.setState({amounts: snapshot.val()})
    })

  }

  componentWillUnmount() {
    this.detailsRef.off(this.detailsListener)
    this.amountsRef.off(this.amountsListener)
  }

  getAmounts(amounts={}) {
    return Object.keys(amounts).map(amount=>(
      this.state.amounts[amount]
    ))
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spendy-Group expense tracker</h2>
        </div>

        {Object.keys(this.state.details).map(key=> {
          const transaction = this.state.details[key]
          return <Transaction memo={transaction.description}
          amounts={this.getAmounts(transaction.amounts)}
          date={transaction.date}
          key={key}
          onAmountChange={(amount)=>{this.setState({amount:amount})}}
          onMemoChange={(memo)=>{this.setState({memo:memo})}}
          onDateChange={(date)=>(this.setState({date:date}))}
           />
       })}

      </div>
    );
  }
}

export default App;
