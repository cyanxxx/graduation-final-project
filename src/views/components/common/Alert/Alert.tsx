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
  public static defaultProps = {
    type: 'danger',
    duration: 3000,
  };
  public timeout!: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      render: false,
    };
  }
  public componentDidMount() {
    this.setState({
      render: true,
    });
    this.startTimer();
  }
  public startTimer() {
    this.timeout = window.setTimeout(() => {
      this.onClose();
    }, this.props.duration);
  }
  public onClose = () => {
    this.stopTimer();
    this.setState({
      render: false,
    });
    this.props.willUnmount();
  };
  public stopTimer() {
    window.clearTimeout(this.timeout);
  }
  public componentWillUnmount() {
    this.stopTimer();
  }
  public render() {
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
