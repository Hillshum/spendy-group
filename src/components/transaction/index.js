import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


export default props => {
  const {memo, date, amount, onAmountChange, onMemoChange, onDateChange} = props;

  // The datepicker exports just the change, but the others need to be
  // wrapped with only the value
  const amountChange = (e) => {
    onAmountChange(e.target.value);
  }
  const memoChange = (e) => {
    onMemoChange(e.target.value);
  }
  return <div className="transaction">
      <DatePicker selected={date} onChange={onDateChange} />
      <input type="text" onChange={memoChange} className="memo" value={memo} />
      <input type="text" onChange={amountChange} className="amount" value={amount} />
      <input type="text" readOnly className="shared-amount" value={amount/3.0} />
    </div>
}
