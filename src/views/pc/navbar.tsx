import * as React from 'react';
import { Link } from 'react-router-dom';
import { Core } from '../../core/index';
import { ROUTE } from '../../config/route';
import Modal from '../components/common/Modal';
import { Login } from '../components/login/login';
import { Register } from '../components/login/register';

interface Props {
  static?: boolean,
  spec: LinkSpec[],
  core: Core,
  style?: React.CSSProperties,
}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
  menuOpen: boolean,
  render: boolean,
  container: string
}

export class Navbar extends React.Component<Props, State> {

  constructor(props:Props){
    super(props)
    this.state = {
      menuOpen: false,
      render: false,
      container: ''
    }
  }
  handleChange = (ev, value) => {
  }

  renderLinks = (spec: LinkSpec, i: number) => {
    //todo: find icons here
    return <Link style={{
      fontWeight: 'bold',
      color: '#f8f6e7'
    }}
      key={i}
      to={spec.to}
      className="navbar-item">
      {spec.label}
    </Link>;
  }
  renderVisitor(){
    return (<div className="navbar-item">
            <div className="buttons" onClick={(e) => {
              const target = e.target as HTMLElement
              const status = target.getAttribute('data-status')
              if(status){
                console.log(target.getAttribute('data-status'))
                this.setState({ container: status, render: true })
                console.log(this.state.container)
              }else{
                return;
              }
              
            }}>
            <span className="button is-danger is-inverted is-outlined" data-status='注册'>
                注册
              </span>
              <span className="button is-danger is-inverted is-outlined" data-status='登录'>
                登录
              </span>
            </div>
            <Modal render={this.state.render} title={this.state.container} pannelHandle={this.handleRender}>
              {this.state.container == '登录' ? 
              <Login login={async (email, pwd) => { this.handleRender();return await this.props.core.user.login(email, pwd)}}></Login> : 
              <Register register={async (username, pwd) => { this.handleRender(); return await this.props.core.user.register({ username,password: pwd})}}></Register>
              }   
            </Modal>
          </div>)
  }
  handleRender = () => {
    this.setState(prev => ({render: !prev.render}))
  }
  renderUser() {
    return <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link" onClick={()=>this.props.core.history.push(ROUTE.users)}>
              用户：{this.props.core.user.getName()}
              <div className="navbar-dropdown is-right">
              <span className="navbar-item" onClick={(e) => { e.stopPropagation();this.props.core.user.logout()}}>
                  登出
                </span>
              </div>
            </div> 
          </div>
  }
  menuHandle = () => {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen}))
  }
  render = () => {
    return <nav style={Object.assign({
      display: 'flex',
      textAlign: 'center',
      boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      background: '#d4451d',
      color: '#f8f6e7',
    },this.props.style)}
      className={` navbar`}>
      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" onClick={this.menuHandle}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div className={`navbar-menu ${this.state.menuOpen? 'is-active': ''}`} style={{maxWidth: 940,width:'100%',margin:'0 auto'}}>
        <div className="navbar-start">
          {this.props.spec.map(this.renderLinks)}
        </div>
        
        <div className="navbar-end">
          {this.props.core.user.isLoggedIn() ? this.renderUser() : this.renderVisitor()}
        </div>
      </div>
      
    </nav>;
  }
}