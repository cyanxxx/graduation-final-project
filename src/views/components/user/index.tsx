import * as React from 'react';
import { Profile } from './profile'
import { Redirect } from 'react-router';
import { componentProps } from '../../../config/route';

interface State {
    
}
    
export class User extends React.Component<componentProps, State> {
    
    public renderProfile () {
         return (
             <Profile {...this.props}></Profile>
        );
    }
    public render () {
        const isLogin = this.props.core.user.isLoggedIn()
        if(!isLogin){
            return <Redirect to={{ pathname: './login', state: { from: this.props.location } }}></Redirect>
        }else{
            return this.renderProfile()
        }
    }
}