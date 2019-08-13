import React from 'react'
import Alert from './Alert'
import ReactDOM from 'react-dom';

interface Props{
    // duration?: number,
    // type?: string,
    // onClose?: Function,
    message: string
}
export default function index(props:Props) {
    let div = document.createElement('div')
    let box = document.getElementsByClassName('alert-box')[0]
    if(box){
        box.appendChild(div)
        document.body.append(box)
    }else{
        box = document.createElement('div')
        box.className = 'alert-box'
        box.appendChild(div)
        document.body.append(box)
    }
    const alert = React.createElement(Alert,Object.assign(props,{
        willUnmount: () => {
            console.log('?')
            const box = document.getElementsByClassName('alert-box')[0];
            ReactDOM.unmountComponentAtNode(div);
            box.removeChild(div);

            // if (props.onClose instanceof Function) {
            //     props.onClose();
            // }
        }
    }))
    ReactDOM.render(alert, div);
}
index.prototype.close = function(){
    let box = document.getElementsByClassName('alert-box')[0]
    document.body.removeChild(box)
}
