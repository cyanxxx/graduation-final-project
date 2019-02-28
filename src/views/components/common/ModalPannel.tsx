import * as React from 'react'
import Modal from './Modal'
interface Props {
}
interface State {
    render: boolean
}
export default class ModalPannel extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
    }
    close = () => {
        this.setState({ render: false })
    }
    open = () => {
        this.setState({ render: true })
    }
    render() {
        return (
            <div>
                <select name="" id="" onClick={this.open}></select>
                <Modal render={this.state.render} close={this.close}>
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}
