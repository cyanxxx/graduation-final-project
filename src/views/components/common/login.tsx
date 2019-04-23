import * as React from 'react';
import { Login } from '../login/login';
// import { PasswordReset } from '../components/login/pwd-reset';
import { Register } from '../login/register';
import { componentProps } from '../../../config/route';

interface State {
}

export class LoginRoute extends React.Component<componentProps, State> {
    public location = '';

    public render () {
        const content = this.renderContent();

        return content 
    }

    public renderContent () {
        switch (window.location.pathname) {
            case '/login':
                this.location = 'login';
                return <Login login={async (email, pwd) => this.props.location.state && this.props.location.state.from ? await this.props.core.user.login(email, pwd, this.props.location.state.from) : await this.props.core.user.login(email, pwd)}></Login>;
            case '/register':
                this.location = 'register';
                return <Register register={async (username, pwd) => await this.props.core.user.register({
                    username,
                    password: pwd,
                })}></Register>;
            // case '/reset_password':
            //     this.location = 'reset password';
            //     return <PasswordReset resetPassword={(email) => this.props.core.db.resetPassword(email) as any}></PasswordReset>;
            default:
                return <div>wrong pathname {window.location.pathname}</div>;
        }
    }
}