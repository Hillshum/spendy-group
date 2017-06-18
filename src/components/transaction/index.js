import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import CurrencyInput from 'react-currency-masked-input'

import './style.css'

import UserPicker from '../userPicker'


import 'react-datepicker/dist/react-datepicker.css';


const Transaction = props => {
  const {memo, date, amounts={}, users, onAmountChange, onMemoChange, onDateChange} = props;

  const memoChange = (e) => {
    onMemoChange(e.target.value);
  }

  const totalAmount = Object.values(amounts).reduce( (a,b) => a + Number(b.value), 0).toFixed(2)
  const sharedAmount = (totalAmount/3.0).toFixed(2)
  return <div className="transaction">
      <DatePicker selected={moment(date)} onChange={onDateChange} />
      <input type="text" onChange={memoChange} className="memo" value={memo} />
      <div className="total-amount-wrapper">
        <div>Total Cost</div>
        <CurrencyInput value={String(totalAmount)} />
      </div>
      <div className="shared-amount-wrapper">
        <div>Shared Cost</div>
        <CurrencyInput value={String(sharedAmount)} />
      </div>
      <div className="transaction-amounts">
        {Object.keys(amounts || {}).map(amountId=>{
          const {value, user} = amounts[amountId]
          return <div className="transaction-amount" key={user}>
            <UserPicker users={users} selected={user} onChange={user=>onAmountChange(amountId, value, user)} />
            <CurrencyInput value={String(value)} onChange={(e, value)=>onAmountChange(amountId, value, user)} />
          </div>
        })}
      </div>
    </div>
}

export default Transaction
