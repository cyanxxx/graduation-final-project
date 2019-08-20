import * as React from 'react';
import { isMobile } from '../utils/mobile';
import { Router } from 'react-router-dom';
// import  MobileRoute  from './mobile/router';
// import  PCRoute  from './pc/router';
import Loadable from 'react-loadable';
import { Core } from '../core';
interface Props {
  core: Core;
}
interface State {}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public renderApp() {
    const LoadableOtherComponent = Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "mobile" */

          './mobile/router'
        ),
      loading: () => <div>Loading...</div>,
    });
    const LoadableComponent = Loadable({
      loader: () => import(/* webpackChunkName: 'pc' */ './pc/router'),
      loading: () => <div>Loading...</div>,
    });

    if (isMobile()) {
      return <LoadableOtherComponent core={this.props.core}></LoadableOtherComponent>;
    } else {
      return <LoadableComponent core={this.props.core}></LoadableComponent>;
    }
  }
  render() {
    return <Router history={this.props.core.history}>{this.renderApp()}</Router>;
  }
}
