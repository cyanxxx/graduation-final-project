import * as React from 'react';
import { Profile } from './profile'
import { Redirect } from 'react-router';
import { componentProps } from '../../../config/route';

interface State {
    
}
    
export class User extends React.Component<componentProps, State> {
    
    public renderProfile () {
         return (<div>
             <Profile {...this.props}></Profile>
        </div>);
    }
    public render () {
        const isLogin = this.props.core.user.isLoggedIn()
        return (
            <div>
                {isLogin ? this.renderProfile() : <Redirect to={{pathname:'./login', state: { from: this.props.location }}}></Redirect>}
            </div>
        )
    }
}