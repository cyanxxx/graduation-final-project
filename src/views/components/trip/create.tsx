import React, { Component } from 'react'
import DatePicker from '../common/date-picker'
import { Card } from '../common/card';
import { APIPost } from '../../../config/api';
import { Redirect } from 'react-router';
import { componentProps, ROUTE } from '../../../config/route';

interface State{
    name: string,
    start_date: '',
    end_date: ''
}
export default class Create extends Component<componentProps, State> {
  constructor(props: componentProps){
    super(props)
    this.state = {
      name: '',
      start_date: '',
      end_date: ''
    }
  }
  create = async() => {
    let data= {}
    for (const key in this.state) {
      if(this.state[key]){
        data[key] = this.state[key]
      }
    }
    const result = await this.props.core.db.post('/trip/create', data as State) as APIPost['/trip/create']['res']
    this.props.core.history.push('/trip/create',{id: result.id})
  }
  getDate = (startDay,endDay) => {
    this.setState({
      start_date: startDay,
      end_date: endDay
    })
  }
  render() {
    if(!this.props.core.user.isLoggedIn()){
      return <Redirect to={{ pathname: ROUTE.login, state: { from: this.props.location } }}></Redirect>
    }
    return (
      <Card>
            <div className="field">
              <input className="input" type="text" placeholder="输入行程名字" onChange={(ev)=>this.setState({name:ev.target.value})}/>
            </div>
           
            <div className="field">
              <DatePicker getDate={this.getDate}></DatePicker>
            </div>
            
            <div className="field is-grouped">
              <div className="control">
                <button className='button is-info' onClick={this.create}>创建</button>
              </div>
              <div className="control">
                <button className="button is-danger">取消</button>
              </div>
            </div>
      </Card>
    )
  }
}
