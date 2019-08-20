import * as React from 'react';
import * as ReactDOM from 'react-dom';
interface Props {
  render: boolean;
  pannelHandle: any;
  children: JSX.Element;
  title: string;
  footer?: JSX.Element;
}
interface State {}
export default class Modal extends React.Component<Props, State> {
  modalTarget: HTMLDivElement;
  constructor(props) {
    super(props);
    this.modalTarget = document.createElement('div');
  }
  componentDidMount() {
    document.body.appendChild(this.modalTarget);
  }
  componentWillUnmount() {
    document.body.removeChild(this.modalTarget);
  }
  renderFooter() {
    return (
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={() => this.props.pannelHandle(false)}>
          确定
        </button>
        <button className="button" onClick={() => this.props.pannelHandle(false)}>
          取消
        </button>
      </footer>
    );
  }
  render() {
    const { title, footer } = this.props;
    return (
      this.props.render &&
      ReactDOM.createPortal(
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.props.pannelHandle(false)}
              ></button>
            </header>
            <section className="modal-card-body">{this.props.children}</section>
            {footer && this.renderFooter()}
          </div>
        </div>,
        this.modalTarget,
      )
    );
  }
}
