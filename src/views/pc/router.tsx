import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { PCroute, ROUTE } from '../../config/route';
import { Core } from '../../core';
import {Navbar} from './navbar'
import Home from './home'
import Restaurant from './restaurant'
import Scenery from '../mobile/scenery'
import './pc_theme.scss';
import { LoginRoute } from '../components/common/login';
import { Layout } from './layout';
import Trips from '../components/trip/trips'
import Weather from './weather';
import { User } from '../components/user/index';

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

    { path: ROUTE.users, component: User, layout: true},

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
                    { to: ROUTE.restaurant, label: '饮食' },
                    { to: ROUTE.scenery, label: '景点' },
                    { to: ROUTE.travels, label: '行程' },
                    { to: ROUTE.weather, label: '天气' },
                ]} core={core}></Navbar>
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
