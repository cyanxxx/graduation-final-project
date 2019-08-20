import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './navbar';
import { Mobileroute, ROUTE } from '../../config/route';
import Home from './home';
import Restaurant from './restaurant';
import Scenery from './scenery';
import { Core } from '../../core/index';
import { Layout } from './layout';
import './moblie_theme.scss';
import { LoginRoute } from '../components/common/Login';
import { User } from '../components/user';
import Trip from '../components/trip/create';
import Trips from '../components/trip/trips';
import TripForm from '../components/trip/tripForm';
import TripList from '../components/trip/tripList';

interface Props {
  core: Core;
}

interface State {}
const MobileRoute: Mobileroute[] = [
  { path: ROUTE.restaurant, component: Restaurant, title: '美食' },

  { path: ROUTE.scenery, component: Scenery, title: '景点' },

  { path: ROUTE.login, component: LoginRoute },
  { path: ROUTE.register, component: LoginRoute },

  { path: ROUTE.createTravel, component: Trip, title: '创建旅程' },
  { path: ROUTE.createTrip, component: TripForm, title: '创建路线' },
  { path: ROUTE.tripList, component: TripList, title: '旅程路线表' },
  { path: ROUTE.travels, component: Trips, title: '旅程' },

  { path: ROUTE.users, component: User, title: '个人主页' },
];
export default class MobileRouter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const h = window.innerHeight;
    const { core } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: `100%`,
        }}
      >
        <div
          className="container"
          style={{
            width: '100%',
            paddingBottom: '3.25rem',
          }}
        >
          <Switch>
            <Route exact path="/" render={props => <Home core={core} {...props}></Home>}></Route>
            {MobileRoute.map((route, i) => (
              <Route
                key={i}
                path={route.path}
                render={props => (
                  <Layout title={route.title} core={core}>
                    {React.createElement(route.component, {
                      core,
                      ...props,
                    })}
                  </Layout>
                )}
              />
            ))}
          </Switch>
        </div>

        <Navbar
          static={true}
          spec={[
            { to: ROUTE.home, label: '主页' },
            { to: ROUTE.createTravel, label: '行程' },
            { to: ROUTE.users, label: '个人' },
          ]}
        ></Navbar>
      </div>
    );
  }
}
