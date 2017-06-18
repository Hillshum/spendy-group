import React from 'react';


class UserPicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: props.selected || -1
    }
  }


  onChange = e => {
    if (typeof this.props.onChange === 'function')
    this.props.onChange(e.target.value)
    this.setState({selected: e.target.value})
  }

  render() {
    const {users, className} = this.props
    const {selected} = this.state

    return <select className={className} value={selected} onChange={this.onChange}>
      <option value={-1}></option>
      {Object.keys(users).map(user=>(
        <option key={user} value={user}>{users[user].name}</option>
      ))}
    </select>
  }
}


export default UserPicker
