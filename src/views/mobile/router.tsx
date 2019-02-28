import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './navbar'
import { ROUTE } from '../../config/route';
import Home from './home'
import { Core } from '../../core/index';
interface Props {
  core: Core;
}

interface State {

}

export class MobileRoute extends Component<Props,State> {
  constructor(props:Props){
    super(props)
  }
  render() {
    const h = window.innerHeight;
    const { core } = this.props;
    return (
        <div style={{
            position: 'absolute',
            height: '100%',
            width: `100%`,}}>
        <div className="container" style={{
            height: `${(1 - (3.25 * 16 / h)) * 100}%`,
            width: '100%',
            overflow: 'auto' 
        }}>
            <Switch core={this.props.core}>
      <Route exact path={ROUTE.home} render={(props) => <Home core = { core }></Home>}></Route>
                <Route path={ROUTE.collections} core={this.props.core}component={Home}></Route>
                <Route path={ROUTE.users} component={Home}></Route>
            </Switch>
        </div>
        
        <Navbar></Navbar>
      </div>
    )
  }
}
