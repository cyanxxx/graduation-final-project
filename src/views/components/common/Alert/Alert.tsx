import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  type?: string;
  duration?: number;
  message: string;
  willUnmount: Function;
}
interface State {
  render: boolean;
}
export default class Alert extends Component<Props, State> {
  static defaultProps = {
    type: 'danger',
    duration: 3000,
  };
  timeout!: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      render: false,
    };
  }
  componentDidMount() {
    this.setState({
      render: true,
    });
    this.startTimer();
  }
  startTimer() {
    this.timeout = window.setTimeout(() => {
      this.onClose();
    }, this.props.duration);
  }
  onClose = () => {
    this.stopTimer();
    this.setState({
      render: false,
    });
    this.props.willUnmount();
  };
  stopTimer() {
    window.clearTimeout(this.timeout);
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  render() {
    return (
      this.state.render && (
        <div className={`notification  ${'is-' + this.props.type}`}>
          <button className="delete" onClick={this.onClose}></button>
          {this.props.message}
        </div>
      )
    );
  }
}
