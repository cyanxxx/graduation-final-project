import * as React from 'react';
import { Link } from 'react-router-dom';
import { Core } from '../../core/index';

interface Props {
  static?: boolean,
  spec: LinkSpec[],
  core: Core,
  style?: React.CSSProperties,
  link: {
    login: string,
    sign: string
  }
}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
  menuOpen: boolean
}

export class Navbar extends React.Component<Props, State> {

  constructor(props:Props){
    super(props)
    this.state = {
      menuOpen: false
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
    const { login, sign } = this.props.link
    return <div className="navbar-item">
            <div className="buttons">
            <Link to={sign} className="button is-danger is-inverted is-outlined">
                注册
              </Link>
              <Link to={login} className="button is-danger is-inverted is-outlined">
                登录
              </Link>
            </div>
          </div>
  }
  renderUser() {
    return <div className="navbar-item">
              {this.props.core.user.getName()}
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
      <div className={`navbar-menu ${this.state.menuOpen? 'is-active': ''}`} style={{maxWidth: 940,width:'100%',margin:'auto'}}>
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