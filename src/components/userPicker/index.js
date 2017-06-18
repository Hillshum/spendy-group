import React from 'react';


const UserPicker = props => {

  const {selected=-1, users} = props

  const onChange = e => {
    if (typeof props.onChange === 'function')
    props.onChange(e.target.value)
  }

  return <select value={selected} onChange={onChange}>
    <option value={-1}></option>
    {Object.keys(users).map(user=>(
      <option key={user} value={user}>{users[user].name}</option>
    ))}
  </select>
}


export default UserPicker
