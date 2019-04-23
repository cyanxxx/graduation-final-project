import * as React from 'react';
import { Card } from '../common/card';
import { Link } from 'react-router-dom';
import { validEmail } from '../../../utils/validates';
import  Alert  from '../common/Alert'
import { NotificationError } from '../common/NotificationError';

interface Props {
    login: (username:string, pwd:string) => Promise<boolean>;
}
interface State {
    username:string;
    password:string;
    errMsg:string;
    password_type:string;
}

export class Login extends React.Component<Props, State> {
    public state = {
        username: '',
        password: '',
        errMsg: '',
        password_type: 'password'
    };
    public showPassword = () =>{
        console.log(this.state.password_type)
        if(this.state.password_type === 'password'){
            this.setState({password_type: ''})
        }else{
            this.setState({password_type: 'password' })
        }
    }
    public render () {
        return <Card>
            <div className="card-header" style={{boxShadow: 'none'}}><h1 className="title">登录</h1></div>
                <div className="card-content">

                { this.state.errMsg && <NotificationError>
                    { this.state.errMsg }
                </NotificationError>}

                用户名:
                <input className="input is-normal"
                    type="input"
                    value={this.state.username}
                    onChange={(ev) => this.setState({username:ev.target.value})} />

                <br />

                密码:
                <div className="control has-icons-right">
                    <input
                        className="input is-normal"
                        type={this.state.password_type}
                        value={this.state.password}
                        onChange={(ev) => this.setState({ password: ev.target.value })} />
                    <span className="icon is-small is-right" onClick={this.showPassword} style={{ pointerEvents: 'auto'}}>
                            <i className={`fas ${this.state.password_type === '' ? 'fa-eye': 'fa-eye-slash'}`}></i>
                        </span>
                </div>
                <div style={{
                    marginTop: '1vh',
                    textAlign: 'justify',
                }}>
                    <label className="checkbox"><input type="checkbox" />记住我</label>
                    <Link to="reset_password"
                        style={{
                        color: 'grey',
                        float: 'right',
                        fontSize: 'smaller',
                    }}>忘记密码/重新激活</Link>
                </div>

                <a className="button is-fullwidth" onClick={async (ev) => {
                    if (this.state.username === '') {
                        this.setState({errMsg: '用户名 不能为空。'});
                    } else if (this.state.password === '') {
                        this.setState({errMsg: '密码 不能为空。'});
                    } else {
                        const success = await this.props.login(this.state.username, this.state.password);
                        if (!success) {
                            this.setState({errMsg: '用户名或密码错误。'})
                        }
                    }
                }}>登录</a>
            </div>
            <div className="card-footer">
                <span>还没账号?&#160;&#160;</span><Link to="/register">现在注册</Link>!
            </div>
        </Card>;
    }
}