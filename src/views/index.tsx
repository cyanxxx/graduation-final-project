import * as React from 'react';
import { isMobile } from '../utils/mobile';
import { BrowserRouter } from 'react-router-dom'
import { MobileRoute } from './mobile/router';
import { PCRoute }  from './pc/router';
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
            return <MobileRoute core={this.props.core}/>
        }else{
            return <PCRoute />   //PC版
        }
    }
    render() {
        return(
            <BrowserRouter>
                { this.renderApp() }
            </BrowserRouter>
        )
    }
}