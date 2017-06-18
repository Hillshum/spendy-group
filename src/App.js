import React, { Component } from 'react';
import './App.css';

import Transaction from './components/transaction';
import FinalBalance from './components/finalBalance'
import Auth from './components/auth'

import {database} from './api/firebase';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      users: {}
    }
    this.getAmounts = this.getAmounts.bind(this)
  }

  componentWillMount() {
    this.detailsRef = database.ref('details');
    this.detailsListener = this.detailsRef.on('value', snapshot=>{
      this.setState({details: snapshot.val()})
    })

    this.usersRef = database.ref('users')
    this.usersListener = this.usersRef.on('value', snapshot=>{
      this.setState({users: snapshot.val()})
    })

  }

  componentWillUnmount() {
    this.detailsRef.off(this.detailsListener)
    this.amountsRef.off(this.usersListener)
  }

  getAmounts() {
    return Object.values(this.state.details).reduce((prev, curr)=>{
      return Object.assign(prev, curr.amounts || {})
    }, {})
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spendy-Group expense tracker</h2>
        </div>
        <Auth/>

        {Object.keys(this.state.details).map(key=> {
          const transaction = this.state.details[key]
          const ref = this.detailsRef.child(key)
          return <Transaction memo={transaction.memo}
            users={this.state.users}
            amounts={transaction.amounts}
            date={transaction.date}
            key={key}
            onAmountChange={(amountId, value, user)=>{ref.child('amounts').update({[amountId]:{value, user}})}}
            onMemoChange={(memo)=>{ref.update({memo})}}
            onDateChange={(date)=>{ref.update({date:date.unix() * 1000})}}
           />
       })}

        <FinalBalance amounts={this.getAmounts()} users={this.state.users}/>
      </div>
    );
  }
}

export default App;
