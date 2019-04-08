import React, { Component, Children } from 'react'
interface Props{
    children: any
}
interface State{

}
export class Layout extends Component<Props,State> {
  render() {
    return (
      <div style={{ maxWidth: 940, width: '100%', display: 'flex', margin: 'auto'}}>
        {this.props.children}
      </div>
    )
  }
}
