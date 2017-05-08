import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import CurrencyInput from 'react-currency-masked-input'

import 'react-datepicker/dist/react-datepicker.css';


export default props => {
  const {memo, date, amounts, onAmountChange, onMemoChange, onDateChange} = props;

  // The datepicker exports just the change, but the others need to be
  // wrapped with only the value
  const amountChange = (e, value) => {
    onAmountChange(value);
  }
  const memoChange = (e) => {
    onMemoChange(e.target.value);
  }
  // const sharedAmount = (amount/3.0).toFixed(2)
  return <div className="transaction">
      <DatePicker selected={moment(date)} onChange={onDateChange} />
      <input type="text" onChange={memoChange} className="memo" value={memo} />
      <CurrencyInput value={String(3434.34)} />
      <div className="transaction-amounts">
        {amounts.map(amount=>{
          <CurrencyInput value={String(amount.amount)} onChange={amountChange} />
        })}
      </div>
    </div>
}
