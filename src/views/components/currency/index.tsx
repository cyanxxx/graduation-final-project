import * as React from 'react'
import { Core } from '../../../core';
import { APIGet } from '../../../config/api';
interface Props{
    core: Core
}
interface State{
    data: APIGet['/currency']['res']
}

export default class Currency extends React.Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state = {
            data: {
                exchangeRate: 0
            }
           
        }
    }
    async componentDidMount(){    
        const currency = await this.props.core.db.get(`/currency`,undefined)
        currency? this.setState({ data: currency }): null
        
    }
    render() {
       
        return (
            <div>当前汇率：{this.state.data!.exchangeRate}</div>
        )
    }
   
}