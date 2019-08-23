import React, { Component, CSSProperties } from 'react';
import './slider.scss';
import { Link } from 'react-router-dom';
interface Props {
  title: string;
  width?: CSSProperties;
  children: JSX.Element[];
  shrink?: boolean;
  linkMore: any;
}
interface State {}
export default class Slider extends Component<Props, State> {
  public render() {
    return (
      <div className="slider_wrapper">
        <h3>{this.props.title}</h3>
        <div className="slider_list" style={this.props.width}>
          {this.props.children.map((el, i) => (
            <div className="item" key={i} style={this.props.shrink ? { flexGrow: 1 } : undefined}>
              {el}
            </div>
          ))}
          <div className="item more">
            <Link className="more" style={{ cursor: 'pointer' }} to={this.props.linkMore}>
              More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
