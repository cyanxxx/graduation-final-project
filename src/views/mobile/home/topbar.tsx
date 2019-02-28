import React, { Component } from 'react'
import Currency from '../../components/currency'
import Weather from '../../components/weather/CurrentWeahter'
import { Core } from '../../../core';
interface Props {
  core: Core;
}

interface State {

}
export default class Topbar extends Component<Props,State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
        <div className="pannel" style={{
        zIndex: 10, 
        display: 'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 0 30px 0 rgba(0,0,0,.3)',
        color: '#757763',
        position: 'relative',
        fontSize: '0.75rem',
        padding: '0 10px'
        }}>
        <Currency core={this.props.core}></Currency>
        <Weather></Weather>
      </div>
    )
  }
}
