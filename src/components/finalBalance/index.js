import React from 'react'

import CurrencyInput from 'react-currency-masked-input'

import users from '../../config/users'


const FinalBalance = (props) => {
  const {amounts} = props
  const totalPaid = Object.values(amounts).reduce((prev, cur) => {
    return prev + +cur.amount
  }, 0)
  const sharedTotal = totalPaid / 3

  const individualTotals = {}
  Object.values(amounts).forEach(amount=>{
    const {user, amount:val} = amount
    if (individualTotals[user] === undefined) {
        individualTotals[user] = 0
    }
    individualTotals[user] += +val
  })
  return <div className='final-balance'>
    {users.map(user=>{
      const val = individualTotals[user.email] || 0
      
      return <div key={user.email}>
        <span>{user.name}</span>
        <CurrencyInput value={(val - sharedTotal).toFixed(2)}/>
      </div>
    })}

  </div>
}

export default FinalBalance;