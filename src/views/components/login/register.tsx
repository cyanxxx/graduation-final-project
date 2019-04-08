import * as React from 'react';
import { Card } from '../common/card';
import { validEmail, validPwd } from '../../../utils/validates';
import { NotificationError } from '../common/NotificationError';

interface Props {
    register:(name:string, pwd:string) => Promise<boolean>;
}
interface State {
    username:string;
    pwd:string;
    pwd2:string;
    token:string;
    accept:boolean;
    errMsg:string;
}

export class Register extends React.Component<Props, State> {
    public state = {
        username: '',
        pwd: '',
        pwd2: '',
        token: '',
        accept: false,
        errMsg: '',
    };

    public inputStyle = 'input is-normal';

    public render () {
        return <Card>
            <div className="card-header" style={{boxShadow: 'none'}}>
                <h1 className="title">注册</h1>
            </div>
            <div className="card-content">
                {this.state.errMsg && <NotificationError>
                    { this.state.errMsg }
                </NotificationError>}

                用户名：
                <input className={this.inputStyle}
                    type="text"
                    onChange={(ev) => this.setState({username: ev.target.value})}
                />            
                密码：
                <input className={this.inputStyle}
                    type="password"
                    onChange={(ev) => this.setState({pwd: ev.target.value})}
                />
                
                确认密码：
                <input className={this.inputStyle}
                    type="password"
                    onChange={(ev) => this.setState({pwd2: ev.target.value})}
                />

                <div className="checkbox"
                    onClick={(ev) => this.setState((prevState) => this.setState({accept: !prevState.accept}))}
                    style={{ textAlign: 'center', width: '100%', margin: '10px 0' }}>
                    <input type="checkbox"
                        checked={this.state.accept}
                        onChange={(ev) => this.setState({accept: ev.target.checked})}
                    />
                    我已阅读并同意注册协议 更多内容
                </div>

                <a className="button is-normal is-fullwidth" onClick={async (ev) => {
                    if (this.state.pwd === '') {
                        this.setState({errMsg: '密码 不能为空。'});
                    } else if (this.state.username === '') {
                        this.setState({errMsg: '名称 不能为空。'});
                    } else if (!this.state.accept) {
                        this.setState({errMsg: '注册协议勾选 不能为空。'});
                    } else if (this.state.pwd !== this.state.pwd2) {
                        this.setState({errMsg: '密码和确认密码不相匹配'});
                    } else {
                        console.log('register')
                        const success = await this.props.register(this.state.username, this.state.pwd);
                        if (!success) {
                            // todo:
                            this.setState({errMsg: '注册失败'})
                        }
                    }
                }}>注册</a>
            </div>
        </Card>;
    }
}