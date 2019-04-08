import React, { Component } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { PCroute, ROUTE } from '../../config/route';
import { Core } from '../../core';
import {Navbar} from './navbar'
import Home from './home'
import Restaurant from './restaurant'
import Scenery from '../mobile/scenery'
import './pc_theme.scss';
import { LoginRoute } from '../mobile/login';
import { Layout } from './layout';
import Trips from '../components/trip/trips'
import Weather from './weather';

interface Props{
    core: Core;
}

interface State{

}

const PCRoute: PCroute[] = [
    { path: ROUTE.home, component: Home, exact: true},

    { path: ROUTE.restaurant, component: Restaurant, layout: true},

    { path: ROUTE.scenery, component: Scenery, layout: true},

    { path: ROUTE.login, component: LoginRoute, layout: true},
    { path: ROUTE.register, component: LoginRoute, layout: true},

    { path: ROUTE.travels, component: Trips, layout: true},

    { path: ROUTE.weather, component: Weather, layout: true},

]

export default class PCRouter extends Component<Props, State> {
    constructor(props:Props){
        super(props)
    }
    render() {
        const  core  = this.props.core
        return (
            <div>
                <Navbar static={false} spec={[
                    { to: ROUTE.home, label: '主页' },
                    { to: ROUTE.restaurant, label: '餐饮' },
                    { to: ROUTE.scenery, label: '景点' },
                    { to: ROUTE.travels, label: '路线' },
                    { to: ROUTE.weather, label: '天气' },
                ]} core={core} link={{ login: ROUTE.login, sign: ROUTE.register}}></Navbar>
               <Switch>
                   {PCRoute.map((route,i)=> <Route key={i} path={route.path} 
                           exact={route.exact || false} 
                           render={(props) => route.layout ? <Layout>
                              { React.createElement(
                                 route.component,
                                  {
                                   core,
                                   ...props
                               
                            })}
                           </Layout> : React.createElement(
                               route.component,
                               {
                                   core,
                                   ...props

                               })
                            }
                       />
                     )      
                   })}
               </Switch>
            </div>
        )
    }
}
