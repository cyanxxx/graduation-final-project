import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../config/route';

interface Props {
  static: boolean,
  spec: LinkSpec[],
  style?: React.CSSProperties
}

type LinkSpec = { to: string, label: string, icon?: string };

interface State {
  spec: LinkSpec[];
}

export class Navbar extends React.Component<Props, State> {

  public handleChange = (ev, value) => {
  }

  public renderLinks = (spec: LinkSpec, i: number) => {
    //todo: find icons here
    return <Link style={{
      flex: 1,
      justifyContent: 'center',
     
    }}
      key={i}
      to={spec.to}
      className="navbar-item">
      {spec.label}
    </Link>;
  }

  public render = () => {
    return <nav style={Object.assign({
      display: 'flex',
      textAlign: 'center',
      boxShadow: '0px -1px 2px rgba(0, 0, 0, 0.2)',
    },this.props.style)}
      className={`navbar ${this.props.static?' is-fixed-bottom': 'is-fixed-top'}`}>
      {this.props.spec.map(this.renderLinks)}
    </nav>;
  }
}