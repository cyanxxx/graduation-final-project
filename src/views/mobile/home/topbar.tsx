import React, { Component } from 'react'
import Currency from '../../components/currency'
import Weather from '../../components/weather/currentWeather'
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
        boxShadow: '0 0 30px 0 rgba(0,0,0,.3)',
        color: '#f8f6e7',
        position: 'relative',
        fontSize: '0.75rem',
        padding: '0 10px',
        background: '#d4451d'
        }}>
        <Currency core={this.props.core}></Currency>
        <Weather core={this.props.core} simple={true}></Weather>
      </div>
    )
  }
}
