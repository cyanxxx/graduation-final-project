import * as React from 'react';
import { isMobile } from '../utils/mobile';
import { Router } from 'react-router-dom'
// import  MobileRoute  from './mobile/router';
// import  PCRoute  from './pc/router';
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
        if(isMobile()) {
            const MobileRouter = React.lazy(()=>import('./mobile/router'))
            return <React.Suspense fallback={<div>Loading...</div>}>
               <MobileRouter core={this.props.core} />
            </React.Suspense>
            // return <MobileRoute core={this.props.core}></MobileRoute>
        }else{
            const PCRouter = React.lazy(() => import('./pc/router'))
            return <React.Suspense fallback={<div>Loading...</div>}>
                <PCRouter core={this.props.core} /> 
            </React.Suspense>
            // return <PCRoute core={this.props.core}></PCRoute>
        }
    }
    render() {
        return(
            <Router history={this.props.core.history}>
                { this.renderApp() }
            </Router>
        )
    }
}