import React from 'react'

import CurrencyInput from 'react-currency-masked-input'

import "./style.css"


const FinalBalance = (props) => {
  const {amounts, users} = props
  const totalPaid = Object.keys(amounts).reduce((prev, cur) => {
    return prev + +amounts[cur].value
  }, 0)
  const sharedTotal = totalPaid / 3

  const individualTotals = {}
  Object.keys(amounts).forEach(amountId=>{
    const {value, user} = amounts[amountId]
    if (individualTotals[user] === undefined) {
        individualTotals[user] = 0
    }
    individualTotals[user] += +value
  })
  return <div className='final-balance'>
    {Object.keys(users).map(user=>{
      const val = individualTotals[user] || 0
      
      return <div key={user}>
        <span>{users[user].name}</span>
        <CurrencyInput value={(val - sharedTotal).toFixed(2)}/>
      </div>
    })}

  </div>
}

export default FinalBalance;