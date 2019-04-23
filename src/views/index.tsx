import * as React from 'react';
import { isMobile } from '../utils/mobile';
import { Router } from 'react-router-dom'
// import  MobileRoute  from './mobile/router';
// import  PCRoute  from './pc/router';
import Loadable from 'react-loadable';
import { Core } from '../core';
interface Props {
    core: Core
}
interface State {

}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }
    public renderApp() {
        const LoadableOtherComponent = Loadable({
            loader: () => import(
                /* webpackChunkName: "my-chunk-name" */ 
                './mobile/router'),
            loading: () => <div>Loading...</div>,
        });
        const LoadableComponent = Loadable({
            loader: () => import(/* webpackChunkName: 'about' */'./pc/router'),
            loading: () => <div>Loading...</div>,
        });

        if(isMobile()) {
            // const Component = Components['MobileRouter'];
            // return <Component core={this.props.core}/>;
            return <LoadableOtherComponent core={this.props.core}></LoadableOtherComponent>
        }else{
            // const Component = Components['PCRouter'];
            // return <Component core={this.props.core} />;
            return <LoadableComponent core={this.props.core}></LoadableComponent>
        }
    }
    render() {
        return(
            <Router history={this.props.core.history}>
                {this.renderApp()}
            </Router>
        )
    }
}