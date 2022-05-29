export const ROUTE = {
  home: '/',
  users: '/user',
  restaurant: '/restaurant',
  scenery: '/scenery',
  weather: '/weather',
  login: '/login',
  register: '/register',
  travels: '/trips',
  createTravel: '/trips/create',
  createTrip: '/trip/create',
  tripList: '/trip/list',
};
import { Core } from '../core';
import { RouteComponentProps } from 'react-router-dom';

//  TODO: need review
export interface componentProps extends RouteComponentProps<any, any, any> {
  core: Core;
}
export interface PCroute {
  exact?: boolean;
  component: React.ComponentClass<componentProps, any>;
  path: string;
  layout?: boolean;
}

export interface Mobileroute {
  exact?: boolean;
  component: React.ComponentClass<componentProps, any>;
  path: string;
  title?: string;
}
