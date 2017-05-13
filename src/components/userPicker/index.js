import React from 'react';

import users from '../../config/users'

const UserPicker = props => {

  const {selected} = props

  const onChange = e => {
    if (typeof props.onChange === 'function')
    props.onChange(e.target.value)
  }

  return <select value={selected} onChange={onChange}>
    {users.map(user=>(
      <option key={user.email} value={user.email}>{user.name}</option>
    ))}
  </select>
}


export default UserPicker
