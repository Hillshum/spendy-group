import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import CurrencyInput from 'react-currency-masked-input'

import './style.css'

import UserPicker from '../userPicker'


import 'react-datepicker/dist/react-datepicker.css';


const Transaction = props => {
  const {memo, date, addAmounts=true, amounts={}, users, onAmountChange, onMemoChange, onDateChange, addAmount} = props;

  const memoChange = (e) => {
    onMemoChange(e.target.value);
  }

  const newAmount = ({target}) => {
    const parent = target.parentElement
    const value = parent.querySelector('.new-value').value
    const user = parent.querySelector('.new-user').value
    addAmount({value, user})
  }

  const totalAmount = Object.keys(amounts).reduce( (a,b) => a + Number(amounts[b].value), 0).toFixed(2)
  const sharedAmount = (totalAmount/3.0).toFixed(2)
  return <div className="transaction">
      <DatePicker selected={moment(date)} onChange={onDateChange} />
      <input type="text" onChange={memoChange} className="memo" value={memo} />
      <div className="total-amount-wrapper">
        <CurrencyInput value={String(totalAmount)} />
      </div>
      <div className="shared-amount-wrapper">
        <input value={`/ 3 = ${String(sharedAmount)}`} disabled={true} />
      </div>
      <div className="transaction-amounts">
        {Object.keys(amounts || {}).map(amountId=>{
          const {value, user} = amounts[amountId]
          return <div className="transaction-amount" key={user}>
            <UserPicker users={users} selected={user} onChange={user=>onAmountChange(amountId, value, user)} />
            <CurrencyInput value={String(value)} onChange={(e, value)=>onAmountChange(amountId, value, user)} />
          </div>
        })}
          
         {addAmounts ?  <div className="transaction-amount new-transaction" >
            <UserPicker className="new-user" users={users} />
            <CurrencyInput className="new-value" />
            <button className="btn btn-primary" onClick={newAmount} >Add</button>
          </div> : null }

      </div>
    </div>
}

export default Transaction
