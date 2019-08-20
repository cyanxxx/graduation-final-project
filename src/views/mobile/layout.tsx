import React, { Component, Children } from 'react';
import { Topnav } from './topnav';
import { Core } from '../../core/index';
interface Props {
  core: Core;
  children: any;
  title?: string;
  right?: JSX.Element;
}
interface State {}
export class Layout extends Component<Props, State> {
  render() {
    return (
      <div>
        <Topnav core={this.props.core} title={this.props.title} right={this.props.right}></Topnav>
        {this.props.children}
      </div>
    );
  }
}
