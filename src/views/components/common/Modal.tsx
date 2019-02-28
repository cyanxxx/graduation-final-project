import * as React from 'react'
import * as ReactDOM from 'react-dom'
interface Props{
    render: boolean,
    close: any
}
interface State{
   
}
export default class Modal extends React.Component<Props, State> {
    modalTarget: HTMLDivElement;
    constructor(props) {
        super(props)
        this.modalTarget = document.createElement('div')
        this.state ={
            render: false
        }
    }
    componentDidMount() {
        document.body.appendChild(this.modalTarget);
    }
    componentWillUnmount() {
        document.body.removeChild(this.modalTarget);
    }
    render() {
        return this.props.render && ReactDOM.createPortal(
            <div className='modal is-active'>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modal title</p>
                        <button className="delete" aria-label="close" onClick={this.props.close}></button>
                    </header>
                    <section className="modal-card-body">
                        {this.props.children}
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>,
            this.modalTarget
        );
    }
}
